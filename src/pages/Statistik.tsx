import { useState, useEffect } from 'react';

const Statistik = () => {
  const [mounted, setMounted] = useState(false);
  const [filterDays, setFilterDays] = useState('7');
  const [chartHeights, setChartHeights] = useState([60, 40, 85, 50, 75, 30, 95]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFilter = (days: string) => {
    setFilterDays(days);
    if (days === '7') {
      setChartHeights([60, 40, 85, 50, 75, 30, 95]);
    } else {
      setChartHeights([45, 70, 30, 90, 65, 80, 55]);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center overflow-hidden border border-primary-container/10">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIqIFGakeuPVuCDcb3ASntICT4zhfxSuDlWiF2dPbfCxKGgrgOPPJYdpsUGik_t6y2wsq9Ts-4H7dBOA-vG6cndJtDDjPZdyS-eAy7azw9KsRGDlS0KjIOvjkU852d98dLXUc-5qpIQoDHN-GayQ5UrkumkB3hPA78fsyGPeb5SjTgCTsKqs8RZHFAVwZoFYh_3Z2pVpujQwOaRw2lnQMKbsiDJDTTSTygPAKdupUnZ4L9HgrfXJhs9pseyqbfA9Ke2nbtRVPeOUM" />
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
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold">Luar biasa, Alex!</h2>
            <p className="font-body-md text-body-md opacity-90 max-w-[280px]">Skor rata-rata Anda meningkat 12% dibanding minggu lalu.</p>
          </div>
          
          <div className="absolute -bottom-16 left-0 w-full px-margin-mobile z-10">
            <div className="grid grid-cols-3 gap-3">
              <div className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">15</span>
                <span className="font-caption text-caption text-on-surface-variant">Hari Aktif</span>
              </div>
              <div className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">4</span>
                <span className="font-caption text-caption text-on-surface-variant">Total Tryout</span>
              </div>
              <div className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">24.5</span>
                <span className="font-caption text-caption text-on-surface-variant">Jam Belajar</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-24 px-margin-mobile space-y-lg max-w-4xl mx-auto">
          <div className={`flex justify-between items-center bg-surface-container-low p-1 rounded-full w-fit mx-auto border border-outline-variant/30 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${filterDays === '7' ? 'bg-[#004ac6] text-white' : 'text-on-surface-variant'}`} onClick={() => toggleFilter('7')}>7 Hari</button>
            <button className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all duration-300 ${filterDays === '30' ? 'bg-[#004ac6] text-white' : 'text-on-surface-variant'}`} onClick={() => toggleFilter('30')}>30 Hari</button>
          </div>

          <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-2xl p-lg space-y-md transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Intensitas Belajar</h3>
              <span className="material-symbols-outlined text-primary">analytics</span>
            </div>
            <div className="h-48 flex items-end justify-between gap-2 px-1 pb-2">
              {['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'].map((day, idx) => (
                <div key={day} className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <span className="text-[10px] font-bold text-on-surface-variant mb-1 transition-colors group-hover:text-primary">
                    {((chartHeights[idx] / 100) * 4).toFixed(1)}j
                  </span>
                  <div className="w-8 bg-primary-container/20 rounded-t-lg relative h-32 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-lg transition-[height] duration-1000 ease-in-out group-hover:bg-primary-container" style={{height: `${chartHeights[idx]}%`}}></div>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant mt-2">{day}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-2xl p-lg space-y-md transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Tren Tryout</h3>
                <p className="font-caption text-caption text-on-surface-variant">4 Tryout terakhir</p>
              </div>
              <div className="flex items-center gap-1 text-tertiary font-bold">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                <span className="font-label-md text-label-md">+45 pts</span>
              </div>
            </div>
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
                <path d="M0 35 Q 25 32, 33 25 T 66 15 T 100 5 V 40 H 0 Z" fill="url(#lineGrad)" className="animate-fade"></path>
                <path d="M0 35 Q 25 32, 33 25 T 66 15 T 100 5" fill="none" stroke="rgb(var(--color-primary))" strokeLinecap="round" strokeWidth="1" className="animate-draw"></path>
                
                <g className="text-primary animate-fade">
                  {[
                    { cx: 0, cy: 35, val: 720 },
                    { cx: 33, cy: 25, val: 785 },
                    { cx: 66, cy: 15, val: 820 },
                    { cx: 100, cy: 5, val: 890 },
                  ].map((pt, idx) => (
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

              <div className={`absolute top-0 right-0 bg-primary text-on-primary text-[10px] px-2 py-1 rounded-md font-bold shadow-sm pointer-events-none transition-opacity duration-300 ${hoveredPoint === null ? 'opacity-100' : 'opacity-0'}`}>890</div>
              
              {hoveredPoint !== null && (
                 <div 
                   className="absolute bg-tertiary text-on-tertiary text-[10px] px-2 py-1 rounded-md font-bold shadow-sm z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-200"
                   style={{
                     left: `${[0, 33, 66, 100][hoveredPoint]}%`,
                     top: `calc(${[35, 25, 15, 5][hoveredPoint] / 40 * 100}% - 8px)`
                   }}
                 >
                   {[720, 785, 820, 890][hoveredPoint]}
                 </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="text-center">
                <p className="font-caption text-caption font-bold text-on-surface">720</p>
                <p className="text-[10px] text-on-surface-variant uppercase">TO 1</p>
              </div>
              <div className="text-center">
                <p className="font-caption text-caption font-bold text-on-surface">785</p>
                <p className="text-[10px] text-on-surface-variant uppercase">TO 2</p>
              </div>
              <div className="text-center">
                <p className="font-caption text-caption font-bold text-on-surface">820</p>
                <p className="text-[10px] text-on-surface-variant uppercase">TO 3</p>
              </div>
              <div className="text-center">
                <p className="font-caption text-caption font-bold text-on-surface">890</p>
                <p className="text-[10px] text-on-surface-variant uppercase">TO 4</p>
              </div>
            </div>
          </section>

          <section className={`grid grid-cols-1 gap-md transition-all duration-700 delay-[700ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-md p-md glass-card rounded-2xl shadow-[0px_8px_32px_rgba(37,99,235,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <div className="flex-1">
                <h4 className="font-label-md text-label-md text-on-surface-variant">Akurasi Rata-rata</h4>
                <div className="flex items-end justify-between">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">88%</span>
                  <span className="font-caption text-caption text-tertiary">+2.4%</span>
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
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">45s/soal</span>
                  <span className="font-caption text-caption text-on-surface-variant">-5s efisiensi</span>
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
