import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import { useStore } from '../store/useStore';

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const profileName = useStore((state) => state.profileName);
  const profileAvatar = useStore((state) => state.profileAvatar);

  useEffect(() => {
    setMounted(true);
    
    // Scroll behavior for TopAppBar
    const header = document.getElementById('dashboard-header');
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header?.classList.add('shadow-sm', 'bg-surface/90');
        } else {
            header?.classList.remove('shadow-sm', 'bg-surface/90');
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalDateString = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const todayStr = getLocalDateString(new Date());

  // Fetch real data
  const allPlans = useLiveQuery(() => db.studyPlans.toArray(), []);
  const allTryouts = useLiveQuery(() => db.tryouts.orderBy('date').reverse().toArray(), []);
  const allSubtopics = useLiveQuery(() => db.subtopics.toArray(), []);

  // Safe checks
  const plansToday = allPlans?.filter(p => p.date === todayStr) || [];
  
  // Progress Hari Ini
  const completedToday = plansToday.filter(p => p.status === 'completed').length;
  const totalToday = plansToday.length;

  // Total Belajar Hari Ini
  const totalDurationSeconds = plansToday.reduce((acc, curr) => acc + (curr.actualDuration || 0), 0);
  const hours = Math.floor(totalDurationSeconds / 3600);
  const minutes = Math.floor((totalDurationSeconds % 3600) / 60);
  const seconds = totalDurationSeconds % 60;
  
  let totalBelajarStr = '0m';
  if (hours > 0) {
    totalBelajarStr = `${hours}j ${minutes}m`;
  } else if (minutes > 0) {
    totalBelajarStr = `${minutes}m ${seconds}s`;
  } else {
    totalBelajarStr = `${seconds}s`;
  }

  // Tryout Terakhir
  const latestTryout = allTryouts && allTryouts.length > 0 ? allTryouts[0] : null;

  // Progress Mingguan (Senin - Minggu ini)
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(d.setDate(diff));
  startOfWeek.setHours(0,0,0,0);
  const plansThisWeek = allPlans?.filter(p => new Date(p.date) >= startOfWeek) || [];
  const completedThisWeek = plansThisWeek.filter(p => p.status === 'completed').length;
  const totalThisWeek = plansThisWeek.length;
  const progressPercent = totalThisWeek > 0 ? Math.round((completedThisWeek / totalThisWeek) * 100) : 0;

  // Grafik Jam Belajar (7 Hari Terakhir)
  const last7Days = Array.from({length: 7}).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });
  
  const chartData = last7Days.map(date => {
    const dateStrLocal = getLocalDateString(date);
    const dayName = ['M','S','S','R','K','J','S'][date.getDay()];
    const dateNum = date.getDate();
    const plansForDate = allPlans?.filter(p => p.date === dateStrLocal && p.status === 'completed') || [];
    const count = plansForDate.length;
    
    return { dayName, dateNum, count, label: count.toString(), isToday: dateStrLocal === todayStr };
  });
  const maxChart = Math.max(...chartData.map(d => d.count), 5);

  // Aktivitas Terakhir (Gabungan Tryout dan StudyPlans)
  const recentActivities = [
    ...(allPlans?.filter(p => p.status === 'completed').map(p => ({
      id: `p-${p.id}`,
      type: 'plan',
      date: new Date(p.date), // Simplification: we use plan date. For better accuracy we'd need a completedAt timestamp.
      title: allSubtopics?.find(s => s.id === p.subtopicId)?.name || 'Materi Belajar',
      desc: 'Selesai dipelajari',
      icon: 'menu_book',
      color: 'primary'
    })) || []),
    ...(allTryouts?.map(t => ({
      id: `t-${t.id}`,
      type: 'tryout',
      date: new Date(t.date),
      title: `Tryout Mandiri`,
      desc: `Skor Total: ${t.twk + t.tiu + t.tkp}`,
      icon: 'timer',
      color: 'secondary'
    })) || [])
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3);

  return (
    <>
      <header id="dashboard-header" className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container transition-transform hover:scale-105 active:scale-95 duration-200 bg-surface-container">
            <img className="w-full h-full object-cover" alt="Profile" src={profileAvatar} />
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">CPNS Master</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">notifications</button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-4xl mx-auto space-y-lg">
        <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-on-surface-variant font-label-md">Selamat pagi, {profileName.split(' ')[0]}!</p>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Halo, siap belajar hari ini?</h2>
        </section>

        <div className="grid grid-cols-2 gap-md">
          <div className={`col-span-2 primary-gradient p-gutter rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.15)] flex flex-col justify-between h-48 relative overflow-hidden group transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative z-10">
              <h3 className="text-on-primary font-label-md opacity-90">Progress Mingguan</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-on-primary">{progressPercent}%</span>
                <span className="text-on-primary text-caption opacity-80">{completedThisWeek} / {totalThisWeek} Selesai</span>
              </div>
            </div>
            <div className="relative z-10 w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-full rounded-full transition-all duration-1000 ease-out" style={{ width: mounted ? `${progressPercent}%` : '0%' }}></div>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          </div>

          <div className={`glass-card p-md rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.06)] flex flex-col gap-sm hover:border-primary/20 transition-all duration-500 delay-200 active:scale-[0.98] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span className="text-xs font-medium text-on-surface-variant truncate">Target Hari Ini</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{completedToday}/{totalToday}</p>
              <p className="text-caption text-on-surface-variant">Subbab Selesai</p>
            </div>
          </div>

          <div className={`glass-card p-md rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.06)] flex flex-col gap-sm hover:border-primary/20 transition-all duration-500 delay-300 active:scale-[0.98] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span className="text-xs font-medium text-on-surface-variant truncate">Belajar Hari Ini</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{totalBelajarStr}</p>
              <p className="text-caption text-on-surface-variant">Total Waktu</p>
            </div>
          </div>

          <Link to="/tryout" className={`block col-span-2 glass-card p-gutter rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.06)] space-y-md hover:border-primary/20 active:scale-[0.98] transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
                <h3 className="font-label-md text-on-surface font-bold">Tryout Terakhir</h3>
              </div>
              <span className="text-primary font-label-md font-bold">{latestTryout ? latestTryout.twk + latestTryout.tiu + latestTryout.tkp : 0} pts</span>
            </div>
            <div className="grid grid-cols-3 gap-xs">
              <div className="bg-surface-container-low p-sm rounded-lg text-center">
                <p className="text-caption text-on-surface-variant">TWK</p>
                <p className="font-bold text-on-surface">{latestTryout?.twk || '-'}</p>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg text-center">
                <p className="text-caption text-on-surface-variant">TIU</p>
                <p className="font-bold text-on-surface">{latestTryout?.tiu || '-'}</p>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg text-center">
                <p className="text-caption text-on-surface-variant">TKP</p>
                <p className="font-bold text-on-surface">{latestTryout?.tkp || '-'}</p>
              </div>
            </div>
          </Link>
        </div>

        <section className={`space-y-md transition-all duration-500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-end">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Grafik Subbab Selesai</h3>
            <span className="text-caption text-primary font-label-md">7 Hari Terakhir</span>
          </div>
          <div className="glass-card p-gutter rounded-xl h-48 flex items-end justify-between gap-2 shadow-[0px_8px_32px_rgba(37,99,235,0.04)]">
            {chartData.map((d, idx) => (
              <div key={idx} className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
                <span className={`text-[10px] font-bold ${d.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>{d.label}</span>
                <div className={`w-full rounded-t-lg relative h-24 overflow-hidden ${d.isToday ? 'bg-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-primary/5'}`}>
                  <div 
                    className={`absolute bottom-0 w-full transition-all duration-1000 ${d.isToday ? 'bg-primary' : 'bg-primary-container/60 group-hover:bg-primary'}`}
                    style={{ height: mounted ? `max(4px, ${(d.count / maxChart) * 100}%)` : '0%' }}
                  ></div>
                </div>
                <div className="flex flex-col items-center mt-1">
                  <span className={`text-xs leading-none ${d.isToday ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>{d.dayName}</span>
                  <span className={`text-[9px] mt-1 ${d.isToday ? 'font-bold text-primary' : 'text-on-surface-variant/70'}`}>{d.dateNum}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`space-y-md transition-all duration-500 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Aktivitas Terakhir</h3>
            <button className="text-primary font-label-md">Lihat Semua</button>
          </div>
          <div className="space-y-sm">
            {recentActivities.length === 0 ? (
              <div className="text-center p-md bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                <p className="text-on-surface-variant text-sm">Belum ada aktivitas.</p>
              </div>
            ) : (
              recentActivities.map(act => (
                <div key={act.id} className="flex items-center gap-md p-md bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-${act.color}/10 flex items-center justify-center text-${act.color}`}>
                    <span className="material-symbols-outlined">{act.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-label-md text-on-surface font-bold">{act.title}</p>
                    <p className="text-caption text-on-surface-variant">{act.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-tertiary">check_circle</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Link to="/jadwal" className="fixed bottom-24 right-margin-mobile w-14 h-14 primary-gradient rounded-full shadow-lg flex items-center justify-center text-white z-40 hover:scale-110 active:scale-95 transition-transform duration-200">
        <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'wght' 700"}}>add</span>
      </Link>
    </>
  );
};

export default Dashboard;
