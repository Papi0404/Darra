'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const stickers = [
  { emoji: '🌸', top: '8%', left: '6%', right: undefined, rotate: -15, delay: 0.8, size: 36 },
  { emoji: '✨', top: '12%', left: undefined, right: '8%', rotate: 20, delay: 1.0, size: 28 },
  { emoji: '🎀', top: '70%', left: '5%', right: undefined, rotate: -8, delay: 1.2, size: 32 },
  { emoji: '💗', top: '75%', left: undefined, right: '6%', rotate: 12, delay: 0.9, size: 38 },
  { emoji: '🌷', top: '45%', left: '3%', right: undefined, rotate: -20, delay: 1.4, size: 30 },
  { emoji: '⭐', top: '35%', left: undefined, right: '4%', rotate: 25, delay: 1.1, size: 26 },
  { emoji: '🎀', top: '20%', left: '85%', right: undefined, rotate: -10, delay: 1.5, size: 24 },
  { emoji: '💝', top: '88%', left: '30%', right: undefined, rotate: 5, delay: 1.3, size: 28 },
];

export default function CoverPage() {
  const router = useRouter();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const now = new Date();
    setTimeStr(now.toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }));
  }, []);

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      style={{ zIndex: 1 }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 -translate-x-24 -translate-y-24"
        style={{ background: 'radial-gradient(circle, #e75480, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-28 translate-y-28"
        style={{ background: 'radial-gradient(circle, #e75480, transparent)' }} />

      {/* Floating stickers */}
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: s.rotate - 20 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rotate }}
          transition={{ delay: s.delay, type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute select-none pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            fontSize: s.size,
          }}
        >
          {s.emoji}
        </motion.div>
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.2 }}
        className="relative text-center max-w-lg w-full"
        style={{
          background: 'linear-gradient(145deg, rgba(255,251,245,0.96), rgba(253,232,240,0.96))',
          borderRadius: '4px',
          padding: '50px 40px 44px',
          boxShadow: '0 8px 40px rgba(74,55,40,0.12), 0 25px 60px rgba(231,84,128,0.08)',
          border: '1px solid rgba(249,168,201,0.4)',
        }}
      >
        {/* Washi tape top left */}
        <div className="absolute -top-4 left-8 w-20 h-7 rounded-sm opacity-80"
          style={{ background: 'linear-gradient(90deg, #f8b4cc, #f9c89a, #f8b4cc)', transform: 'rotate(-3deg)' }} />
        {/* Washi tape top right */}
        <div className="absolute -top-4 right-8 w-20 h-7 rounded-sm opacity-80"
          style={{ background: 'linear-gradient(90deg, #c5a9d4, #f8b4cc, #c5a9d4)', transform: 'rotate(3deg)' }} />

        {/* Small label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: '#e75480', fontFamily: 'Inter, sans-serif', letterSpacing: '0.18em' }}
        >
          ✦ special for you ✦
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 700,
            color: '#4a3728',
            lineHeight: 1.2,
            marginBottom: '6px',
          }}
        >
          daraa{' '}
          <span style={{
            fontFamily: 'Dancing Script, cursive',
            fontStyle: 'italic',
            color: '#e75480',
          }}>
            sayaangkuuu
          </span>
        </motion.h1>

        {/* Heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl my-3"
        >
          💗
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '18px',
            color: '#7a6155',
            lineHeight: 1.7,
            marginBottom: '28px',
          }}
        >
          Untuk perempuan tercinta — sumber tawa, tenang &amp; rindu
          <br />
          <em style={{ color: '#e75480' }}>dari Januar, dengan segenap hati</em>
        </motion.p>

        {/* Date */}
        {timeStr && (
          <p className="text-xs mb-8 opacity-50" style={{ color: '#7a6155', fontFamily: 'Caveat, cursive' }}>
            📅 {timeStr}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8 opacity-40">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #e75480)' }} />
          <span className="text-lg">🌸</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #e75480)' }} />
        </div>

        {/* Buttons — using motion.div with onClick instead of Link wrapping button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/gallery')}
            className="px-7 py-3 rounded-full font-medium transition-all cursor-pointer text-center"
            style={{
              background: 'linear-gradient(135deg, #e75480, #f9a8c9)',
              color: 'white',
              fontFamily: 'Caveat, cursive',
              fontSize: '18px',
              boxShadow: '0 4px 15px rgba(231,84,128,0.35)',
              letterSpacing: '0.02em',
            }}
          >
            📸 Buka Scrapbook
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/ucapan')}
            className="px-7 py-3 rounded-full font-medium transition-all cursor-pointer text-center"
            style={{
              background: 'transparent',
              color: '#e75480',
              fontFamily: 'Caveat, cursive',
              fontSize: '18px',
              border: '2px solid rgba(231,84,128,0.5)',
            }}
          >
            💌 Baca Pesanku
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/menu')}
            className="px-7 py-3 rounded-full font-medium transition-all cursor-pointer text-center"
            style={{
              background: 'linear-gradient(135deg, #c5a9d4, #f9a8c9)',
              color: 'white',
              fontFamily: 'Caveat, cursive',
              fontSize: '18px',
              boxShadow: '0 4px 15px rgba(197,169,212,0.35)',
            }}
          >
            ✨ Jelajahi Semua
          </motion.div>
        </motion.div>

        {/* Hint */}
        <p className="mt-6 text-xs opacity-40" style={{ color: '#7a6155', fontFamily: 'Caveat, cursive' }}>
          klik foto untuk melihat lebih dekat • ESC untuk menutup
        </p>
      </motion.div>
    </main>
  );
}
