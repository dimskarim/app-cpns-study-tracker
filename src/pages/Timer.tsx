import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import db from '../db/database';

const Timer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Ambil nama subbab dari URL query parameter jika ada
  const queryParams = new URLSearchParams(location.search);
  const subbabName = queryParams.get('subbab') || 'Sesi Belajar';
  const planIdStr = queryParams.get('planId');

  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // Default 25 menit untuk timer (dalam detik)
  const [timeElapsed, setTimeElapsed] = useState(0); // Untuk stopwatch
  
  // Setup timer input
  const [inputMinutes, setInputMinutes] = useState('25');

  const timerRef = useRef<number | null>(null);

  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<number | null>(null);

  const handleBack = () => {
    // Cek apakah ada riwayat navigasi sebelumnya dalam sesi ini
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // Fallback jika dibuka dari link langsung / di-refresh
      navigate('/', { replace: true });
    }
  };

  const startAlarm = () => {
    if (alarmIntervalRef.current) return; // Cegah multiple alarm
    setIsAlarmRinging(true);
    
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Waktu Habis!", { body: `Sesi ${subbabName} telah selesai.` });
      }
    }

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      const playBeepPattern = () => {
        if (ctx.state === 'suspended') ctx.resume();
        
        const playTone = (delay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, ctx.currentTime + delay); // A5
          
          gain.gain.setValueAtTime(0, ctx.currentTime + delay);
          gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + delay + 0.05);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + delay + 0.1);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + 0.15);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.2);
        };
        
        playTone(0);
        playTone(0.2);
        playTone(0.4);
        playTone(0.6);
      };

      playBeepPattern();
      alarmIntervalRef.current = window.setInterval(playBeepPattern, 1500);
    } catch (e) {
      console.log("Audio error", e);
    }
  };

  const stopAlarm = () => {
    setIsAlarmRinging(false);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopAlarm();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (mode === 'timer') {
          setTimeRemaining((prev) => {
            const next = prev - 1;
            return next < 0 ? 0 : next;
          });
        } else {
          setTimeElapsed((prev) => prev + 1);
        }
      }, 1000);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isRunning, mode]);

  // Pantau perubahan waktu untuk membunyikan alarm
  useEffect(() => {
    if (mode === 'timer' && isRunning && timeRemaining === 0) {
      stopTimer();
      setIsRunning(false);
      startAlarm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, mode, isRunning]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStartPause = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // "Unlock" AudioContext di Android WebView dengan interaksi pengguna
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
          // Mainkan suara kosong (silent)
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          gain.gain.value = 0;
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 0.001);
        }
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.log("Audio unlock error", e);
    }

    if (mode === 'timer' && timeRemaining <= 0) {
      setTimeRemaining(parseInt(inputMinutes) * 60 || 0);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    stopAlarm();
    setIsRunning(false);
    if (mode === 'timer') {
      setTimeRemaining(parseInt(inputMinutes) * 60 || 0);
    } else {
      setTimeElapsed(0);
    }
  };

  const handleSelesai = async () => {
    stopAlarm();
    stopTimer();
    
    if (planIdStr) {
      const planId = parseInt(planIdStr);
      const durationSeconds = mode === 'timer' 
        ? ((parseInt(inputMinutes) * 60 || 0) - timeRemaining)
        : timeElapsed;

      await db.studyPlans.update(planId, { 
        status: 'completed',
        actualDuration: Math.max(0, durationSeconds)
      });

      const plan = await db.studyPlans.get(planId);
      if(plan) {
         await db.subtopics.update(plan.subtopicId, { completed: true });
      }
    }

    handleBack();
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Kalkulasi progress untuk timer
  const totalTargetSeconds = mode === 'timer' ? (parseInt(inputMinutes) * 60 || 1) : 1;
  const progressPercentage = mode === 'timer' ? ((totalTargetSeconds - timeRemaining) / totalTargetSeconds) * 100 : 0;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex items-center px-margin-mobile py-sm bg-surface/70 backdrop-blur-xl">
        <button 
          onClick={handleBack} 
          type="button"
          className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-all active:scale-95 mr-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Fokus Belajar</h1>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-md mx-auto min-h-screen flex flex-col items-center">
        <section className={`w-full transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-primary-container/10 border border-primary/20 rounded-2xl p-md flex items-center gap-4 mb-xl">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-caption text-primary font-bold tracking-wider uppercase mb-1 truncate">Sedang Belajar</p>
              <h2 className="font-headline-sm text-on-surface leading-tight truncate">{subbabName}</h2>
            </div>
          </div>

          <div className="flex bg-surface-container p-1 rounded-xl mb-xl">
            <button 
              className={`flex-1 py-2 font-label-md rounded-lg transition-all ${mode === 'timer' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              onClick={() => { setMode('timer'); setIsRunning(false); }}
            >
              Timer
            </button>
            <button 
              className={`flex-1 py-2 font-label-md rounded-lg transition-all ${mode === 'stopwatch' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              onClick={() => { setMode('stopwatch'); setIsRunning(false); }}
            >
              Stopwatch
            </button>
          </div>

          <div className="glass-card rounded-3xl p-xl shadow-xl border border-outline-variant/30 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/5 rounded-tr-full"></div>
            
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              {/* Lingkaran Progress */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle 
                  cx="128" cy="128" r="120" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="none" 
                  className="text-surface-container"
                />
                <circle 
                  cx="128" cy="128" r="120" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={mode === 'timer' ? 2 * Math.PI * 120 * (1 - progressPercentage / 100) : 0}
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ease-linear ${mode === 'timer' ? 'text-primary' : 'text-tertiary'}`}
                />
              </svg>
              
              <div className="flex flex-col items-center justify-center text-center z-10">
                <span className={`text-6xl font-bold tabular-nums tracking-tighter transition-colors ${isAlarmRinging ? 'text-error animate-pulse' : 'text-on-surface'}`}>
                  {mode === 'timer' ? formatTime(timeRemaining) : formatTime(timeElapsed)}
                </span>
                
                {mode === 'timer' && !isRunning && timeRemaining === (parseInt(inputMinutes) * 60 || 0) && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <input 
                      type="number" 
                      value={inputMinutes}
                      onChange={(e) => {
                        setInputMinutes(e.target.value);
                        setTimeRemaining(parseInt(e.target.value) * 60 || 0);
                      }}
                      className="w-16 bg-surface-container-low border border-outline-variant/50 rounded-lg text-center font-label-md text-on-surface py-1 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <span className="text-caption text-on-surface-variant font-label-md">menit</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 z-10">
              <button 
                onClick={handleReset}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined text-[24px]">replay</span>
              </button>
              
              {isAlarmRinging ? (
                <button 
                  onClick={stopAlarm}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-on-error shadow-xl shadow-error/30 bg-error transition-all active:scale-95 animate-bounce"
                >
                  <span className="material-symbols-outlined text-[36px]">notifications_off</span>
                </button>
              ) : (
                <button 
                  onClick={handleStartPause}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-on-primary shadow-xl shadow-primary/30 transition-all active:scale-95 ${isRunning ? 'bg-error shadow-error/30' : 'bg-primary'}`}
                >
                  <span className="material-symbols-outlined text-[36px]">{isRunning ? 'pause' : 'play_arrow'}</span>
                </button>
              )}
              
              <button 
                onClick={handleSelesai}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-tertiary-container text-on-tertiary-container hover:opacity-90 transition-opacity active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined text-[24px]">done</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Timer;
