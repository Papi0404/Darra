'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LightboxProps {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photos[currentIndex];
    link.download = `daraa-photo-${currentIndex + 1}.jpeg`;
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(20,10,15,0.88)', backdropFilter: 'blur(8px)' }}
      >
        {/* Modal panel */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="relative flex flex-col items-center gap-4 max-w-lg w-full mx-4"
          style={{
            background: 'linear-gradient(145deg, #fffbf5, #fde8ef)',
            borderRadius: '4px',
            padding: '22px 22px 16px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
            border: '1px solid rgba(249,168,201,0.3)',
          }}
        >
          {/* Washi tape top */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-sm opacity-80"
            style={{ background: 'linear-gradient(90deg, #f8b4cc, #f9c89a, #f8b4cc)' }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110 active:scale-95"
            style={{ background: '#f9a8c9', color: '#4a3728' }}
          >
            ✕
          </button>

          {/* Photo counter */}
          <span
            className="text-xs tracking-wider uppercase opacity-60"
            style={{ fontFamily: 'Caveat, cursive', color: '#4a3728', fontSize: '13px' }}
          >
            {currentIndex + 1} / {photos.length}
          </span>

          {/* Image */}
          <div
            className="relative w-full overflow-hidden rounded-sm"
            style={{ aspectRatio: '4/3', background: '#f5e6d3' }}
          >
            <Image
              src={photos[currentIndex]}
              alt={`daraa photo ${currentIndex + 1}`}
              fill
              className="object-cover"
              style={{ borderRadius: '2px' }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full justify-center mt-2">
            <button
              onClick={onPrev}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              style={{ background: '#fde8ef', color: '#e75480', fontFamily: 'Caveat, cursive', fontSize: '15px' }}
            >
              ◀ Prev
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: '#f9a8c9', color: '#4a3728', fontFamily: 'Caveat, cursive', fontSize: '15px' }}
              title="Download foto"
            >
              ⬇ Simpan
            </button>

            <button
              onClick={onNext}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              style={{ background: '#fde8ef', color: '#e75480', fontFamily: 'Caveat, cursive', fontSize: '15px' }}
            >
              Next ▶
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
