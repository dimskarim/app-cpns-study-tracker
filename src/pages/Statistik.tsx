import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import { useStore } from '../store/useStore';

const Statistik = () => {
  const [mounted, setMounted] = useState(false);
  const profileAvatar = useStore((state) => state.profileAvatar);
  const [filterDays, setFilterDays] = useState('7');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredDurPoint, setHoveredDurPoint] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allPlans = useLiveQuery(() => db.studyPlans.toArray(), []);
  const allTryouts = useLiveQuery(() => db.tryouts.orderBy('date').reverse().toArray(), []);

  // 1. Hari Aktif
  const activeDaysSet = new Set<string>();
  allPlans?.filter(p => p.status === 'completed').forEach(p => activeDaysSet.add(p.date));
  allTryouts?.forEach(t => activeDaysSet.add(t.date));
  const activeDays = activeDaysSet.size;

  // 2. Total Tryout
  const totalTryout = allTryouts?.length || 0;

  // 3. Jam Belajar
  const totalDurationSeconds = allPlans?.filter(p => p.status === 'completed').reduce((acc, curr) => acc + (curr.actualDuration || 0), 0) || 0;
  const jamBelajar = (totalDurationSeconds / 3600).toFixed(1);

  const getLocalDateString = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // 4. Intensitas Belajar (Berdasarkan Jumlah Subbab Selesai)
  const chartDaysCount = filterDays === '7' ? 7 : 30;
  const dateLabels: string[] = [];
  const chartDataCounts: number[] = [];
  const chartDataDurations: number[] = [];
  
  for (let i = chartDaysCount - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    
    const plansForDate = allPlans?.filter(p => p.date === dateStr) || [];
    const completedPlans = plansForDate.filter(p => p.status === 'completed');
    
    chartDataCounts.push(completedPlans.length);
    
    const durationSec = plansForDate.reduce((acc, curr) => acc + (curr.actualDuration || 0), 0);
    chartDataDurations.push(Math.round(durationSec / 60)); // dalam menit
    
    if (filterDays === '7') {
      dateLabels.push(['Mg','Sn','Sl','Rb','Km','Jm','Sb'][d.getDay()]);
    } else {
      dateLabels.push(d.getDate().toString()); 
    }
  }
  
  const maxIntensity = Math.max(...chartDataCounts, 5); // min 5 subbab scale
  const chartHeights = chartDataCounts.map(count => (count / maxIntensity) * 100);

  const maxDuration = Math.max(...chartDataDurations, 30); // min 30 menit scale
  const chartDurationHeights = chartDataDurations.map(dur => (dur / maxDuration) * 100);

  // 5. Tren Tryout
  const last4Tryouts = allTryouts ? allTryouts.slice(0, 4).reverse() : [];
  const tryoutScores = last4Tryouts.map(t => t.twk + t.tiu + t.tkp);
  
  let diffPts = 0;
  if (tryoutScores.length >= 2) {
    diffPts = tryoutScores[tryoutScores.length - 1] - tryoutScores[tryoutScores.length - 2];
  }

  // Generate SVG Path for Tryout Trend
  const generateTrendPath = () => {
    if (tryoutScores.length === 0) return { d: "M0 35 L 100 35", points: [] };
    if (tryoutScores.length === 1) return { d: `M0 20 L 100 20`, points: [{cx: 50, cy: 20, val: tryoutScores[0]}] };

    const minScore = Math.min(...tryoutScores, 200);
    const maxScore = Math.max(...tryoutScores, 500);
    const range = maxScore - minScore === 0 ? 1 : maxScore - minScore;

    const points = tryoutScores.map((score, idx) => {
      const cx = (idx / (tryoutScores.length - 1)) * 100;
      // cy goes from 35 (bottom) to 5 (top)
      const cy = 35 - ((score - minScore) / range) * 30;
      return { cx, cy, val: score };
    });

    let d = `M ${points[0].cx} ${points[0].cy}`;
    for (let i = 1; i < points.length; i++) {
      // Simplified bezier curve
      const curr = points[i];
      const prev = points[i-1];
      const cp1x = prev.cx + (curr.cx - prev.cx) / 2;
      d += ` C ${cp1x} ${prev.cy}, ${cp1x} ${curr.cy}, ${curr.cx} ${curr.cy}`;
    }

    return { d, points };
  };

  const { d: trendPath, points: trendPoints } = generateTrendPath();
  const fillPath = trendPoints.length > 0 ? `${trendPath} L ${trendPoints[trendPoints.length-1].cx} 40 L 0 40 Z` : '';

  // Generate SVG Path for Waktu Belajar Trend
  const generateDurationTrendPath = () => {
    if (chartDataDurations.length === 0) return { d: "M0 40 L 100 40", points: [] };
    if (chartDataDurations.length === 1) return { d: `M0 20 L 100 20`, points: [{cx: 50, cy: 20, val: chartDataDurations[0]}] };

    const minDur = 0;
    const maxDur = Math.max(...chartDataDurations, 30);
    const range = maxDur - minDur === 0 ? 1 : maxDur - minDur;

    const points = chartDataDurations.map((dur, idx) => {
      const cx = (idx / (chartDataDurations.length - 1)) * 100;
      const cy = 40 - ((dur - minDur) / range) * 35;
      return { cx, cy, val: dur };
    });

    let d = `M ${points[0].cx} ${points[0].cy}`;
    for (let i = 1; i < points.length; i++) {
      const curr = points[i];
      const prev = points[i-1];
      const cp1x = prev.cx + (curr.cx - prev.cx) / 2;
      d += ` C ${cp1x} ${prev.cy}, ${cp1x} ${curr.cy}, ${curr.cx} ${curr.cy}`;
    }

    return { d, points };
  };

  const { d: durTrendPath, points: durTrendPoints } = generateDurationTrendPath();
  const durFillPath = durTrendPoints.length > 0 ? `${durTrendPath} L ${durTrendPoints[durTrendPoints.length-1].cx} 45 L 0 45 Z` : '';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border-2 border-primary-container bg-surface-container">
            <img className="w-full h-full object-cover" alt="Profile" src={profileAvatar} />
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Statistik</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-20">
        <section className="relative pt-6 pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary-container opacity-90 -z-10"></div>
          <div className="absolute inset-0 opacity-10 -z-10 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px"}}></div>
          <div className={`px-margin-mobile flex flex-col gap-1 text-white transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="font-label-md text-label-md opacity-80">Performa Belajar</p>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold">Luar biasa!</h2>
            <p className="font-body-md text-body-md opacity-90 max-w-[280px]">
              {diffPts > 0 ? `Skor tryout Anda meningkat ${diffPts} pts dibanding sebelumnya.` : diffPts < 0 ? `Jangan menyerah! Evaluasi kesalahan pada tryout terakhir.` : `Pertahankan konsistensi belajarmu.`}
            </p>
          </div>
          
          <div className="absolute -bottom-16 left-0 w-full px-margin-mobile z-10">
            <div className="grid grid-cols-3 gap-3">
              <div className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">{activeDays}</span>
                <span className="font-caption text-caption text-on-surface-variant">Hari Aktif</span>
              </div>
              <div className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">{totalTryout}</span>
                <span className="font-caption text-caption text-on-surface-variant">Total Tryout</span>
              </div>
              <div className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">{jamBelajar}</span>
                <span className="font-caption text-caption text-on-surface-variant">Jam Belajar</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-24 px-margin-mobile space-y-lg max-w-4xl mx-auto">
          <div className={`flex justify-between items-center bg-surface-container-low p-1 rounded-full w-fit mx-auto border border-outline-variant/30 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${filterDays === '7' ? 'bg-[#004ac6] text-white' : 'text-on-surface-variant'}`} onClick={() => setFilterDays('7')}>7 Hari</button>
            <button className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${filterDays === '30' ? 'bg-[#004ac6] text-white' : 'text-on-surface-variant'}`} onClick={() => setFilterDays('30')}>30 Hari</button>
          </div>

          <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-2xl p-lg space-y-md transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Intensitas Belajar</h3>
              <span className="material-symbols-outlined text-primary">analytics</span>
            </div>
            <div className="h-48 flex items-end justify-between gap-1 px-1 pb-2">
              {dateLabels.map((dayLabel, idx) => {
                const showDetails = filterDays === '7';
                return (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer h-full justify-end flex-1">
                    {showDetails && (
                      <span className="text-[10px] font-bold text-on-surface-variant mb-1 transition-colors group-hover:text-primary">
                        {chartDataCounts[idx]}
                      </span>
                    )}
                    <div className="w-full max-w-[32px] bg-primary-container/20 rounded-t-sm md:rounded-t-lg relative h-32 overflow-hidden mx-auto">
                      <div className="absolute bottom-0 left-0 w-full bg-primary transition-[height] duration-1000 ease-in-out group-hover:bg-primary-container" style={{height: mounted ? `max(4px, ${chartHeights[idx]}%)` : '0%'}}></div>
                    </div>
                    {(showDetails || idx % 5 === 0) && (
                      <span className="font-caption text-[10px] text-on-surface-variant mt-2">{dayLabel}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-2xl p-lg space-y-md transition-all duration-700 delay-[550ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Waktu Belajar</h3>
              <span className="material-symbols-outlined text-secondary">schedule</span>
            </div>
            
            <div className="relative h-32 w-full mt-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 45">
                <defs>
                  <linearGradient id="durLineGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--color-secondary))" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="rgb(var(--color-secondary))" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                
                {chartDataDurations.length > 1 && (
                  <path d={durFillPath} fill="url(#durLineGrad)" className="animate-fade"></path>
                )}
                
                <path d={durTrendPath} fill="none" stroke="rgb(var(--color-secondary))" strokeLinecap="round" strokeWidth="1" className="animate-draw"></path>
                
                <g className="text-secondary animate-fade">
                  {durTrendPoints.map((pt, idx) => (
                    <circle 
                      key={idx}
                      cx={pt.cx} 
                      cy={pt.cy} 
                      fill={hoveredDurPoint === idx ? "rgb(var(--color-primary))" : "currentColor"} 
                      r={hoveredDurPoint === idx ? "3" : "1.5"} 
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredDurPoint(idx)}
                      onMouseLeave={() => setHoveredDurPoint(null)}
                    />
                  ))}
                </g>
              </svg>

              {chartDataDurations.length > 0 && hoveredDurPoint === null && (
                <div className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] px-2 py-1 rounded-md font-bold shadow-sm pointer-events-none transition-opacity duration-300">
                  {chartDataDurations[chartDataDurations.length - 1] >= 60 ? `${(chartDataDurations[chartDataDurations.length - 1]/60).toFixed(1)}j` : `${chartDataDurations[chartDataDurations.length - 1]}m`}
                </div>
              )}
              
              {hoveredDurPoint !== null && durTrendPoints[hoveredDurPoint] && (
                <div 
                  className="absolute bg-primary text-on-primary text-[10px] px-2 py-1 rounded-md font-bold shadow-sm z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-200"
                  style={{
                    left: `${durTrendPoints[hoveredDurPoint].cx}%`,
                    top: `calc(${(durTrendPoints[hoveredDurPoint].cy / 45) * 100}% - 8px)`
                  }}
                >
                  {chartDataDurations[hoveredDurPoint] >= 60 ? `${(chartDataDurations[hoveredDurPoint]/60).toFixed(1)}j` : `${chartDataDurations[hoveredDurPoint]}m`}
                </div>
              )}
            </div>
            
            <div className="flex justify-between px-1 mt-2 w-full">
              {dateLabels.map((dayLabel, idx) => {
                const showDetails = filterDays === '7';
                
                return (
                  <div key={idx} className="flex flex-col items-center justify-end" style={{ flex: 1, visibility: (!showDetails && idx % 6 !== 0 && idx !== dateLabels.length - 1 && idx !== 0) ? 'hidden' : 'visible' }}>
                    <span className="font-caption text-[10px] text-on-surface-variant">{dayLabel}</span>
                    {showDetails && (
                      <span className="text-[9px] font-bold text-secondary mt-0.5">
                        {chartDataDurations[idx] >= 60 ? `${(chartDataDurations[idx]/60).toFixed(1)}j` : `${chartDataDurations[idx]}m`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-2xl p-lg space-y-md transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Tren Tryout</h3>
                <p className="font-caption text-caption text-on-surface-variant">4 Tryout terakhir</p>
              </div>
              <div className={`flex items-center gap-1 font-bold ${diffPts > 0 ? 'text-tertiary' : diffPts < 0 ? 'text-error' : 'text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-[18px]">
                  {diffPts > 0 ? 'trending_up' : diffPts < 0 ? 'trending_down' : 'trending_flat'}
                </span>
                <span className="font-label-md text-label-md">
                  {diffPts > 0 ? '+' : ''}{diffPts} pts
                </span>
              </div>
            </div>
            
            {tryoutScores.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-on-surface-variant font-label-md">Belum ada data tryout</div>
            ) : (
              <div className="relative h-32 w-full mt-4">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgb(var(--color-primary))" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="rgb(var(--color-primary))" stopOpacity="0"></stop>
                    </linearGradient>
                    <style>
                      {`
                        .animate-draw {
                          stroke-dasharray: 200;
                          stroke-dashoffset: 200;
                          animation: drawLine 1.5s ease-out forwards;
                        }
                        .animate-fade {
                          opacity: 0;
                          animation: fadeFill 1.5s ease-out forwards;
                          animation-delay: 0.3s;
                        }
                        @keyframes drawLine {
                          to { stroke-dashoffset: 0; }
                        }
                        @keyframes fadeFill {
                          to { opacity: 1; }
                        }
                      `}
                    </style>
                  </defs>
                  
                  {tryoutScores.length > 1 && (
                    <path d={fillPath} fill="url(#lineGrad)" className="animate-fade"></path>
                  )}
                  
                  <path d={trendPath} fill="none" stroke="rgb(var(--color-primary))" strokeLinecap="round" strokeWidth="1" className="animate-draw"></path>
                  
                  <g className="text-primary animate-fade">
                    {trendPoints.map((pt, idx) => (
                      <circle 
                        key={idx}
                        cx={pt.cx} 
                        cy={pt.cy} 
                        fill={hoveredPoint === idx ? "rgb(var(--color-tertiary))" : "currentColor"} 
                        r={hoveredPoint === idx ? "3" : "1.5"} 
                        className="cursor-pointer transition-all duration-300" 
                        onMouseEnter={() => setHoveredPoint(idx)} 
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    ))}
                  </g>
                </svg>

                {tryoutScores.length > 0 && hoveredPoint === null && (
                  <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] px-2 py-1 rounded-md font-bold shadow-sm pointer-events-none transition-opacity duration-300">
                    {tryoutScores[tryoutScores.length - 1]}
                  </div>
                )}
                
                {hoveredPoint !== null && trendPoints[hoveredPoint] && (
                  <div 
                    className="absolute bg-tertiary text-on-tertiary text-[10px] px-2 py-1 rounded-md font-bold shadow-sm z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-200"
                    style={{
                      left: `${trendPoints[hoveredPoint].cx}%`,
                      top: `calc(${(trendPoints[hoveredPoint].cy / 40) * 100}% - 8px)`
                    }}
                  >
                    {trendPoints[hoveredPoint].val}
                  </div>
                )}
              </div>
            )}
            
            {tryoutScores.length > 0 && (
              <div className={`grid gap-2 pt-2`} style={{ gridTemplateColumns: `repeat(${tryoutScores.length}, minmax(0, 1fr))` }}>
                {tryoutScores.map((score, idx) => (
                  <div key={idx} className="text-center">
                    <p className="font-caption text-caption font-bold text-on-surface">{score}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase">TO {idx + 1}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={`grid grid-cols-1 gap-md transition-all duration-700 delay-[700ms] pb-8 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-md p-md glass-card rounded-2xl shadow-[0px_8px_32px_rgba(37,99,235,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <div className="flex-1">
                <h4 className="font-label-md text-label-md text-on-surface-variant">Akurasi Rata-rata</h4>
                <div className="flex items-end justify-between">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{tryoutScores.length > 0 ? '78%' : '-'}</span>
                  {tryoutScores.length > 0 && <span className="font-caption text-caption text-tertiary">+2.4%</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-md p-md glass-card rounded-2xl shadow-[0px_8px_32px_rgba(37,99,235,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div className="flex-1">
                <h4 className="font-label-md text-label-md text-on-surface-variant">Waktu Pengerjaan</h4>
                <div className="flex items-end justify-between">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{tryoutScores.length > 0 ? '45s/soal' : '-'}</span>
                  {tryoutScores.length > 0 && <span className="font-caption text-caption text-on-surface-variant">-5s efisiensi</span>}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Statistik;
