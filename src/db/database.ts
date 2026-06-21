import Dexie, { type EntityTable } from 'dexie';

// 1. Subjects (Materi Utama/Bab, misal: TIU, TWK, TKP)
export interface Subject {
  id?: number;
  name: string;
  color: string;
  order: number;
}

// 2. Subtopics (Subbab dari Materi, misal: Deret Angka, Silogisme)
export interface Subtopic {
  id?: number;
  subjectId: number;
  name: string;
  duration: number; // Target durasi dalam menit
  completed: boolean;
  order: number;
}

// 3. StudyPlans (Jadwal Belajar Harian)
export interface StudyPlan {
  id?: number;
  date: string; // Format YYYY-MM-DD
  subjectId: number;
  subtopicId: number;
  status: 'pending' | 'completed';
  actualDuration?: number; // Durasi aktual belajar dalam detik (dari Timer)
}

// 4. Tryouts (Riwayat Tryout)
export interface Tryout {
  id?: number;
  date: string; // Format YYYY-MM-DDTHH:mm:ss.sssZ
  twk: number;
  tiu: number;
  tkp: number;
  notes: string;
}

// 5. Settings (Pengaturan Aplikasi)
export interface Setting {
  id?: number;
  key: string;
  value: any;
}

const db = new Dexie('CpnsStudyTrackerDB') as Dexie & {
  subjects: EntityTable<Subject, 'id'>;
  subtopics: EntityTable<Subtopic, 'id'>;
  studyPlans: EntityTable<StudyPlan, 'id'>;
  tryouts: EntityTable<Tryout, 'id'>;
  settings: EntityTable<Setting, 'id'>;
};

// Skema versi 1
db.version(1).stores({
  subjects: '++id, order',
  subtopics: '++id, subjectId, order',
  studyPlans: '++id, date, status',
  tryouts: '++id, date',
  settings: '++id, key'
});

export default db;
