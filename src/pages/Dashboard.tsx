import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

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

  return (
    <>
      <header id="dashboard-header" className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container transition-transform hover:scale-105 active:scale-95 duration-200">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXhhewhRT9uNXeadA3oxXaF2g4ZlOygnEHsMN9N15t5VDlAMXgd9i39cCBTJrvNVQ809_wDqYczcewg7daGbI_sbJL_vwLiIIdNUrQBRhlWbvekDgYL5Rmftb7uoux5xedDjzZzKlx7gLzgh9cn5n8YLbWyZzoz1oD371yAM9T74M-4nO6W6Dc4M8pDu8F6ackX5mZlPfyamByqbcLG--vGiNSC1y_EYu23_M557R-ildo0wRbirAxAu8exE5XtXUBvVZD3AH1f6s" />
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">CPNS Master</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">notifications</button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-4xl mx-auto space-y-lg">
        <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-on-surface-variant font-label-md">Selamat pagi, Andi!</p>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Halo, siap belajar hari ini?</h2>
        </section>

        <div className="grid grid-cols-2 gap-md">
          <div className={`col-span-2 primary-gradient p-gutter rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.15)] flex flex-col justify-between h-48 relative overflow-hidden group transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative z-10">
              <h3 className="text-on-primary font-label-md opacity-90">Progress Mingguan</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-on-primary">72%</span>
                <span className="text-on-primary text-caption opacity-80">+12% dari pekan lalu</span>
              </div>
            </div>
            <div className="relative z-10 w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-full rounded-full transition-all duration-1000 ease-out" style={{ width: mounted ? '72%' : '0%' }}></div>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          </div>

          <div className={`glass-card p-md rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.06)] flex flex-col gap-sm hover:border-primary/20 transition-all duration-500 delay-200 active:scale-[0.98] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-md">check_circle</span>
              <span className="font-label-md text-on-surface-variant">Target</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">3/5</p>
              <p className="text-caption text-on-surface-variant">Subbab Selesai</p>
            </div>
          </div>

          <div className={`glass-card p-md rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.06)] flex flex-col gap-sm hover:border-primary/20 transition-all duration-500 delay-300 active:scale-[0.98] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-md">schedule</span>
              <span className="font-label-md text-on-surface-variant">Hari Ini</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">2j 45m</p>
              <p className="text-caption text-on-surface-variant">Total Belajar</p>
            </div>
          </div>

          <div className={`col-span-2 glass-card p-gutter rounded-xl shadow-[0px_8px_32px_rgba(37,99,235,0.06)] space-y-md transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
                <h3 className="font-label-md text-on-surface font-bold">Tryout Terakhir</h3>
              </div>
              <span className="text-primary font-label-md font-bold">455 pts</span>
            </div>
            <div className="grid grid-cols-3 gap-xs">
              <div className="bg-surface-container-low p-sm rounded-lg text-center">
                <p className="text-caption text-on-surface-variant">TWK</p>
                <p className="font-bold text-on-surface">115</p>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg text-center">
                <p className="text-caption text-on-surface-variant">TIU</p>
                <p className="font-bold text-on-surface">155</p>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg text-center">
                <p className="text-caption text-on-surface-variant">TKP</p>
                <p className="font-bold text-on-surface">185</p>
              </div>
            </div>
          </div>
        </div>

        <section className={`space-y-md transition-all duration-500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-end">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Grafik Jam Belajar</h3>
            <span className="text-caption text-primary font-label-md">Mei 2024</span>
          </div>
          <div className="glass-card p-gutter rounded-xl h-48 flex items-end justify-between gap-2 shadow-[0px_8px_32px_rgba(37,99,235,0.04)]">
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-on-surface-variant">3j</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary-container/40 h-3/4 group-hover:h-full group-hover:bg-primary transition-all duration-500"></div>
              </div>
              <span className="text-xs text-on-surface-variant">S</span>
            </div>
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-on-surface-variant">2j</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary-container/40 h-1/2 group-hover:h-full group-hover:bg-primary transition-all duration-500"></div>
              </div>
              <span className="text-xs text-on-surface-variant">S</span>
            </div>
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-primary">4j</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                <div className="absolute bottom-0 w-full bg-primary h-4/5 group-hover:h-full transition-all duration-500"></div>
              </div>
              <span className="text-xs font-bold text-primary">R</span>
            </div>
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-on-surface-variant">2.5j</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary-container/40 h-2/3 group-hover:h-full group-hover:bg-primary transition-all duration-500"></div>
              </div>
              <span className="text-xs text-on-surface-variant">K</span>
            </div>
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-on-surface-variant">1j</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary-container/40 h-1/3 group-hover:h-full group-hover:bg-primary transition-all duration-500"></div>
              </div>
              <span className="text-xs text-on-surface-variant">J</span>
            </div>
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-on-surface-variant">1.5j</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary-container/40 h-2/5 group-hover:h-full group-hover:bg-primary transition-all duration-500"></div>
              </div>
              <span className="text-xs text-on-surface-variant">S</span>
            </div>
            <div className="flex flex-col items-center justify-end gap-1 flex-1 group h-full">
              <span className="text-[10px] font-bold text-on-surface-variant">45m</span>
              <div className="w-full bg-primary/10 rounded-t-lg relative h-24 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary-container/40 h-1/4 group-hover:h-full group-hover:bg-primary transition-all duration-500"></div>
              </div>
              <span className="text-xs text-on-surface-variant">M</span>
            </div>
          </div>
        </section>

        <section className={`space-y-md transition-all duration-500 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Aktivitas Terakhir</h3>
            <button className="text-primary font-label-md">Lihat Semua</button>
          </div>
          <div className="space-y-sm">
            <div className="flex items-center gap-md p-md bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div className="flex-1">
                <p className="font-label-md text-on-surface font-bold">Nasionalisme - TWK</p>
                <p className="text-caption text-on-surface-variant">Selesai • 45 menit yang lalu</p>
              </div>
              <span className="material-symbols-outlined text-tertiary">check_circle</span>
            </div>
            <div className="flex items-center gap-md p-md bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">calculate</span>
              </div>
              <div className="flex-1">
                <p className="font-label-md text-on-surface font-bold">Deret Angka - TIU</p>
                <p className="text-caption text-on-surface-variant">Selesai • 2 jam yang lalu</p>
              </div>
              <span className="material-symbols-outlined text-tertiary">check_circle</span>
            </div>
            <div className="flex items-center gap-md p-md bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <div className="flex-1">
                <p className="font-label-md text-on-surface font-bold">Mini Tryout #4</p>
                <p className="text-caption text-on-surface-variant">Selesai • Kemarin</p>
              </div>
              <span className="material-symbols-outlined text-tertiary">check_circle</span>
            </div>
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
