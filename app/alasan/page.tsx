'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const reasons = [
  { emoji: '😊', text: 'Karena senyummu itu nular banget, bikin siapapun ikut bahagia' },
  { emoji: '💬', text: 'Karena cara kamu ngobrol itu asik banget, nggak pernah bikin bosen' },
  { emoji: '🌟', text: 'Karena kamu selalu punya cara buat bikin hari jadi lebih cerah' },
  { emoji: '🤗', text: 'Karena kamu itu hangat, genuinely peduli sama orang-orang di sekitarmu' },
  { emoji: '🧠', text: 'Karena kamu cerdas dan punya caramu sendiri dalam melihat dunia' },
  { emoji: '💪', text: 'Karena kamu kuat, bahkan di waktu-waktu yang susah sekalipun' },
  { emoji: '🎨', text: 'Karena kamu unik dengan caramu sendiri yang aku suka banget' },
  { emoji: '🌙', text: 'Karena suara kamu waktu ketawa itu jadi favorit aku' },
  { emoji: '✨', text: 'Karena kamu jujur dan tulus, itu langka banget' },
  { emoji: '🌸', text: 'Karena kamu cantik — luar dan dalem' },
  { emoji: '🎵', text: 'Karena musik yang kamu suka jadi playlist favoritku juga' },
  { emoji: '💗', text: 'Dan karena... kamu itu kamu. Itu lebih dari cukup.' },
];

export default function AlasanPage() {
  const router = useRouter();
  const [revealed, setRevealed] = useState<number[]>([]);

  const revealAll = () => setRevealed(reasons.map((_, i) => i));
  const toggle = (i: number) => {
    setRevealed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <main className="relative min-h-screen py-20 px-4" style={{ zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="fixed top-5 left-5 z-40">
        <motion.div
          whileHover={{ scale: 1.07, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/menu')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-md cursor-pointer"
          style={{ background: 'rgba(255,251,245,0.92)', color: '#e75480', fontFamily: 'Caveat, cursive', fontSize: '16px', border: '1px solid rgba(249,168,201,0.5)', backdropFilter: 'blur(8px)' }}
        >
          ← Menu
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>✦ alasan cintaku ✦</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#4a3728', fontWeight: 700 }}>~ kenapa aku cinta kamu ~</h1>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', color: '#7a6155', marginTop: '6px', opacity: 0.7 }}>klik tiap kartu buat lihat alasannya 💗</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={revealAll}
          className="mt-5 px-6 py-2 rounded-full text-sm cursor-pointer inline-block"
          style={{ background: 'linear-gradient(135deg, #e75480, #f9a8c9)', color: 'white', fontFamily: 'Caveat, cursive', fontSize: '17px', boxShadow: '0 4px 15px rgba(231,84,128,0.3)' }}
        >
          ✨ Buka Semua
        </motion.div>
      </motion.div>

      <div className="max-w-3xl mx-auto pb-24" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {reasons.map((r, i) => {
          const isRevealed = revealed.includes(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 180, damping: 22 }}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggle(i)}
              className="cursor-pointer select-none"
              style={{
                borderRadius: '4px',
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                background: isRevealed ? 'linear-gradient(145deg, #fffbf5, #fde8ef)' : 'linear-gradient(135deg, #e75480, #f9a8c9)',
                transition: 'background 0.4s ease',
                border: '1px solid rgba(249,168,201,0.4)',
              }}
            >
              <div className="absolute top-2 left-3 text-xs opacity-50" style={{ fontFamily: 'Caveat, cursive', color: isRevealed ? '#7a6155' : 'rgba(255,255,255,0.8)' }}>#{i + 1}</div>
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col items-center gap-2">
                    <span className="text-4xl">💝</span>
                    <span style={{ fontFamily: 'Caveat, cursive', fontSize: '15px', color: 'white' }}>klik untuk lihat</span>
                  </motion.div>
                ) : (
                  <motion.div key="revealed" initial={{ opacity: 0, scale: 0.8, rotateY: 90 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="flex flex-col items-center gap-2">
                    <span className="text-3xl">{r.emoji}</span>
                    <p style={{ fontFamily: 'Caveat, cursive', fontSize: '15px', color: '#4a3728', lineHeight: 1.5 }}>{r.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
