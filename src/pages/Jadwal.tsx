import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Jadwal = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [expandedSesi, setExpandedSesi] = useState<number | null>(1);
  const [completed, setCompleted] = useState<Record<number, boolean>>({ 1: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToConfirm, setTaskToConfirm] = useState<{ sessionId: number, subtaskId: number } | null>(null);
  const [subtasks, setSubtasks] = useState<Record<number, Record<number, boolean>>>({
    1: { 1: true, 2: true, 3: false }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSesi = (id: number) => {
    setExpandedSesi(expandedSesi === id ? null : id);
  };

  const requestToggleSubtask = (sessionId: number, subtaskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTaskToConfirm({ sessionId, subtaskId });
    setModalOpen(true);
  };

  const confirmSubtask = () => {
    if (taskToConfirm !== null) {
      const { sessionId, subtaskId } = taskToConfirm;
      const isCurrentlyCompleted = subtasks[sessionId]?.[subtaskId];
      
      setSubtasks(prev => ({
        ...prev,
        [sessionId]: {
          ...prev[sessionId],
          [subtaskId]: !isCurrentlyCompleted
        }
      }));
    }
    setModalOpen(false);
    setTaskToConfirm(null);
  };

  const cancelConfirm = () => {
    setModalOpen(false);
    setTaskToConfirm(null);
  };

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isUnchecking = taskToConfirm ? subtasks[taskToConfirm.sessionId]?.[taskToConfirm.subtaskId] : false;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkPBdHfae7ADsOnLS7gaxaI7mba6C8eorGnjPYbjLuIMpYiOQ1oPVfZZMHqTfnUMgLCyNN-_11Q7UpKF-VRMqLHrr3EwColiezu4DCxjgDR9GpXdqd-SWyItxzJpNDQmpvLwe4tzSLYA72dX8sAD28m_F_Z1hJoMx-swbo213Wb2GMsv7flSup3Lhf4KVrIpWenwve8hYJGuqqSF2S0Xb2WHp4ydScjG9mCv40R9pcvpylxco2h8Sgq-dkbAKBp1uKX24zOjCD0Vw" />
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Jadwal</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-24 px-margin-mobile">
        <section className={`mb-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-end mb-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">September 2024</h2>
              <p className="text-label-md text-on-surface-variant">Minggu ini kamu ada 12 sesi belajar.</p>
            </div>
            <button className="text-primary font-label-md hover:underline">Lihat Kalender</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-variant active:scale-95">
              <span className="text-caption">Sen</span>
              <span className="font-headline-sm">16</span>
            </button>
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/20 active:scale-95">
              <span className="text-caption">Sel</span>
              <span className="font-headline-sm">17</span>
            </button>
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-variant active:scale-95">
              <span className="text-caption">Rab</span>
              <span className="font-headline-sm">18</span>
            </button>
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-variant active:scale-95">
              <span className="text-caption">Kam</span>
              <span className="font-headline-sm">19</span>
            </button>
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-variant active:scale-95">
              <span className="text-caption">Jum</span>
              <span className="font-headline-sm">20</span>
            </button>
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-variant active:scale-95">
              <span className="text-caption">Sab</span>
              <span className="font-headline-sm">21</span>
            </button>
            <button className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-variant active:scale-95">
              <span className="text-caption">Min</span>
              <span className="font-headline-sm">22</span>
            </button>
          </div>
        </section>

        <section className={`space-y-gutter transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Hari Ini - Selasa, 17 Sep</h3>
          
          <div className={`glass-card rounded-xl p-md shadow-[0px_8px_32px_rgba(37,99,235,0.08)] border-l-4 transition-all duration-300 cursor-pointer ${completed[1] ? 'bg-primary-container/10 border-primary' : 'border-outline-variant hover:border-primary active:scale-[0.98]'}`} onClick={() => toggleSesi(1)}>
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${completed[1] ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-on-surface">TIU Numerik - 90 menit</h4>
                  <div className="flex items-center gap-2 mt-xs">
                    <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden"><div className={`h-full bg-primary rounded-full transition-all duration-500`} style={{width: completed[1] ? '100%' : '0%'}}></div></div>
                    <span className="text-caption text-on-surface-variant">• 08:00 - 09:30</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={completed[1] ? 'text-primary' : 'text-outline-variant'} onClick={(e) => toggleComplete(1, e)}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: completed[1] ? "'FILL' 1" : "'FILL' 0"}}>{completed[1] ? 'check_circle' : 'radio_button_unchecked'}</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${expandedSesi === 1 ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
            </div>
            
            <div className={`space-y-2 pl-16 overflow-hidden transition-all duration-300 ${expandedSesi === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex items-center gap-3 py-1 cursor-pointer group" onClick={(e) => requestToggleSubtask(1, 1, e)}>
                <span className={`material-symbols-outlined text-[20px] ${subtasks[1]?.[1] ? 'text-primary' : 'text-outline-variant'}`} style={{fontVariationSettings: subtasks[1]?.[1] ? "'FILL' 1" : "'FILL' 0"}}>{subtasks[1]?.[1] ? 'check_box' : 'check_box_outline_blank'}</span>
                <span className={`text-label-md flex-1 ${subtasks[1]?.[1] ? 'text-on-surface line-through opacity-50' : 'text-on-surface-variant'}`}>Deret Angka</span>
                {!subtasks[1]?.[1] && (
                  <button className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-on-primary transition-colors active:scale-95 opacity-0 group-hover:opacity-100" title="Mulai Belajar" onClick={(e) => { e.stopPropagation(); navigate('/timer?subbab=Deret+Angka'); }}>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 py-1 cursor-pointer group" onClick={(e) => requestToggleSubtask(1, 2, e)}>
                <span className={`material-symbols-outlined text-[20px] ${subtasks[1]?.[2] ? 'text-primary' : 'text-outline-variant'}`} style={{fontVariationSettings: subtasks[1]?.[2] ? "'FILL' 1" : "'FILL' 0"}}>{subtasks[1]?.[2] ? 'check_box' : 'check_box_outline_blank'}</span>
                <span className={`text-label-md flex-1 ${subtasks[1]?.[2] ? 'text-on-surface line-through opacity-50' : 'text-on-surface-variant'}`}>Aritmatika</span>
                {!subtasks[1]?.[2] && (
                  <button className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-on-primary transition-colors active:scale-95 opacity-0 group-hover:opacity-100" title="Mulai Belajar" onClick={(e) => { e.stopPropagation(); navigate('/timer?subbab=Aritmatika'); }}>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 py-1 cursor-pointer group" onClick={(e) => requestToggleSubtask(1, 3, e)}>
                <span className={`material-symbols-outlined text-[20px] ${subtasks[1]?.[3] ? 'text-primary' : 'text-outline-variant'}`} style={{fontVariationSettings: subtasks[1]?.[3] ? "'FILL' 1" : "'FILL' 0"}}>{subtasks[1]?.[3] ? 'check_box' : 'check_box_outline_blank'}</span>
                <span className={`text-label-md flex-1 ${subtasks[1]?.[3] ? 'text-on-surface line-through opacity-50' : 'text-on-surface-variant'}`}>Perbandingan</span>
                {!subtasks[1]?.[3] && (
                  <button className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-on-primary transition-colors active:scale-95 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" title="Mulai Belajar" onClick={(e) => { e.stopPropagation(); navigate('/timer?subbab=Perbandingan'); }}>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={`glass-card rounded-xl p-md shadow-[0px_8px_32px_rgba(37,99,235,0.08)] flex items-center justify-between border-l-4 transition-all duration-300 cursor-pointer active:scale-[0.98] ${completed[2] ? 'bg-primary-container/10 border-primary' : 'border-outline-variant hover:border-primary'}`} onClick={(e) => toggleComplete(2, e)}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${completed[2] ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined">history_edu</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-on-surface">TWK Integritas - 60 menit</h4>
                <div className="flex items-center gap-2 mt-xs">
                  <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-500" style={{width: completed[2] ? '100%' : '0%'}}></div></div>
                  <span className="text-caption text-on-surface-variant">• 13:00 - 14:00</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={completed[2] ? 'text-primary' : 'text-outline-variant'}>
                <span className="material-symbols-outlined" style={{fontVariationSettings: completed[2] ? "'FILL' 1" : "'FILL' 0"}}>{completed[2] ? 'check_circle' : 'radio_button_unchecked'}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
            </div>
          </div>

          <div className={`glass-card rounded-xl p-md shadow-[0px_8px_32px_rgba(37,99,235,0.08)] flex items-center justify-between border-l-4 transition-all duration-300 cursor-pointer active:scale-[0.98] ${completed[3] ? 'bg-primary-container/10 border-primary' : 'border-outline-variant hover:border-primary'}`} onClick={(e) => toggleComplete(3, e)}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${completed[3] ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-on-surface">TKP Anti Radikalisme - 45 menit</h4>
                <div className="flex items-center gap-2 mt-xs">
                  <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-500" style={{width: completed[3] ? '100%' : '0%'}}></div></div>
                  <span className="text-caption text-on-surface-variant">• 19:30 - 20:15</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={completed[3] ? 'text-primary' : 'text-outline-variant'}>
                <span className="material-symbols-outlined" style={{fontVariationSettings: completed[3] ? "'FILL' 1" : "'FILL' 0"}}>{completed[3] ? 'check_circle' : 'radio_button_unchecked'}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
            </div>
          </div>

          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider pt-md">Besok - Rabu, 18 Sep</h3>
          
          <div className="glass-card rounded-xl p-md shadow-[0px_8px_32px_rgba(37,99,235,0.08)] flex items-center justify-between border-l-4 border-outline-variant opacity-70">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-on-surface">Simulasi Tryout 1 - 100 menit</h4>
                <div className="flex items-center gap-2 mt-xs">
                  <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden"><div className="w-0 h-full bg-primary rounded-full"></div></div>
                  <span className="text-caption text-on-surface-variant">• 09:00 - 10:40</span>
                </div>
              </div>
            </div>
            <div className="text-outline-variant">
              <span className="material-symbols-outlined">lock</span>
            </div>
          </div>
        </section>
      </main>

      <Link to="/tambah-jadwal" className="fixed bottom-24 right-margin-mobile flex items-center gap-2 px-lg py-md bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full shadow-xl shadow-primary/30 z-40 active:scale-95 transition-transform hover:opacity-90">
        <span className="material-symbols-outlined">add</span>
        <span className="font-label-md">Tambah Jadwal</span>
      </Link>

      {/* Confirmation Modal */}
      <div className={`fixed inset-0 z-[100] items-center justify-center p-gutter transition-all duration-300 ${modalOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={cancelConfirm}></div>
        <div className={`relative w-full max-w-xs bg-surface rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ${modalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="p-lg">
            <h3 className="font-headline-sm text-on-surface mb-sm">
              {isUnchecking ? 'Batalkan Selesai' : 'Konfirmasi Selesai'}
            </h3>
            <p className="text-body-md text-on-surface-variant">
              {isUnchecking ? 'Apakah kamu yakin ingin membatalkan status selesai pada materi ini?' : 'Apakah kamu sudah menyelesaikan materi ini?'}
            </p>
            <div className="mt-xl flex flex-col gap-3">
              <button 
                className={`w-full py-md text-on-primary rounded-lg font-label-md active:scale-95 transition-transform ${isUnchecking ? 'bg-error' : 'bg-primary'}`} 
                onClick={confirmSubtask}
              >
                {isUnchecking ? 'Ya, Batalkan' : 'Ya, Selesai'}
              </button>
              <button 
                className="w-full py-md border border-outline text-on-surface-variant rounded-lg font-label-md active:scale-95 transition-transform" 
                onClick={cancelConfirm}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jadwal;
