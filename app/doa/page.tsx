'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const wishes = [
  {
    emoji: '🌸',
    title: 'Kebahagiaan',
    doa: 'Semoga kamu selalu bahagia, daraa. Setiap harimu dipenuhi dengan tawa dan hal-hal kecil yang menghangatkan hati.',
    color: '#f9a8c9',
  },
  {
    emoji: '💪',
    title: 'Kesehatan',
    doa: 'Semoga tubuhmu selalu sehat dan kuat. Istirahat yang cukup, makan yang baik — karena kamu itu berharga.',
    color: '#a8d8c8',
  },
  {
    emoji: '✨',
    title: 'Mimpi-mimpimu',
    doa: 'Semoga semua cita-cita dan impianmu tercapai. Apapun yang kamu mau, aku percaya kamu bisa.',
    color: '#f9c89a',
  },
  {
    emoji: '🌙',
    title: 'Ketenangan',
    doa: 'Semoga kamu selalu punya ketenangan hati. Di hari-hari yang berat sekalipun, semoga ada damai di dalam dirimu.',
    color: '#c5a9d4',
  },
  {
    emoji: '💫',
    title: 'Kelancaran',
    doa: 'Semoga semua jalanmu dimudahkan. Setiap langkahmu serasa ringan dan tiap usahamu berbuah hasil.',
    color: '#f9a8c9',
  },
  {
    emoji: '🤝',
    title: 'Orang-orang Baik',
    doa: 'Semoga kamu selalu dikelilingi orang-orang yang tulus dan baik, yang menghargai dan menyayangimu dengan sepenuh hati.',
    color: '#a8d8c8',
  },
  {
    emoji: '📚',
    title: 'Masa Depan',
    doa: 'Semoga masa depanmu indah banget, daraa. Apa yang kamu bangun sekarang pasti akan berbuah manis.',
    color: '#f9c89a',
  },
  {
    emoji: '💗',
    title: 'Cinta yang Tulus',
    doa: 'Semoga kamu selalu dicintai dengan cara yang benar — termasuk olehku, selalu.',
    color: '#f9a8c9',
  },
];

export default function DoaPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <main
      className="relative min-h-screen py-20 px-4"
      style={{ zIndex: 1 }}
    >
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-5 left-5 z-40"
      >
        <Link href="/menu">
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
            ← Menu
          </motion.button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-widest uppercase mb-2"
          style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          ✦ doa & harapan ✦
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          color: '#4a3728',
          fontWeight: 700,
        }}>
          ~ untukmu, selalu ~
        </h1>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', color: '#7a6155', marginTop: '6px', opacity: 0.7 }}>
          klik kartu untuk membaca doanya 🌸
        </p>
      </motion.div>

      {/* Cards */}
      <div
        className="max-w-3xl mx-auto pb-24"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
        }}
      >
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 180, damping: 22 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="cursor-pointer"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              style={{
                borderRadius: '4px',
                padding: '24px 20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                border: `2px solid ${activeIdx === i ? w.color : 'rgba(249,168,201,0.3)'}`,
                background: 'rgba(255,251,245,0.95)',
                transition: 'border-color 0.3s ease',
                position: 'relative',
              }}
            >
              {/* Washi */}
              <div
                className="absolute -top-3 left-4 w-10 h-5 rounded-sm"
                style={{ background: w.color, opacity: 0.8 }}
              />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{w.emoji}</span>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#4a3728',
                }}>
                  {w.title}
                </h3>
              </div>

              <AnimatePresence>
                {activeIdx === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '16px',
                      color: '#7a6155',
                      lineHeight: 1.7,
                      overflow: 'hidden',
                    }}
                  >
                    {w.doa}
                  </motion.p>
                )}
              </AnimatePresence>

              {activeIdx !== i && (
                <p style={{ fontFamily: 'Caveat, cursive', fontSize: '14px', color: '#b8a0a0', opacity: 0.7 }}>
                  klik untuk baca doa ini...
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center pb-20"
      >
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            background: 'linear-gradient(145deg, rgba(255,251,245,0.96), rgba(253,232,240,0.96))',
            borderRadius: '4px',
            padding: '28px 32px',
            boxShadow: '0 4px 20px rgba(231,84,128,0.1)',
            border: '1px solid rgba(249,168,201,0.4)',
          }}
        >
          <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: '22px', color: '#e75480' }}>
            "aku doain kamu setiap hari, daraa."
          </p>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', color: '#7a6155', marginTop: '10px', opacity: 0.8 }}>
            — dari Januar, dengan tulus 💗
          </p>
        </div>
      </motion.div>
    </main>
  );
}
