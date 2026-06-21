import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailTryout = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-opacity hover:opacity-80">
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 transition-transform"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Detail Hasil Tryout</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2qVIPbqzEATVCsxX89dR-Cr9CdR7PP7hqAsM7qVAo2aNU5PuDmmqYulObOqYFdfjdPdNvs8BEWMFSPdhiSSrMwLBGhOdwk3QKS1KgrZaBFa3Uk8__ZujTuBhlQ7tK_Ovj5ZYCUQUCIH2YKxUfFmoIFNC2DWAeU4LShHLmzOM8CW6m6glMtFcywRDTy05aVr8Q9dFYIDHmrQk8fLp4OQPEqWlayVxaAMduti7wuQny6K5D6_JVi4144NmyBV4nZODJIcwNKpSL8y0" />
          </div>
        </div>
      </header>

      <main className="pt-20 px-margin-mobile max-w-2xl mx-auto space-y-lg">
        <section className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="glass-card rounded-xl p-lg shadow-[0px_8px_32px_rgba(37,99,235,0.08)] relative overflow-hidden">
            <p className="text-on-surface-variant font-label-md text-label-md">18 Juni 2024 • Tryout Nasional #12</p>
            <div className="mt-4 flex items-baseline gap-2">
              <h2 className="text-[48px] font-extrabold text-primary leading-none">455</h2>
              <span className="text-on-surface-variant font-label-md">/ 550</span>
            </div>
            <p className="mt-2 text-on-surface-variant font-body-md">Skor kamu melampaui passing grade nasional. Pertahankan!</p>
            <div className="mt-6 flex gap-4">
              <div className="flex-1 bg-surface-container-low p-3 rounded-lg border border-outline-variant/30">
                <p className="text-on-surface-variant text-[12px] uppercase tracking-wider font-bold">Waktu</p>
                <p className="text-headline-sm font-bold text-primary">85 <span className="text-sm font-normal">m</span></p>
              </div>
              <div className="flex-1 bg-surface-container-low p-3 rounded-lg border border-outline-variant/30">
                <p className="text-on-surface-variant text-[12px] uppercase tracking-wider font-bold">Akurasi</p>
                <p className="text-headline-sm font-bold text-primary">82<span className="text-sm font-normal">%</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className={`space-y-md transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="font-headline-sm text-headline-sm text-on-surface px-1">Rincian Nilai Per Sesi</h3>

          <div className="glass-card rounded-xl p-md flex flex-col gap-3 transition-transform active:scale-[0.98]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-on-surface">TWK - Tes Wawasan Kebangsaan</h4>
                <p className="text-on-surface-variant text-label-md">Ambang Batas: 65</p>
              </div>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-headline-md font-bold text-primary">115 <span className="text-sm font-normal text-on-surface-variant">/ 150</span></span>
              <span className="text-tertiary font-bold">+50</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000 ease-out" style={{ width: '76%' }}></div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-md flex flex-col gap-3 transition-transform active:scale-[0.98]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-on-surface">TIU - Tes Intelegensia Umum</h4>
                <p className="text-on-surface-variant text-label-md">Ambang Batas: 80</p>
              </div>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-headline-md font-bold text-primary">145 <span className="text-sm font-normal text-on-surface-variant">/ 175</span></span>
              <span className="text-tertiary font-bold">+65</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000 ease-out" style={{ width: '83%' }}></div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-md flex flex-col gap-3 transition-transform active:scale-[0.98]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-on-surface">TKP - Tes Karakteristik Pribadi</h4>
                <p className="text-on-surface-variant text-label-md">Ambang Batas: 166</p>
              </div>
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-headline-md font-bold text-primary">195 <span className="text-sm font-normal text-on-surface-variant">/ 225</span></span>
              <span className="text-tertiary font-bold">+29</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000 ease-out" style={{ width: '86%' }}></div>
            </div>
          </div>
        </section>

        <section className={`transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="glass-card rounded-xl p-lg space-y-md border-l-4 border-l-primary">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">leaderboard</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Analisis Performa</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-on-surface-variant text-label-md">Peringkat Kamu</p>
                <p className="text-headline-sm font-extrabold text-on-surface">12 <span className="text-sm font-normal text-on-surface-variant">dari 150</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-on-surface-variant text-label-md">Kec. Menjawab</p>
                <p className="text-headline-sm font-extrabold text-on-surface">45 <span className="text-sm font-normal text-on-surface-variant">dtk/soal</span></p>
              </div>
            </div>
            <div className="pt-2 border-t border-outline-variant/30">
              <p className="text-body-md text-on-surface-variant italic">"Kamu 20% lebih cepat dibanding rata-rata peserta lainnya di bagian TIU."</p>
            </div>
          </div>
        </section>

        <section className={`pb-8 transition-all duration-500 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-surface-container-low rounded-xl p-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Saran Belajar</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 bg-surface rounded-lg p-3 border border-outline-variant/20 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">history_edu</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Review Materi Integritas (TWK)</p>
                  <p className="text-label-md text-on-surface-variant">Akurasi kamu di topik ini hanya 40%. Luangkan waktu 30 menit hari ini.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-surface rounded-lg p-3 border border-outline-variant/20 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">calculate</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Latihan Deret Angka (TIU)</p>
                  <p className="text-label-md text-on-surface-variant">Terdapat 3 kesalahan di sub-bab ini. Pelajari trik cepat deret aritmatika.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl px-margin-mobile pt-4 pb-safe border-t border-outline-variant/10">
        <div className="max-w-2xl mx-auto flex flex-col gap-3 mb-4">

          <button className="w-full bg-surface border-2 border-primary text-primary py-3 rounded-xl font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">share</span>
            Bagikan Hasil
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DetailTryout;
