'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LETTER = `aku nggak janji dunia.

aku cuma janji:
kalau capek, aku ada.
kalau jatuh, aku nunggu.
kalau hancur, aku peluk.

aku pilih kamu.
bukan sekali.
tapi setiap hari.

—

dan kamu tau nggak?
setiap kali aku lihat kamu,
aku selalu merasa beruntung
bisa kenal sama orang seperti kamu.

makasih ya udah ada.
makasih udah jadi kamu.

aku sayang kamu.
selalu.

          — Januar 💗`;

export default function UcapanPage() {
  const router = useRouter();
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTyping = () => {
    setDisplayed('');
    setIsDone(false);
    setIsTyping(true);
    indexRef.current = 0;

    const type = () => {
      if (indexRef.current < LETTER.length) {
        const ch = LETTER[indexRef.current];
        setDisplayed(prev => prev + ch);
        indexRef.current++;
        timerRef.current = setTimeout(type, 40);
      } else {
        setIsTyping(false);
        setIsDone(true);
      }
    };
    type();
  };

  const restartTyping = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    startTyping();
  };

  const openEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => {
      setShowEnvelope(false);
      startTyping();
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line === '' ? <br /> : <>{line}<br /></>}
      </span>
    ));
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start py-20 px-4" style={{ zIndex: 1 }}>
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="fixed top-5 left-5 z-40">
        <motion.div
          whileHover={{ scale: 1.07, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-md cursor-pointer"
          style={{ background: 'rgba(255,251,245,0.92)', color: '#e75480', fontFamily: 'Caveat, cursive', fontSize: '16px', border: '1px solid rgba(249,168,201,0.5)', backdropFilter: 'blur(8px)' }}
        >
          ← Kembali
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-10 mt-4">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>✦ pesan panjang ✦</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#4a3728', fontWeight: 700 }}>
          untukmu, <span style={{ fontFamily: 'Dancing Script, cursive', color: '#e75480' }}>daraa sayaangkuuu</span>
        </h1>
        <p className="mt-1 opacity-60" style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', color: '#7a6155' }}>✨ — dari Januar, untukmu — ✨</p>
      </motion.div>

      {/* Envelope animation */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: -40 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="flex flex-col items-center gap-6 mt-8">
            <motion.div
              animate={envelopeOpen ? { rotateX: [-10, 10, 0], scale: [1, 1.1, 0.9] } : { y: [0, -8, 0] }}
              transition={envelopeOpen ? { duration: 0.6, ease: 'easeInOut' } : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="text-8xl select-none cursor-pointer"
              onClick={!envelopeOpen ? openEnvelope : undefined}
              style={{ filter: 'drop-shadow(0 8px 20px rgba(231,84,128,0.3))' }}
            >
              {envelopeOpen ? '💌' : '📩'}
            </motion.div>
            {!envelopeOpen && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={openEnvelope}
                className="px-8 py-3 rounded-full font-medium cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #e75480, #f9a8c9)', color: 'white', fontFamily: 'Caveat, cursive', fontSize: '20px', boxShadow: '0 4px 20px rgba(231,84,128,0.35)' }}
              >
                💌 Buka Pesan
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter card */}
      <AnimatePresence>
        {!showEnvelope && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} className="relative w-full max-w-xl">
            <div style={{
              background: 'linear-gradient(175deg, #fffbf7, #fdf6ee)',
              borderRadius: '2px',
              padding: '48px 44px 44px',
              boxShadow: '0 6px 30px rgba(74,55,40,0.10), 0 20px 50px rgba(231,84,128,0.06)',
              border: '1px solid rgba(240,217,232,0.7)',
              backgroundImage: 'linear-gradient(#fffbf7, #fffbf7), repeating-linear-gradient(transparent, transparent 31px, rgba(231,84,128,0.12) 32px)',
              backgroundOrigin: 'border-box',
              position: 'relative',
            }}>
              <div className="absolute -top-4 left-6 w-14 h-6 rounded-sm opacity-75" style={{ background: 'linear-gradient(90deg, #f8b4cc, #f9c89a)', transform: 'rotate(-4deg)' }} />
              <div className="absolute -top-4 right-6 w-14 h-6 rounded-sm opacity-75" style={{ background: 'linear-gradient(90deg, #c5a9d4, #f8b4cc)', transform: 'rotate(4deg)' }} />
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '19px', lineHeight: '2.1', color: '#4a3728', whiteSpace: 'pre-wrap', minHeight: '200px' }}>
                {renderText(displayed)}
                {isTyping && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ color: '#e75480', fontWeight: 'bold' }}>|</motion.span>
                )}
              </div>
              <AnimatePresence>
                {isDone && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex gap-3 justify-center flex-wrap">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-2xl">💗</motion.div>
                    <div onClick={restartTyping} className="px-5 py-2 rounded-full text-sm cursor-pointer" style={{ background: '#fde8ef', color: '#e75480', fontFamily: 'Caveat, cursive', fontSize: '16px', border: '1px solid rgba(231,84,128,0.3)' }}>🔄 Ulang</div>
                    <div onClick={() => router.push('/gallery')} className="px-5 py-2 rounded-full text-sm cursor-pointer" style={{ background: 'linear-gradient(135deg, #e75480, #f9a8c9)', color: 'white', fontFamily: 'Caveat, cursive', fontSize: '16px' }}>📸 Lihat Scrapbook</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
