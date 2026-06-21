import { useState, useEffect } from 'react';

const Pengaturan = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isOfflineSync, setIsOfflineSync] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check initial theme from document class
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 dark:bg-surface-dim/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-on-surface-variant hover:opacity-80 transition-opacity">arrow_back</button>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">Pengaturan</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:opacity-80 transition-opacity">search</span>
        </div>
      </header>

      <main className="mt-20 px-margin-mobile space-y-lg max-w-4xl mx-auto">
        <section className={`bg-surface-container-low rounded-xl p-md shadow-[0px_8px_32px_rgba(37,99,235,0.08)] flex items-center gap-md transition-all duration-700 active:scale-[0.98] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNGzQY59O2HdEZHbUZUMlfViE31sT7ZmFwrGJkBPP4LXViW1fN9F5XWyW8gwvzrPwimCBcOuVSE40EWSt9LWipuPsc9btC7Jb13edrZZXilhQXNYQrVJsF1qmdNIXgJOcECNCN4xEwLVEKoOcUsl5RXKsS1AMo0j2v1iT2wASkRNRHVptxnTbRPSZNjSN8TMgjlaz21S03mCBZu4WBn4MaAkaOdaUCrtZVKEJaU175oj4wACWotFFDOPqzJGwsoXpqImXZRtUbSSI" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Budi Pratama</h2>
            <p className="font-label-md text-label-md text-on-surface-variant truncate">budi.pratama@email.com</p>
            <div className="mt-sm inline-flex items-center gap-xs px-sm py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[12px] font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
              PRO MEMBER
            </div>
          </div>
          <button className="material-symbols-outlined text-primary">edit</button>
        </section>

        <div className={`space-y-sm transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-label-md text-label-md text-primary font-bold px-xs uppercase tracking-wider">Umum</p>
          <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-[0px_8px_32px_rgba(37,99,235,0.04)]">
            <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-high transition-colors text-left group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <span className="block font-label-md text-label-md text-on-surface">Akun</span>
                  <span className="block text-caption font-caption text-on-surface-variant">Kelola profil dan data pribadi</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
            <div className="h-px bg-outline-variant/20 mx-md"></div>
            
            <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-high transition-colors text-left group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">notifications</span>
                </div>
                <div>
                  <span className="block font-label-md text-label-md text-on-surface">Notifikasi</span>
                  <span className="block text-caption font-caption text-on-surface-variant">Atur jadwal belajar dan pengingat</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
            <div className="h-px bg-outline-variant/20 mx-md"></div>
            
            <div className="w-full flex items-center justify-between p-md text-left">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <div>
                  <span className="block font-label-md text-label-md text-on-surface">Tema Gelap</span>
                  <span className="block text-caption font-caption text-on-surface-variant">Aktifkan untuk kenyamanan mata</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" checked={isDark} onChange={toggleTheme} />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className={`space-y-sm transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-label-md text-label-md text-primary font-bold px-xs uppercase tracking-wider">Aplikasi</p>
          <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-[0px_8px_32px_rgba(37,99,235,0.04)]">
            <div className="w-full flex items-center justify-between p-md text-left">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">cloud_download</span>
                </div>
                <div>
                  <span className="block font-label-md text-label-md text-on-surface">Offline Sync</span>
                  <span className="block text-caption font-caption text-on-surface-variant">Akses materi tanpa internet</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" checked={isOfflineSync} onChange={() => setIsOfflineSync(!isOfflineSync)} />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="h-px bg-outline-variant/20 mx-md"></div>
            
            <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-high transition-colors text-left group">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">help</span>
                </div>
                <div>
                  <span className="block font-label-md text-label-md text-on-surface">Bantuan &amp; Dukungan</span>
                  <span className="block text-caption font-caption text-on-surface-variant">Pusat bantuan dan FAQ</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          </div>
        </div>

        <button className={`w-full flex items-center justify-center gap-sm p-md bg-error-container text-on-error-container rounded-xl font-bold transition-all duration-700 delay-300 active:scale-[0.95] mt-lg ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="material-symbols-outlined">logout</span>
          Keluar
        </button>

        <div className={`text-center py-lg transition-all duration-700 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-caption text-caption text-outline-variant">CPNS Master v2.4.0</p>
          <p className="font-caption text-caption text-outline-variant mt-xs">Made with ❤️ for Your Success</p>
        </div>
      </main>
    </>
  );
};

export default Pengaturan;
