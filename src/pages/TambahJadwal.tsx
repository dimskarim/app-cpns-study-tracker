import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahJadwal = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [subbabs, setSubbabs] = useState([{ id: 1, value: '' }]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  const categories = [
    { value: 'twk', label: 'TWK (Tes Wawasan Kebangsaan)' },
    { value: 'tiu', label: 'TIU (Tes Intelegensia Umum)' },
    { value: 'tkp', label: 'TKP (Tes Karakteristik Pribadi)' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Custom Date Picker State
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
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
    setShowCalendarDropdown(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const addSubbab = () => {
    setSubbabs([...subbabs, { id: Date.now(), value: '' }]);
  };

  const removeSubbab = (id: number) => {
    if (subbabs.length > 1) {
      setSubbabs(subbabs.filter(subbab => subbab.id !== id));
    }
  };

  const handleSubbabChange = (id: number, value: string) => {
    setSubbabs(subbabs.map(subbab => subbab.id === id ? { ...subbab, value } : subbab));
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button 
            aria-label="Kembali" 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm text-primary font-bold">Tambah Jadwal</h1>
        </div>
        <button className="font-label-md text-label-md text-primary font-bold px-4 py-2 hover:opacity-80 transition-opacity active:scale-95" onClick={() => navigate(-1)}>
          Simpan
        </button>
      </header>

      <main className="pt-24 pb-12 px-margin-mobile space-y-lg max-w-2xl mx-auto">
        <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] p-md rounded-xl space-y-md relative z-50 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="space-y-sm relative z-20">
            <label className="block font-label-md text-label-md text-on-surface-variant">Kategori Materi</label>
            <div className="relative">
              <button 
                type="button"
                className="w-full h-[52px] px-md rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md text-left flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className="truncate">{selectedCategory.label}</span>
                <span className={`material-symbols-outlined text-outline transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              
              <div className={`absolute z-10 top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#111318] rounded-xl border border-outline-variant/50 shadow-xl overflow-hidden transition-all duration-300 origin-top ${showCategoryDropdown ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    className={`w-full text-left px-md py-3 font-body-md hover:bg-surface-container-low transition-colors ${selectedCategory.value === category.value ? 'text-primary bg-primary-container/5 font-bold' : 'text-on-surface'}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-on-surface-variant">Nama Bab</label>
            <input 
              className="w-full h-[52px] px-md rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all" 
              placeholder="Contoh: Pancasila atau Numerik" 
              type="text" 
            />
          </div>
        </section>

        <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] p-md rounded-xl space-y-md transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Daftar Subbab</h2>
            <span className="text-caption font-caption text-outline-variant">Total: <span>{subbabs.length}</span></span>
          </div>
          
          <div className="space-y-sm">
            {subbabs.map((subbab) => (
              <div key={subbab.id} className="flex gap-2 group animate-fade-in">
                <div className="flex-grow">
                  <input 
                    className="w-full h-[52px] px-md rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all" 
                    placeholder="Masukkan judul subbab" 
                    type="text" 
                    value={subbab.value}
                    onChange={(e) => handleSubbabChange(subbab.id, e.target.value)}
                  />
                </div>
                <button 
                  className={`w-[52px] h-[52px] flex items-center justify-center rounded-xl text-error bg-error-container/20 transition-all ${subbabs.length > 1 ? 'opacity-100 hover:bg-error-container/40 active:scale-90' : 'opacity-0 pointer-events-none'}`} 
                  disabled={subbabs.length === 1}
                  onClick={() => removeSubbab(subbab.id)}
                >
                  <span className="material-symbols-outlined">delete_outline</span>
                </button>
              </div>
            ))}
          </div>

          <button 
            className="w-full py-md flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/20 text-primary font-label-md text-label-md hover:bg-primary-container/10 transition-colors active:scale-[0.98]" 
            onClick={addSubbab}
          >
            <span className="material-symbols-outlined">add_circle</span>
            Tambah Subbab
          </button>
        </section>

        <section className={`glass-card shadow-[0px_8px_32px_rgba(37,99,235,0.08)] p-md rounded-xl relative z-40 transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-label-md text-label-md text-on-surface">Target Selesai</p>
              <p className="font-caption text-caption text-on-surface-variant">Tetapkan deadline belajar bab ini</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={showDatePicker} onChange={() => setShowDatePicker(!showDatePicker)} />
              <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className={`transition-all duration-300 ${showDatePicker ? 'mt-md opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="relative">
              <button 
                type="button"
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all flex justify-between items-center text-left"
                onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
              >
                <span className={selectedDate ? "text-on-surface font-body-md" : "text-outline font-body-md"}>
                  {selectedDate ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : 'Pilih Tanggal'}
                </span>
                <span className="material-symbols-outlined text-outline">calendar_today</span>
              </button>

              <div className={`absolute z-50 mt-2 w-full bg-white dark:bg-[#0c0e13] rounded-xl border border-outline-variant/30 shadow-xl overflow-hidden transition-all duration-300 origin-top ${showCalendarDropdown ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
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
        </section>

        <div className={`flex items-start gap-3 p-md bg-secondary-container/10 rounded-xl border border-secondary-container/20 transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="material-symbols-outlined text-secondary">info</span>
          <p className="font-caption text-caption text-on-secondary-container leading-relaxed">
            Materi yang Anda tambahkan akan otomatis muncul di menu <strong className="font-bold">Jadwal</strong> dan statistik progress Anda akan mulai dilacak segera setelah subbab pertama diselesaikan.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TambahJadwal;
