import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const Notifikasi = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  const notifHarian = useStore((state) => state.notifHarian);
  const waktuBelajar = useStore((state) => state.waktuBelajar);
  const notifJeda = useStore((state) => state.notifJeda);
  const suaraNotif = useStore((state) => state.suaraNotif);
  const getar = useStore((state) => state.getar);
  const updateNotif = useStore((state) => state.updateNotif);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-surface min-h-screen text-on-surface pb-28 font-sans">
      <header className="fixed top-0 left-0 w-full z-40 flex items-center gap-4 px-margin-mobile py-4 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/20">
        <button onClick={() => navigate('/pengaturan')} className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity">
          arrow_back
        </button>
        <h1 className="text-[17px] font-medium text-on-surface-variant">Pengaturan Notifikasi</h1>
      </header>

      <main className={`pt-24 px-margin-mobile max-w-md mx-auto transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Section 1 */}
        <div className="mb-8">
          <p className="text-primary text-[11px] font-bold tracking-widest mb-3 px-1 uppercase">
            Pengingat Belajar
          </p>
          <div className="bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
            
            {/* Pengingat Harian */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                </div>
                <span className="text-[15px] text-on-surface">Pengingat Harian</span>
              </div>
              <button 
                onClick={() => updateNotif('notifHarian', !notifHarian)}
                className={`w-[46px] h-[26px] rounded-full relative transition-colors duration-300 ${notifHarian ? 'bg-primary' : 'bg-outline-variant/50'}`}
              >
                <div className={`w-[22px] h-[22px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform duration-300 ${notifHarian ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>

            <div className="h-[1px] bg-outline-variant/20 ml-[72px]"></div>

            {/* Waktu Belajar */}
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e6f4ea] dark:bg-[#e6f4ea]/10 flex items-center justify-center text-[#008a3c]">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <span className="text-[15px] text-on-surface">Waktu Belajar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-primary">{waktuBelajar}</span>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </div>
            </div>

            <div className="h-[1px] bg-outline-variant/20 ml-[72px]"></div>

            {/* Pengingat Jeda */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e6f4ea] dark:bg-[#e6f4ea]/10 flex items-center justify-center text-[#008a3c]">
                  <span className="material-symbols-outlined text-[20px]">coffee</span>
                </div>
                <span className="text-[15px] text-on-surface">Pengingat Jeda</span>
              </div>
              <button 
                onClick={() => updateNotif('notifJeda', !notifJeda)}
                className={`w-[46px] h-[26px] rounded-full relative transition-colors duration-300 ${notifJeda ? 'bg-primary' : 'bg-outline-variant/50'}`}
              >
                <div className={`w-[22px] h-[22px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform duration-300 ${notifJeda ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <p className="text-primary text-[11px] font-bold tracking-widest mb-3 px-1 uppercase">
            Suara & Getar
          </p>
          <div className="bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
            
            {/* Suara Notifikasi */}
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </div>
                <span className="text-[15px] text-on-surface">Suara Notifikasi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-on-surface-variant">{suaraNotif}</span>
                <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
              </div>
            </div>

            <div className="h-[1px] bg-outline-variant/20 ml-[72px]"></div>

            {/* Getar */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e0f2fe] dark:bg-[#e0f2fe]/10 flex items-center justify-center text-[#0284c7]">
                  <span className="material-symbols-outlined text-[20px]">vibration</span>
                </div>
                <span className="text-[15px] text-on-surface">Getar</span>
              </div>
              <button 
                onClick={() => updateNotif('getar', !getar)}
                className={`w-[46px] h-[26px] rounded-full relative transition-colors duration-300 ${getar ? 'bg-primary' : 'bg-outline-variant/50'}`}
              >
                <div className={`w-[22px] h-[22px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform duration-300 ${getar ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Banner Kustomisasi Fokus Anda */}
        <div className="bg-[#1a1f2e] dark:bg-surface-container-highest rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-[17px] font-bold mb-2">Kustomisasi Fokus Anda</h3>
          <p className="text-[13px] text-white/80 leading-relaxed">
            Notifikasi yang tepat membantu anda belajar lebih konsisten tanpa gangguan.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Notifikasi;
