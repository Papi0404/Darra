'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PolaroidCard from '@/components/PolaroidCard';
import Lightbox from '@/components/Lightbox';

const photos = [
  { src: '/images/dara1.jpeg', caption: 'kamu cantik banget 🌸' },
  { src: '/images/dara2.jpeg', caption: 'senyummu duniaku ✨' },
  { src: '/images/dara3.jpeg', caption: 'aku kangen ini 💗' },
  { src: '/images/dara4.jpeg', caption: 'foto favorit aku 🎀' },
  { src: '/images/dara5.jpeg', caption: 'manis banget deh 🌷' },
  { src: '/images/dara6.jpeg', caption: 'selalu bikin senyum 💕' },
  { src: '/images/dara7.jpeg', caption: 'moment terharga 💝' },
  { src: '/images/dara8.jpeg', caption: 'ngga ada habisnya 🌸' },
  { src: '/images/dara9.jpeg', caption: 'kata aku sih terbaik ✨' },
  { src: '/images/dara10.jpeg', caption: 'favoritkuu 🎀' },
  { src: '/images/dara11.jpeg', caption: 'always you 💗' },
  { src: '/images/dara12.jpeg', caption: 'dan ini, dan ini, dan ini 🌷' },
];

// Pre-computed rotations to avoid hydration mismatch
const ROTATIONS = [-4, 3, -6, 5, -3, 6, -5, 4, -7, 3, -4, 6];

const sectionTitle = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
};

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : 0));
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : 0));

  return (
    <main
      className="relative min-h-screen py-20 px-4"
      style={{ zIndex: 1 }}
    >
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="fixed top-5 left-5 z-40"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.07, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all"
            style={{
              background: 'rgba(255,251,245,0.92)',
              color: '#e75480',
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              border: '1px solid rgba(249,168,201,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            ← Kembali
          </motion.button>
        </Link>
      </motion.div>

      {/* Section header */}
      <motion.div
        className="text-center mb-12 mt-4"
        variants={sectionTitle}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.7 }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ color: '#e75480', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}
        >
          ✦ scrapbook ✦
        </p>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            color: '#4a3728',
            fontWeight: 700,
          }}
        >
          ~ momen indah bersamamu ~
        </h1>
        <p
          className="mt-2 opacity-60"
          style={{ fontFamily: 'Caveat, cursive', fontSize: '17px', color: '#7a6155' }}
        >
          klik foto buat lihat lebih dekat 💗
        </p>
      </motion.div>

      {/* Polaroid Grid */}
      <div
        className="max-w-5xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '40px 30px',
          justifyItems: 'center',
          padding: '10px 0 60px',
        }}
      >
        {photos.map((photo, i) => (
          <PolaroidCard
            key={i}
            src={photo.src}
            alt={`daraa photo ${i + 1}`}
            caption={photo.caption}
            rotation={ROTATIONS[i % ROTATIONS.length]}
            delay={i * 0.07}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center pb-24"
      >
        <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: '22px', color: '#e75480', opacity: 0.7 }}>
          "Kamu adalah rumah yang aku rindukan." 💗
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/ucapan">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full font-medium"
              style={{
                background: 'linear-gradient(135deg, #e75480, #f9a8c9)',
                color: 'white',
                fontFamily: 'Caveat, cursive',
                fontSize: '18px',
                boxShadow: '0 4px 15px rgba(231,84,128,0.3)',
              }}
            >
              💌 Baca Pesan Panjang
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos.map(p => p.src)}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </main>
  );
}
