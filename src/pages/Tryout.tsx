import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Tryout = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnVecxq_Go-m5vtMcBd9WaZJxb-FJW0GLuMOYyWgNg2CDRSH4ueEm4OlRGUYDg0P_fbJz7kT-Ebcb6oyAmlVasHwfhFzuKNC8CP89iZhV_hkfBcVojtvN7_NsRDbss41MCEqGXA6hj96I4KX-nTd1ChTK-PVYXQh-tj9OQla8Lx0IfiCGCem35ZTDwskfXM71PJPcQzAurpYQQN9b5kpXB3O0OMk5ilw1Z5AUpeMQ0vz7XNl0JPFg6aacl9Amsl_HfUwIi8EQAFko" />
          </div>
          <span className="font-headline-sm text-headline-sm font-bold text-primary">Tryout</span>
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
              <h2 className="font-headline-lg text-headline-lg text-primary">488</h2>
              <p className="font-caption text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                Naik 12% bulan ini
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl">military_tech</span>
            </div>
          </div>
          <div className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md">
            <p className="font-label-md text-on-surface-variant mb-1">Total Ujian</p>
            <h2 className="font-headline-md text-headline-md">24</h2>
            <p className="font-caption text-on-surface-variant">Sesi Tryout</p>
          </div>
          <div className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md">
            <p className="font-label-md text-on-surface-variant mb-1">Rata-rata</p>
            <h2 className="font-headline-md text-headline-md">412</h2>
            <p className="font-caption text-on-surface-variant">Poin / Sesi</p>
          </div>
        </section>

        <section className={`space-y-md transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Aktivitas Terakhir</h3>
            <button className="text-primary font-label-md hover:underline">Lihat Semua</button>
          </div>

          <Link to="/tryout/detail" className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md flex items-center justify-between hover:translate-y-[-4px] active:scale-[0.98] transition-all cursor-pointer block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container/10 text-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">event_note</span>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface">18 Juni 2024</h4>
                <p className="font-caption text-on-surface-variant text-[12px]">Tryout Nasional Batch 4</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-bold text-base text-on-surface">455</span>
                <span className="font-label-md text-[12px] text-tertiary flex items-center">↑ +12</span>
              </div>
              <p className="font-caption text-on-surface-variant text-[12px]">Skor Total</p>
            </div>
          </Link>

          <Link to="/tryout/detail" className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md flex items-center justify-between hover:translate-y-[-4px] active:scale-[0.98] transition-all cursor-pointer block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container/10 text-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">event_note</span>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface">12 Juni 2024</h4>
                <p className="font-caption text-on-surface-variant text-[12px]">Simulasi Mandiri #12</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-bold text-base text-on-surface">443</span>
                <span className="font-label-md text-[12px] text-error flex items-center">↓ -8</span>
              </div>
              <p className="font-caption text-on-surface-variant text-[12px]">Skor Total</p>
            </div>
          </Link>

          <Link to="/tryout/detail" className="glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] rounded-xl p-md flex items-center justify-between hover:translate-y-[-4px] active:scale-[0.98] transition-all cursor-pointer block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container/10 text-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">event_note</span>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface">05 Juni 2024</h4>
                <p className="font-caption text-on-surface-variant text-[12px]">Tryout Super Intensif</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-bold text-base text-on-surface">451</span>
                <span className="font-label-md text-[12px] text-tertiary flex items-center">↑ +22</span>
              </div>
              <p className="font-caption text-on-surface-variant text-[12px]">Skor Total</p>
            </div>
          </Link>
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
          <form className="space-y-md" onSubmit={(e) => { e.preventDefault(); toggleModal(); }}>
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
                <label className="font-label-md text-on-surface-variant ml-1">TWK</label>
                <input className="w-full bg-surface-container-lowest border-outline-variant rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-center" placeholder="0" type="number" />
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-on-surface-variant ml-1">TIU</label>
                <input className="w-full bg-surface-container-lowest border-outline-variant rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-center" placeholder="0" type="number" />
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-on-surface-variant ml-1">TKP</label>
                <input className="w-full bg-surface-container-lowest border-outline-variant rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-center" placeholder="0" type="number" />
              </div>
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant ml-1">Catatan Strategi</label>
              <textarea className="w-full bg-surface-container-lowest border-outline-variant rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Apa yang perlu diperbaiki?" rows={3}></textarea>
            </div>
            <button className="w-full primary-gradient text-white py-4 rounded-xl font-headline-sm shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all mt-4" type="submit">
              Simpan Hasil
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Tryout;
