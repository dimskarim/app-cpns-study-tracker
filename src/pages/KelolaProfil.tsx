import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const KelolaProfil = () => {
  const navigate = useNavigate();
  const profileName = useStore((state) => state.profileName);
  const profileAvatar = useStore((state) => state.profileAvatar);
  const updateProfile = useStore((state) => state.updateProfile);

  const [mounted, setMounted] = useState(false);
  const [tempName, setTempName] = useState(profileName);
  const [tempAvatar, setTempAvatar] = useState(profileAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    updateProfile(tempName, tempAvatar);
    navigate('/pengaturan');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize to 250x250 to keep localStorage size small
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 250;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64Str = canvas.toDataURL('image/jpeg', 0.8); // Compress slightly
          setTempAvatar(base64Str);
        }
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface pb-28 font-sans">
      <header className="fixed top-0 left-0 w-full z-40 flex items-center gap-4 px-margin-mobile py-4 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/20">
        <button onClick={() => navigate('/pengaturan')} className="material-symbols-outlined text-on-surface hover:opacity-80 transition-opacity">
          arrow_back
        </button>
        <h1 className="text-xl font-bold text-primary">Kelola Profil</h1>
      </header>

      <main className={`pt-24 px-margin-mobile max-w-md mx-auto transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Profile Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 rounded-full">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface shadow-sm bg-surface-container flex items-center justify-center">
              <img className="w-full h-full object-cover" alt="Profile" src={tempAvatar} />
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-surface shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="mt-3 text-sm font-bold text-primary hover:underline">
            Ubah Foto
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1.5">Nama Lengkap</label>
            <input 
              type="text" 
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

      </main>

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-surface border-t border-outline-variant/30 z-40">
        <button 
          onClick={handleSave}
          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold text-[15px] hover:shadow-lg active:scale-[0.98] transition-all shadow-primary/20"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default KelolaProfil;
