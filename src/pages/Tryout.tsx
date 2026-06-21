import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import { useStore } from '../store/useStore';

const Tryout = () => {
  const { profileAvatar } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [twk, setTwk] = useState('');
  const [tiu, setTiu] = useState('');
  const [tkp, setTkp] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Custom Date Picker State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setShowDatePicker(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const tryouts = useLiveQuery(() => db.tryouts.orderBy('date').reverse().toArray());

  const totalUjian = tryouts?.length || 0;
  const maxScore = tryouts?.length ? Math.max(...tryouts.map(t => t.twk + t.tiu + t.tkp)) : 0;
  const avgScore = tryouts?.length ? Math.round(tryouts.reduce((acc, t) => acc + t.twk + t.tiu + t.tkp, 0) / totalUjian) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (!twk || !tiu || !tkp) {
      setErrorMsg("Harap lengkapi semua nilai skor!");
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    if (Number(twk) > 150 || Number(tiu) > 175 || Number(tkp) > 225) {
      setErrorMsg("Skor melebihi batas maksimal (TWK 150, TIU 175, TKP 225)!");
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    if (!selectedDate) {
      setErrorMsg("Harap pilih tanggal tryout terlebih dahulu!");
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }
    
    await db.tryouts.add({
      date: selectedDate.toISOString(),
      twk: Number(twk) || 0,
      tiu: Number(tiu) || 0,
      tkp: Number(tkp) || 0,
      notes
    });
    
    setTwk('');
    setTiu('');
    setTkp('');
    setNotes('');
    setIsSubmitted(false);
    toggleModal();
  };

  return (
    <>
      {/* Toast Alert */}
      <div className={`fixed top-safe pt-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out w-[90%] max-w-sm ${errorMsg ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-error text-white px-4 py-3 rounded-2xl shadow-xl shadow-error/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">error</span>
          </div>
          <span className="font-label-md text-sm leading-snug flex-1">{errorMsg}</span>
        </div>
      </div>

      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container">
            <img className="w-full h-full object-cover" alt="Profile" src={profileAvatar} />
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Tryout</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-4xl mx-auto space-y-lg">
        <section className={`flex items-center justify-between transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-headline-md text-headline-md text-on-surface">Riwayat Tryout</h1>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary font-label-md rounded-xl hover:bg-primary/5 active:scale-95 transition-all" onClick={toggleModal}>
            <span className="material-symbols-outlined text-sm">add</span>
            Tambah Hasil
          </button>
        </section>

        <section className={`grid grid-cols-2 md:grid-cols-4 gap-gutter transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="col-span-2 md:col-span-2 glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <p className="font-label-md text-on-surface-variant mb-1">Skor Tertinggi</p>
              <h2 className="font-headline-lg text-headline-lg text-primary">{maxScore}</h2>
              <p className="font-caption text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                Poin Maksimal
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl">military_tech</span>
            </div>
          </div>
          <div className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md">
            <p className="font-label-md text-on-surface-variant mb-1">Total Ujian</p>
            <h2 className="font-headline-md text-headline-md">{totalUjian}</h2>
            <p className="font-caption text-on-surface-variant">Sesi Tryout</p>
          </div>
          <div className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md">
            <p className="font-label-md text-on-surface-variant mb-1">Rata-rata</p>
            <h2 className="font-headline-md text-headline-md">{avgScore}</h2>
            <p className="font-caption text-on-surface-variant">Poin / Sesi</p>
          </div>
        </section>

        <section className={`space-y-md transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Aktivitas Terakhir</h3>
            {totalUjian > 0 && <button className="text-primary font-label-md hover:underline">Lihat Semua</button>}
          </div>

          {totalUjian === 0 ? (
            <div className="text-center p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">inbox</span>
              <p className="text-on-surface-variant font-body-md">Belum ada riwayat tryout.</p>
            </div>
          ) : (
            tryouts?.slice(0, 5).map((tryout, index) => {
              const total = tryout.twk + tryout.tiu + tryout.tkp;
              const prevTotal = tryouts[index + 1] ? (tryouts[index + 1].twk + tryouts[index + 1].tiu + tryouts[index + 1].tkp) : total;
              const diff = total - prevTotal;
              
              const d = new Date(tryout.date);
              const dateStr = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;

              return (
                <Link key={tryout.id} to={`/tryout/detail?id=${tryout.id}`} className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md flex items-center justify-between hover:translate-y-[-4px] active:scale-[0.98] transition-all cursor-pointer block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-container/10 text-primary rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">event_note</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-on-surface">{dateStr}</h4>
                      <p className="font-caption text-on-surface-variant text-[12px]">Tryout Mandiri</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="font-bold text-base text-on-surface">{total}</span>
                      {diff !== 0 && (
                        <span className={`font-label-md text-[12px] flex items-center ${diff > 0 ? 'text-tertiary' : 'text-error'}`}>
                          {diff > 0 ? `↑ +${diff}` : `↓ ${diff}`}
                        </span>
                      )}
                    </div>
                    <p className="font-caption text-on-surface-variant text-[12px]">Skor Total</p>
                  </div>
                </Link>
              );
            })
          )}
        </section>
      </main>

      <div className={`fixed inset-0 z-[60] flex items-end justify-center transition-all duration-300 ${isModalOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={toggleModal}></div>
        <div className={`relative w-full max-w-xl glass-card rounded-t-3xl p-lg transform transition-transform duration-300 ${isModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-gutter"></div>
          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Catat Hasil Tryout</h2>
            <button className="text-on-surface-variant" onClick={toggleModal}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <form className="space-y-md" onSubmit={handleSubmit} noValidate>
            <div className="space-y-xs relative z-50">
              <label className="font-label-md text-on-surface-variant ml-1">Tanggal</label>
              <div className="relative">
                <button 
                  type="button"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all flex justify-between items-center text-left"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <span className={selectedDate ? "text-on-surface" : "text-outline"}>
                    {selectedDate ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : 'Pilih Tanggal'}
                  </span>
                  <span className="material-symbols-outlined text-outline">calendar_today</span>
                </button>

                <div className={`absolute z-50 mt-2 w-full bg-white dark:bg-[#0c0e13] rounded-xl border border-outline-variant/30 shadow-xl overflow-hidden transition-all duration-300 origin-top ${showDatePicker ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                  <div className="p-md flex justify-between items-center border-b border-outline-variant/20 bg-white dark:bg-[#111318]">
                    <button type="button" onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-full active:scale-95 transition-all"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                    <span className="font-label-md text-on-surface">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button type="button" onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-full active:scale-95 transition-all"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </div>
                  <div className="p-md bg-white dark:bg-[#0c0e13]">
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {dayNames.map(day => <span key={day} className="font-label-md text-[11px] text-outline-variant uppercase">{day}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth() && selectedDate?.getFullYear() === currentMonth.getFullYear();
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDateSelect(day)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-sm transition-all mx-auto active:scale-90 ${isSelected ? 'bg-primary text-on-primary shadow-md shadow-primary/30' : 'hover:bg-surface-container text-on-surface'}`}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-md">
              <div className="space-y-xs">
                <label className="block font-label-md text-on-surface-variant ml-1">TWK</label>
                <input type="number" min="0" max="150" className="w-full h-[52px] px-sm rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-center" placeholder="0-150" value={twk} onChange={(e) => setTwk(e.target.value)} />
                {isSubmitted && !twk && <p className="text-error text-[11px] mt-1 ml-1 leading-tight">Wajib diisi</p>}
                {isSubmitted && twk && Number(twk) > 150 && <p className="text-error text-[11px] mt-1 ml-1 leading-tight">Maks 150</p>}
              </div>
              <div className="space-y-xs">
                <label className="block font-label-md text-on-surface-variant ml-1">TIU</label>
                <input type="number" min="0" max="175" className="w-full h-[52px] px-sm rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-center" placeholder="0-175" value={tiu} onChange={(e) => setTiu(e.target.value)} />
                {isSubmitted && !tiu && <p className="text-error text-[11px] mt-1 ml-1 leading-tight">Wajib diisi</p>}
                {isSubmitted && tiu && Number(tiu) > 175 && <p className="text-error text-[11px] mt-1 ml-1 leading-tight">Maks 175</p>}
              </div>
              <div className="space-y-xs">
                <label className="block font-label-md text-on-surface-variant ml-1">TKP</label>
                <input type="number" min="0" max="225" className="w-full h-[52px] px-sm rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-center" placeholder="0-225" value={tkp} onChange={(e) => setTkp(e.target.value)} />
                {isSubmitted && !tkp && <p className="text-error text-[11px] mt-1 ml-1 leading-tight">Wajib diisi</p>}
                {isSubmitted && tkp && Number(tkp) > 225 && <p className="text-error text-[11px] mt-1 ml-1 leading-tight">Maks 225</p>}
              </div>
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant ml-1">Catatan Strategi</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Apa yang perlu diperbaiki?" rows={3}></textarea>
            </div>
            <button type="submit" className="w-full py-md bg-primary text-on-primary rounded-xl font-label-md active:scale-95 transition-transform hover:opacity-90 shadow-lg shadow-primary/30 mt-lg">
              Simpan Hasil
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Tryout;
