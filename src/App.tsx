import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Dashboard from './pages/Dashboard';

import Jadwal from './pages/Jadwal';
import Tryout from './pages/Tryout';
import Statistik from './pages/Statistik';
import Pengaturan from './pages/Pengaturan';
import KelolaProfil from './pages/KelolaProfil';
import Notifikasi from './pages/Notifikasi';
import TambahJadwal from './pages/TambahJadwal';
import DetailTryout from './pages/DetailTryout';
import Timer from './pages/Timer';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  const mainPaths = ['/', '/jadwal', '/tryout', '/statistik', '/pengaturan'];
  if (!mainPaths.includes(path) && !path.match(/^\/tryout$/)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pt-2 pb-safe bg-surface rounded-t-xl shadow-lg border-t border-outline-variant/10 backdrop-blur-md">
      <Link to="/" className={`flex flex-col items-center justify-center ${path === '/' ? 'text-primary font-bold after:content-[\'\'] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1' : 'text-on-surface-variant'} hover:bg-surface-container-low transition-colors px-4 py-2 rounded-xl group`}>
        <span className="material-symbols-outlined transition-transform duration-200 group-active:scale-110" style={path === '/' ? {fontVariationSettings: "'FILL' 1"} : {}}>dashboard</span>
        <span className="font-label-md text-[10px] md:text-label-md mt-1">Home</span>
      </Link>
      <Link to="/jadwal" className={`flex flex-col items-center justify-center ${path.startsWith('/jadwal') ? 'text-primary font-bold after:content-[\'\'] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1' : 'text-on-surface-variant'} hover:bg-surface-container-low transition-colors px-4 py-2 rounded-xl group`}>
        <span className="material-symbols-outlined transition-transform duration-200 group-active:scale-110" style={path.startsWith('/jadwal') ? {fontVariationSettings: "'FILL' 1"} : {}}>calendar_month</span>
        <span className="font-label-md text-[10px] md:text-label-md mt-1">Jadwal</span>
      </Link>
      <Link to="/tryout" className={`flex flex-col items-center justify-center ${path.startsWith('/tryout') ? 'text-primary font-bold after:content-[\'\'] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1' : 'text-on-surface-variant'} hover:bg-surface-container-low transition-colors px-4 py-2 rounded-xl group`}>
        <span className="material-symbols-outlined transition-transform duration-200 group-active:scale-110" style={path.startsWith('/tryout') ? {fontVariationSettings: "'FILL' 1"} : {}}>timer</span>
        <span className="font-label-md text-[10px] md:text-label-md mt-1">Tryout</span>
      </Link>
      <Link to="/statistik" className={`flex flex-col items-center justify-center ${path === '/statistik' ? 'text-primary font-bold after:content-[\'\'] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1' : 'text-on-surface-variant'} hover:bg-surface-container-low transition-colors px-4 py-2 rounded-xl group`}>
        <span className="material-symbols-outlined transition-transform duration-200 group-active:scale-110" style={path === '/statistik' ? {fontVariationSettings: "'FILL' 1"} : {}}>leaderboard</span>
        <span className="font-label-md text-[10px] md:text-label-md mt-1">Statistik</span>
      </Link>
      <Link to="/pengaturan" className={`flex flex-col items-center justify-center ${path === '/pengaturan' ? 'text-primary font-bold after:content-[\'\'] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1' : 'text-on-surface-variant'} hover:bg-surface-container-low transition-colors px-4 py-2 rounded-xl group`}>
        <span className="material-symbols-outlined transition-transform duration-200 group-active:scale-110" style={path === '/pengaturan' ? {fontVariationSettings: "'FILL' 1"} : {}}>settings</span>
        <span className="font-label-md text-[10px] md:text-label-md mt-1">Setelan</span>
      </Link>
    </nav>
  );
}

function App() {
  const isDark = useStore((state) => state.isDark);
  const setTheme = useStore((state) => state.setTheme);

  useEffect(() => {
    // Terapkan tema saat app pertama kali di-load
    setTheme(isDark);
  }, [isDark, setTheme]);

  return (
    <Router>
      <div className="min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/tambah-jadwal" element={<TambahJadwal />} />
          <Route path="/tryout" element={<Tryout />} />
          <Route path="/tryout/detail" element={<DetailTryout />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="/profil" element={<KelolaProfil />} />
          <Route path="/notifikasi" element={<Notifikasi />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
