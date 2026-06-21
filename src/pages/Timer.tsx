import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Timer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Ambil nama subbab dari URL query parameter jika ada
  const queryParams = new URLSearchParams(location.search);
  const subbabName = queryParams.get('subbab') || 'Sesi Belajar';

  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // Default 25 menit untuk timer (dalam detik)
  const [timeElapsed, setTimeElapsed] = useState(0); // Untuk stopwatch
  
  // Setup timer input
  const [inputMinutes, setInputMinutes] = useState('25');

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (mode === 'timer') {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              stopTimer();
              // Boleh tambahkan alarm di sini
              return 0;
            }
            return prev - 1;
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

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStartPause = () => {
    if (mode === 'timer' && timeRemaining <= 0) {
      setTimeRemaining(parseInt(inputMinutes) * 60 || 0);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'timer') {
      setTimeRemaining(parseInt(inputMinutes) * 60 || 0);
    } else {
      setTimeElapsed(0);
    }
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
          onClick={() => navigate(-1)} 
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
            <div className="flex-1">
              <p className="text-caption text-primary font-bold tracking-wider uppercase mb-1">Sedang Belajar</p>
              <h2 className="font-headline-sm text-on-surface leading-tight">{subbabName}</h2>
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
                <span className="text-6xl font-bold text-on-surface tabular-nums tracking-tighter">
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
              
              <button 
                onClick={handleStartPause}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-on-primary shadow-xl shadow-primary/30 transition-all active:scale-95 ${isRunning ? 'bg-error shadow-error/30' : 'bg-primary'}`}
              >
                <span className="material-symbols-outlined text-[36px]">{isRunning ? 'pause' : 'play_arrow'}</span>
              </button>
              
              <button 
                onClick={() => {
                  stopTimer();
                  // Aksi ketika klik selesai, misalnya mencentang checkbox
                  navigate(-1);
                }}
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
