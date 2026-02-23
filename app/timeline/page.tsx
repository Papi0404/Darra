'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const events = [
  {
    date: 'Awal Mulanya...',
    emoji: '🌱',
    title: 'Pertama kali kita kenal',
    desc: 'Siapa sangka dari satu pertemuan kecil bisa jadi cerita sebesar ini. Saat itu aku nggak tau kalau kamu bakal jadi orang yang paling penting.',
    side: 'left',
    color: '#a8d8c8',
  },
  {
    date: 'Lalu...',
    emoji: '🌷',
    title: 'Mulai deket',
    desc: 'Chat-chat biasa yang lama-lama bikin aku tunggu-tunggu notifikasimu. Kamu sering bikin aku senyum sendiri waktu baca pesanmu.',
    side: 'right', 
    color: '#f9c89a',
  },
  {
    date: 'Dan akhirnya...',
    emoji: '💗',
    title: 'Aku sadar aku suka kamu',
    desc: 'Waktu itu aku baru nyadar perasaan ini bukan cuma biasa. Ada yang beda setiap kali aku lihat namamu.',
    side: 'left',
    color: '#f9a8c9',
  },
  {
    date: 'Momen kita',
    emoji: '📸',
    title: 'Foto-foto indah',
    desc: 'Tiap foto bareng kamu jadi berharga. Senyummu selalu jadi yang paling aku suka di setiap gambar.',
    side: 'right',
    color: '#c5a9d4',
  },
  {
    date: 'Sekarang',
    emoji: '🌸',
    title: 'Di sini, bersamamu',
    desc: 'Bersyukur bisa kenal kamu. Setiap hari sama kamu selalu terasa lebih hangat dan lebih berarti.',
    side: 'left',
    color: '#f9a8c9',
  },
  {
    date: 'Nanti...',
    emoji: '⭐',
    title: 'Masih banyak momen ke depan',
    desc: 'Aku nggak tau apa yang ada di depan, tapi aku tau — aku mau jalani semuanya bareng kamu.',
    side: 'right',
    color: '#a8d8c8',
  },
];

export default function TimelinePage() {
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
        className="text-center mb-16"
      >
        <p className="text-xs tracking-widest uppercase mb-2"
          style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
          ✦ perjalanan kita ✦
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          color: '#4a3728',
          fontWeight: 700,
        }}>
          ~ kisah kita ~
        </h1>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', color: '#7a6155', marginTop: '6px', opacity: 0.7 }}>
          dari pertama sampai sekarang 💗
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative pb-20">
        {/* Center line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 w-0.5 top-0 bottom-0 origin-top"
          style={{ background: 'linear-gradient(to bottom, #f9a8c9, #c5a9d4, #a8d8c8)' }}
        />

        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ev.side === 'left' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.3 + i * 0.15 }}
            className={`relative flex ${ev.side === 'left' ? 'flex-row' : 'flex-row-reverse'} items-start gap-4 mb-12`}
          >
            {/* Card */}
            <div
              className="flex-1"
              style={{ maxWidth: 'calc(50% - 28px)' }}
            >
              <div
                style={{
                  background: 'rgba(255,251,245,0.95)',
                  borderRadius: '4px',
                  padding: '20px 18px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  border: `2px solid ${ev.color}`,
                  position: 'relative',
                }}
              >
                {/* Washi-like top border */}
                <div
                  className="absolute -top-3 left-4 w-10 h-5 rounded-sm opacity-80"
                  style={{ background: ev.color }}
                />

                <p style={{ fontFamily: 'Caveat, cursive', fontSize: '13px', color: '#e75480', marginBottom: '4px', letterSpacing: '0.05em' }}>
                  {ev.date}
                </p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 700, color: '#4a3728', marginBottom: '8px' }}>
                  {ev.title}
                </h3>
                <p style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', color: '#7a6155', lineHeight: 1.6 }}>
                  {ev.desc}
                </p>
              </div>
            </div>

            {/* Center dot + emoji */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ width: '56px', paddingTop: '14px' }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.3 }}
                className="text-2xl z-10"
              >
                {ev.emoji}
              </motion.div>
            </div>

            {/* Spacer for other side */}
            <div className="flex-1" style={{ maxWidth: 'calc(50% - 28px)' }} />
          </motion.div>
        ))}

        {/* End heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: 'spring' }}
          className="flex justify-center"
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #fde8ef, #f9a8c9)',
              borderRadius: '4px',
              padding: '20px 32px',
              textAlign: 'center',
              border: '1px solid rgba(249,168,201,0.5)',
              boxShadow: '0 4px 20px rgba(231,84,128,0.15)',
            }}
          >
            <div className="text-3xl mb-2">💗</div>
            <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: '20px', color: '#e75480' }}>
              dan masih banyak lagi...
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
