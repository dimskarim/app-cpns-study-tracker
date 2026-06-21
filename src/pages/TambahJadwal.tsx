import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db/database';

const TambahJadwal = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [subbabs, setSubbabs] = useState([{ id: 1, value: '' }]);
  const [babName, setBabName] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const categories = [
    { value: 'twk', label: 'TWK (Tes Wawasan Kebangsaan)' },
    { value: 'tiu', label: 'TIU (Tes Intelegensia Umum)' },
    { value: 'tkp', label: 'TKP (Tes Karakteristik Pribadi)' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Hari pilihan (0 = Min, 1 = Sen, dll)
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const dayOptions = [
    { id: 1, label: 'Sen' },
    { id: 2, label: 'Sel' },
    { id: 3, label: 'Rab' },
    { id: 4, label: 'Kam' },
    { id: 5, label: 'Jum' },
    { id: 6, label: 'Sab' },
    { id: 0, label: 'Min' },
  ];
  
  const toggleDay = (dayId: number) => {
    setSelectedDays(prev => 
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
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

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitted(true);
    try {
      if (!babName.trim()) {
        setErrorMsg("Nama Bab tidak boleh kosong!");
        setTimeout(() => setErrorMsg(''), 3000);
        return;
      }

      const validSubbabs = subbabs.filter(s => s.value.trim() !== '');
      if (validSubbabs.length === 0) {
        setErrorMsg("Harap masukkan setidaknya satu subbab!");
        setTimeout(() => setErrorMsg(''), 3000);
        return;
      }

      if (selectedDays.length === 0) {
        setErrorMsg("Pilih minimal satu hari untuk jadwal rutinitas!");
        setTimeout(() => setErrorMsg(''), 3000);
        return;
      }

      const subject = await db.subjects.filter(s => s.name.startsWith(selectedCategory.value.toUpperCase())).first();
      if (!subject || !subject.id) return;

      const targetDates = selectedDays.map(dayOfWeek => {
        const d = new Date();
        const currentDay = d.getDay();
        let diff = dayOfWeek - currentDay;
        if (diff < 0) {
          diff += 7; // next occurrence of this day
        }
        d.setDate(d.getDate() + diff);
        return d;
      });

      let orderOffset = 0;
      for (const subbab of validSubbabs) {
        const newSubtopicId = (await db.subtopics.add({
           subjectId: subject.id,
           name: babName.trim() ? `${babName.trim()} - ${subbab.value.trim()}` : subbab.value.trim(),
           duration: 45, 
           completed: false,
           order: Date.now() + orderOffset
        })) as number;
        orderOffset++;

        for (const targetDate of targetDates) {
           const dateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
           await db.studyPlans.add({
             date: dateStr,
             subjectId: subject.id,
             subtopicId: newSubtopicId,
             status: 'pending'
           });
        }
      }
      
      navigate('/jadwal');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      {/* Toast Alert */}
      <div className={`fixed top-safe pt-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out w-[90%] max-w-sm ${errorMsg ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-error text-white px-4 py-3 rounded-2xl shadow-xl shadow-error/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">error</span>
          </div>
          <span className="font-label-md text-sm leading-snug flex-1">{errorMsg}</span>
        </div>
      </div>

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
        <button 
          form="jadwal-form"
          type="submit"
          className="font-label-md text-primary font-bold px-lg py-2 hover:bg-primary/10 rounded-full transition-colors active:scale-95"
        >
          Simpan
        </button>
      </header>

      <form id="jadwal-form" onSubmit={handleSave} noValidate className="pt-24 px-margin-mobile space-y-gutter max-w-lg mx-auto pb-32">
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
              
              <div className={`absolute z-[60] top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#111318] rounded-xl border border-outline-variant/50 shadow-xl overflow-hidden transition-all duration-300 origin-top ${showCategoryDropdown ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
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
              value={babName}
              onChange={(e) => setBabName(e.target.value)}
            />
            {isSubmitted && !babName.trim() && (
              <p className="text-error text-[12px] mt-1 ml-1">Harap isi bidang ini</p>
            )}
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
                  {isSubmitted && !subbab.value.trim() && (
                    <p className="text-error text-[12px] mt-1 ml-1">Harap isi bidang ini</p>
                  )}
                </div>
                <button 
                  type="button"
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
            type="button"
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
              <p className="font-label-md text-label-md text-on-surface">Jadwalkan Rutinitas</p>
              <p className="font-caption text-caption text-on-surface-variant">Sebarkan daftar subbab ke hari-hari tertentu</p>
            </div>
          </div>
          
          <div className="mt-md">
            <div className="flex gap-2 justify-between mt-4">
              {dayOptions.map(day => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={`w-10 h-10 rounded-full font-label-md transition-all active:scale-95 flex items-center justify-center ${selectedDays.includes(day.id) ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-outline-variant/30'}`}
                >
                  <span className="text-[12px]">{day.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className={`flex items-start gap-3 p-md bg-secondary-container/10 rounded-xl border border-secondary-container/20 transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="material-symbols-outlined text-secondary">info</span>
          <p className="font-caption text-caption text-on-secondary-container leading-relaxed">
            Materi yang Anda tambahkan akan otomatis muncul di menu <strong className="font-bold">Jadwal</strong> dan statistik progress Anda akan mulai dilacak segera setelah subbab pertama diselesaikan.
          </p>
        </div>
      </form>
    </div>
  );
};

export default TambahJadwal;
