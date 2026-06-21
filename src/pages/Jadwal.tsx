import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import { useStore } from '../store/useStore';

const Jadwal = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [expandedSesi, setExpandedSesi] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToConfirm, setTaskToConfirm] = useState<{ planId: number, currentStatus: string } | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);
  
  const profileAvatar = useStore((state) => state.profileAvatar);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for(let i = -2; i <= 4; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };
  const dates = getDates();
  const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const studyPlans = useLiveQuery(async () => {
    const plans = await db.studyPlans.where('date').equals(dateStr).toArray();
    
    const fullPlans = await Promise.all(plans.map(async p => {
      const subject = await db.subjects.get(p.subjectId);
      const subtopic = await db.subtopics.get(p.subtopicId);
      return { ...p, subject, subtopic };
    }));
    
    const grouped = fullPlans.reduce((acc, curr) => {
      if(!curr.subject) return acc;
      if(!acc[curr.subject.id!]) {
        acc[curr.subject.id!] = {
          subject: curr.subject,
          plans: []
        };
      }
      acc[curr.subject.id!].plans.push(curr);
      return acc;
    }, {} as Record<number, any>);
    
    return Object.values(grouped);
  }, [dateStr]);

  const toggleSesi = (id: number) => {
    setExpandedSesi(expandedSesi === id ? null : id);
  };

  const requestToggleSubtask = (planId: number, currentStatus: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTaskToConfirm({ planId, currentStatus });
    setModalOpen(true);
  };

  const confirmSubtask = async () => {
    if (taskToConfirm) {
      const newStatus = taskToConfirm.currentStatus === 'completed' ? 'pending' : 'completed';
      await db.studyPlans.update(taskToConfirm.planId, { status: newStatus });
      // update subtopic
      const plan = await db.studyPlans.get(taskToConfirm.planId);
      if(plan) {
         await db.subtopics.update(plan.subtopicId, { completed: newStatus === 'completed' });
      }
    }
    setModalOpen(false);
    setTaskToConfirm(null);
  };

  const cancelConfirm = () => {
    setModalOpen(false);
    setTaskToConfirm(null);
  };

  const requestDeletePlan = (planId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlanToDelete(planId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (planToDelete) {
      await db.studyPlans.delete(planToDelete);
    }
    setDeleteModalOpen(false);
    setPlanToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPlanToDelete(null);
  };

  const isUnchecking = taskToConfirm?.currentStatus === 'completed';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container">
            <img className="w-full h-full object-cover" alt="Profile" src={profileAvatar} />
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">Jadwal Belajar</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-24 px-margin-mobile pb-32">
        <section className={`mb-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-end mb-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
              <p className="text-label-md text-on-surface-variant">Ada {studyPlans?.reduce((acc, g) => acc + g.plans.length, 0) || 0} materi untuk tanggal ini.</p>
            </div>
            <button className="text-primary font-label-md hover:underline">Lihat Kalender</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
            {dates.map((d, i) => {
              const isSelected = d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth();
              return (
                <button 
                  key={i} 
                  onClick={() => setSelectedDate(d)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl transition-all active:scale-95 ${isSelected ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'}`}
                >
                  <span className="text-caption">{dayNames[d.getDay()]}</span>
                  <span className="font-headline-sm">{d.getDate()}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className={`space-y-gutter transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            {dayNames[selectedDate.getDay()]}, {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
          </h3>
          
          {(!studyPlans || studyPlans.length === 0) ? (
            <div className="text-center p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">event_busy</span>
              <p className="text-on-surface-variant font-body-md">Tidak ada jadwal belajar di hari ini.</p>
            </div>
          ) : (
            studyPlans.map((group) => {
              const totalPlans = group.plans.length;
              const completedPlans = group.plans.filter((p: any) => p.status === 'completed').length;
              const isAllCompleted = totalPlans > 0 && totalPlans === completedPlans;
              const isExpanded = expandedSesi === group.subject.id;

              return (
                <div key={group.subject.id} className={`glass-card rounded-xl p-md shadow-[0px_8px_32px_rgba(37,99,235,0.08)] border-l-4 transition-all duration-300 cursor-pointer ${isAllCompleted ? 'bg-primary-container/10 border-primary' : 'border-outline-variant hover:border-primary active:scale-[0.98]'}`} onClick={() => toggleSesi(group.subject.id)}>
                  <div className="flex items-center justify-between mb-md">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isAllCompleted ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                        <span className="material-symbols-outlined">{group.subject.name.toLowerCase().includes('tiu') ? 'calculate' : group.subject.name.toLowerCase().includes('tkp') ? 'psychology' : 'history_edu'}</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-on-surface">{group.subject.name}</h4>
                        <div className="flex items-center gap-2 mt-xs">
                          <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{width: `${(completedPlans / totalPlans) * 100}%`}}></div>
                          </div>
                          <span className="text-caption text-on-surface-variant">• {completedPlans}/{totalPlans} Selesai</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={isAllCompleted ? 'text-primary' : 'text-outline-variant'} onClick={(e) => { e.stopPropagation(); }}>
                        <span className="material-symbols-outlined" style={{fontVariationSettings: isAllCompleted ? "'FILL' 1" : "'FILL' 0"}}>{isAllCompleted ? 'check_circle' : 'radio_button_unchecked'}</span>
                      </div>
                      <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                    </div>
                  </div>
                  
                  <div className={`space-y-2 pl-16 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {group.plans.map((plan: any) => {
                      const isCompleted = plan.status === 'completed';
                      return (
                        <div key={plan.id} className="flex items-center gap-3 py-1 cursor-pointer group/item" onClick={(e) => requestToggleSubtask(plan.id, plan.status, e)}>
                          <span className={`material-symbols-outlined text-[20px] ${isCompleted ? 'text-primary' : 'text-outline-variant'}`} style={{fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0"}}>{isCompleted ? 'check_box' : 'check_box_outline_blank'}</span>
                          <span className={`text-label-md flex-1 truncate ${isCompleted ? 'text-on-surface line-through opacity-50' : 'text-on-surface-variant'}`}>{plan.subtopic?.name || 'Materi'}</span>
                          
                          <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <button className="w-7 h-7 flex items-center justify-center bg-error/10 text-error rounded-full hover:bg-error hover:text-white transition-colors active:scale-95" title="Hapus Jadwal" onClick={(e) => requestDeletePlan(plan.id, e)}>
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                            {!isCompleted && (
                              <button className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-on-primary transition-colors active:scale-95" title="Mulai Belajar" onClick={(e) => { e.stopPropagation(); navigate(`/timer?planId=${plan.id}&subbab=${encodeURIComponent(plan.subtopic?.name || 'Materi')}`); }}>
                                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      <Link to="/tambah-jadwal" className="fixed bottom-24 right-margin-mobile flex items-center gap-2 px-lg py-md bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full shadow-xl shadow-primary/30 z-40 active:scale-95 transition-transform hover:opacity-90">
        <span className="material-symbols-outlined">add</span>
        <span className="font-label-md">Tambah Jadwal</span>
      </Link>

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

      {/* Delete Confirmation Modal */}
      <div className={`fixed inset-0 z-[100] items-center justify-center p-gutter transition-all duration-300 ${deleteModalOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={cancelDelete}></div>
        <div className={`relative w-full max-w-xs bg-surface rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ${deleteModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="p-lg">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">delete_forever</span>
            </div>
            <h3 className="font-headline-sm text-on-surface mb-sm">
              Hapus Jadwal?
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Jadwal materi ini akan dihapus dari hari ini. Materi tetap tersimpan di database.
            </p>
            <div className="mt-xl flex flex-col gap-3">
              <button 
                className="w-full py-md text-white bg-error rounded-lg font-label-md active:scale-95 transition-transform" 
                onClick={confirmDelete}
              >
                Ya, Hapus
              </button>
              <button 
                className="w-full py-md border border-outline text-on-surface-variant rounded-lg font-label-md active:scale-95 transition-transform" 
                onClick={cancelDelete}
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

export default Jadwal;
