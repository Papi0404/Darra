'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMusic } from '@/context/MusicContext';

const songs = [
  { title: 'Untukmu', artist: 'Chrisye', id: 'cYYiReO2Zlc', emoji: '🎵', note: 'lagu kita', color: '#f9a8c9' },
  { title: 'Kau Adalah', artist: 'Isyana Sarasvati', id: '-Cu0ihE490s', emoji: '🎶', note: 'kamu banget', color: '#c5a9d4' },
  { title: 'Bukan Cinta Biasa', artist: 'Afgan', id: 'nshdkoeu_fY', emoji: '🌸', note: 'bukan biasa aja', color: '#f9c89a' },
  { title: 'Separuh Aku', artist: 'NOAH', id: 'b0ZBBjViV8Y', emoji: '💗', note: 'separuh aku', color: '#a8d8c8' },
  { title: 'Aku Milikmu', artist: 'Dewa 19', id: 'OEjl0eHY1w8', emoji: '🌙', note: 'malam ke malam', color: '#f9a8c9' },
  { title: 'Kangen', artist: 'Dewa 19', id: 'sjjhLDPT5_g', emoji: '✨', note: 'kalau lagi jauh', color: '#c5a9d4' },
  { title: 'Dewi', artist: 'Dewa 19', id: 'YyfmajcIZtM', emoji: '🌷', note: 'dewiku', color: '#f9c89a' },
  { title: 'Dan', artist: 'Sheila on 7', id: 'dGcGbF4ex5o', emoji: '⭐', note: 'klasik tapi bener', color: '#a8d8c8' },
  { title: 'Roman Picisan', artist: 'Dewa 19', id: 'N43bVhtyVt4', emoji: '💌', note: 'cinta romantis', color: '#f9a8c9' },
  { title: 'Kita', artist: 'Sheila on 7', id: 'qFZI6kPtOh0', emoji: '🤝', note: 'cerita kita', color: '#c5a9d4' },
  { title: 'Bila Kau Tak Disampingku', artist: 'Sheila on 7', id: 'qMCVoHAIr-M', emoji: '🥺', note: 'sepi rasanya', color: '#f9c89a' },
];

export default function PlaylistPage() {
  const router = useRouter();
  const { currentSong, playing, playSong, togglePlay } = useMusic();

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

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>✦ playlist ✦</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#4a3728', fontWeight: 700 }}>~ lagu yang ngingetin aku ke kamu ~</h1>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', color: '#7a6155', marginTop: '6px', opacity: 0.7 }}>klik lagu untuk memutar 🎵</p>
      </motion.div>

      <div className="max-w-xl mx-auto pb-24 flex flex-col gap-4">
        {songs.map((s, i) => {
          const isSelected = currentSong.id === s.id;
          const isPlayingThis = isSelected && playing;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 180, damping: 22 }}
              onClick={() => {
                if (isSelected) togglePlay();
                else playSong(s);
              }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              style={{
                background: isSelected ? `linear-gradient(135deg, ${s.color}50, rgba(255,251,245,0.96))` : 'rgba(255,251,245,0.95)',
                borderRadius: '4px',
                padding: '18px 20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
                border: `2px solid ${isSelected ? s.color : 'rgba(249,168,201,0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
                style={{ background: isSelected ? s.color : '#fde8ef', color: isSelected ? 'white' : '#e75480', fontFamily: 'Caveat, cursive', fontSize: '15px' }}
              >
                {isPlayingThis ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>{s.emoji}</motion.span>
                ) : isSelected ? (
                  <span style={{ fontSize: '10px' }}>⏸</span>
                ) : (
                  i + 1
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600, color: '#4a3728' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#7a6155', opacity: 0.8 }}>{s.artist}</p>
              </div>

              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '14px', color: s.color, textAlign: 'right', maxWidth: '120px', opacity: 0.9 }}>{s.note}</div>

              {isPlayingThis && (
                <div className="absolute right-3 flex items-end gap-0.5 h-5">
                  {[0, 1, 2, 3].map(j => (
                    <motion.div
                      key={j}
                      animate={{ height: ['40%', '100%', '40%'] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: j * 0.15 }}
                      className="w-1 rounded-full"
                      style={{ background: s.color }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center pb-20">
        <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: '20px', color: '#e75480', opacity: 0.7 }}>&ldquo;setiap intro lagu ini, aku langsung ingat kamu.&rdquo; 🎵</p>
      </motion.div>
    </main>
  );
}
