import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db/database';
import { useStore } from '../store/useStore';

const Pengaturan = () => {
  const [mounted, setMounted] = useState(false);
  const [isOfflineSync, setIsOfflineSync] = useState(true);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const isDark = useStore((state) => state.isDark);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const profileName = useStore((state) => state.profileName);
  const profileAvatar = useStore((state) => state.profileAvatar);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReset = async () => {
    try {
      await db.delete();
      await db.open();
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset database", error);
      alert("Gagal mereset data.");
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
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container shrink-0 bg-surface-container">
            <img className="w-full h-full object-cover" alt="Profile" src={profileAvatar} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{profileName}</h2>
            <div className="mt-sm inline-flex items-center gap-xs px-sm py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[12px] font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              OFFLINE MODE
            </div>
          </div>
          <button
            className="material-symbols-outlined text-primary hover:opacity-80 active:scale-95 transition-all"
            onClick={() => navigate('/profil')}
          >
            edit
          </button>
        </section>

        <div className={`space-y-sm transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-label-md text-label-md text-primary font-bold px-xs uppercase tracking-wider">Umum</p>
          <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-[0px_8px_32px_rgba(37,99,235,0.04)]">
            <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-high transition-colors text-left group" onClick={() => navigate('/profil')}>
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

            <button className="w-full flex items-center justify-between p-md hover:bg-surface-container-high transition-colors text-left group" onClick={() => navigate('/notifikasi')}>
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

        <button
          onClick={() => setResetModalOpen(true)}
          className={`w-full flex items-center justify-center gap-sm p-md bg-error/10 text-error rounded-xl font-bold transition-all duration-700 delay-300 active:scale-[0.95] mt-lg hover:bg-error hover:text-white ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="material-symbols-outlined">delete_sweep</span>
          Reset Aplikasi
        </button>

        <div className={`text-center py-lg transition-all duration-700 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-caption text-caption text-outline-variant">CPNS Master v2.4.0</p>
          <p className="font-caption text-caption text-outline-variant mt-xs">Offline-First App</p>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      <div className={`fixed inset-0 z-[100] items-center justify-center p-gutter transition-all duration-300 ${resetModalOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={() => setResetModalOpen(false)}></div>
        <div className={`relative w-full max-w-xs bg-surface rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ${resetModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="p-lg">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <h3 className="font-headline-sm text-on-surface mb-sm">
              Reset Semua Data?
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Tindakan ini akan menghapus <strong>seluruh</strong> data jadwal, histori tryout, dan riwayat belajar secara permanen. Aplikasi akan kembali seperti baru diinstal.
            </p>
            <div className="mt-xl flex flex-col gap-3">
              <button
                className="w-full py-md text-white bg-error rounded-lg font-label-md active:scale-95 transition-transform font-bold"
                onClick={handleReset}
              >
                Ya, Hapus Semua
              </button>
              <button
                className="w-full py-md border border-outline text-on-surface-variant rounded-lg font-label-md active:scale-95 transition-transform"
                onClick={() => setResetModalOpen(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pengaturan;
