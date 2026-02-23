'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const pages = [
  {
    href: '/gallery',
    emoji: '📸',
    title: 'Scrapbook Foto',
    desc: 'momen indah bersamamu',
    color: '#e75480',
    bg: 'linear-gradient(135deg, #fde8ef, #f9a8c9)',
    rotate: -3,
    delay: 0.1,
  },
  {
    href: '/ucapan',
    emoji: '💌',
    title: 'Pesan Panjang',
    desc: 'kata-kata dari hati',
    color: '#b05080',
    bg: 'linear-gradient(135deg, #f3e0f7, #c5a9d4)',
    rotate: 2,
    delay: 0.2,
  },
  {
    href: '/timeline',
    emoji: '🗓️',
    title: 'Perjalanan Kita',
    desc: 'kisah dari awal sampai kini',
    color: '#c75c30',
    bg: 'linear-gradient(135deg, #fef3e2, #f9c89a)',
    rotate: -2,
    delay: 0.3,
  },
  {
    href: '/alasan',
    emoji: '🌸',
    title: 'Alasan Cintaku',
    desc: 'kenapa aku cinta kamu',
    color: '#2e856e',
    bg: 'linear-gradient(135deg, #e0f5ef, #a8d8c8)',
    rotate: 3,
    delay: 0.4,
  },
  {
    href: '/doa',
    emoji: '✨',
    title: 'Doa & Harapan',
    desc: 'untuk masa depan kita',
    color: '#7a5c9e',
    bg: 'linear-gradient(135deg, #ece8f8, #c5a9d4)',
    rotate: -1,
    delay: 0.5,
  },
  {
    href: '/playlist',
    emoji: '🎵',
    title: 'Playlist Kita',
    desc: 'lagu yang mengingatkan aku',
    color: '#b84040',
    bg: 'linear-gradient(135deg, #fde8ef, #f9a8c9)',
    rotate: 2,
    delay: 0.6,
  },
];

export default function MenuPage() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4"
      style={{ zIndex: 1 }}
    >
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-5 left-5 z-40"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.07, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-md"
            style={{
              background: 'rgba(255,251,245,0.92)',
              color: '#e75480',
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              border: '1px solid rgba(249,168,201,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            ← Cover
          </motion.button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-widest uppercase mb-2"
          style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          ✦ pilih halaman ✦
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
          color: '#4a3728',
          fontWeight: 700,
        }}>
          ~ scrapbook menu ~
        </h1>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', color: '#7a6155', marginTop: '6px', opacity: 0.7 }}>
          semua dibuat dari hati, khusus buat kamu 💗
        </p>
      </motion.div>

      {/* Grid of page cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '920px',
          width: '100%',
        }}
      >
        {pages.map((p, i) => (
          <Link key={i} href={p.href}>
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: p.rotate - 5 }}
              animate={{ opacity: 1, y: 0, rotate: p.rotate }}
              transition={{ type: 'spring', stiffness: 180, damping: 22, delay: p.delay }}
              whileHover={{ scale: 1.05, rotate: 0, y: -6, zIndex: 10 }}
              whileTap={{ scale: 0.97 }}
              className="relative cursor-pointer select-none"
              style={{
                background: p.bg,
                borderRadius: '4px',
                padding: '28px 24px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.6)',
              }}
            >
              {/* Washi tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm opacity-80"
                style={{ background: 'linear-gradient(90deg, #f8b4cc, #f9c89a, #f8b4cc)' }}
              />

              <div className="flex items-start gap-4">
                <span style={{ fontSize: '36px' }}>{p.emoji}</span>
                <div>
                  <h3 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#4a3728',
                    marginBottom: '4px',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '16px',
                    color: p.color,
                    opacity: 0.85,
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>

              <div
                className="mt-4 flex items-center justify-end gap-1 text-sm opacity-60"
                style={{ fontFamily: 'Caveat, cursive', color: '#7a6155', fontSize: '15px' }}
              >
                buka halaman →
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}
