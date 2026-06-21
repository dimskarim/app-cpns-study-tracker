import db from './database';

export const seedDatabase = async () => {
  const subjectsCount = await db.subjects.count();
  
  if (subjectsCount === 0) {
    const twkId = (await db.subjects.add({
      name: 'TWK (Tes Wawasan Kebangsaan)',
      color: 'primary',
      order: 1
    })) as number;

    const tiuId = (await db.subjects.add({
      name: 'TIU (Tes Intelegensia Umum)',
      color: 'tertiary',
      order: 2
    })) as number;

    const tkpId = (await db.subjects.add({
      name: 'TKP (Tes Karakteristik Pribadi)',
      color: 'secondary',
      order: 3
    })) as number;

    // Seed Subtopics untuk TIU
    await db.subtopics.bulkAdd([
      { subjectId: tiuId, name: 'Deret Angka', duration: 45, completed: false, order: 1 },
      { subjectId: tiuId, name: 'Aritmatika', duration: 60, completed: false, order: 2 },
      { subjectId: tiuId, name: 'Perbandingan', duration: 45, completed: false, order: 3 },
      { subjectId: tiuId, name: 'Silogisme', duration: 45, completed: false, order: 4 },
      { subjectId: tiuId, name: 'Analogi', duration: 30, completed: false, order: 5 },
    ]);

    // Seed Subtopics untuk TWK
    await db.subtopics.bulkAdd([
      { subjectId: twkId, name: 'Nasionalisme', duration: 60, completed: false, order: 1 },
      { subjectId: twkId, name: 'Integritas', duration: 60, completed: false, order: 2 },
      { subjectId: twkId, name: 'Bela Negara', duration: 45, completed: false, order: 3 },
      { subjectId: twkId, name: 'Pilar Negara (Pancasila & UUD)', duration: 90, completed: false, order: 4 },
    ]);

    // Seed Subtopics untuk TKP
    await db.subtopics.bulkAdd([
      { subjectId: tkpId, name: 'Pelayanan Publik', duration: 45, completed: false, order: 1 },
      { subjectId: tkpId, name: 'Jejaring Kerja', duration: 45, completed: false, order: 2 },
      { subjectId: tkpId, name: 'Sosial Budaya', duration: 45, completed: false, order: 3 },
      { subjectId: tkpId, name: 'TIK', duration: 45, completed: false, order: 4 },
      { subjectId: tkpId, name: 'Profesionalisme', duration: 45, completed: false, order: 5 },
      { subjectId: tkpId, name: 'Anti Radikalisme', duration: 45, completed: false, order: 6 },
    ]);
  }
};
