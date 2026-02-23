'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PolaroidCardProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  delay?: number;
  onClick: () => void;
  washiColor?: string;
}

const washiPatterns = [
  'linear-gradient(90deg, #f8b4cc, #f9c89a, #f8b4cc)',
  'linear-gradient(90deg, #c5a9d4, #f8b4cc, #c5a9d4)',
  'linear-gradient(90deg, #a8d8c8, #f8b4cc, #a8d8c8)',
  'linear-gradient(90deg, #f9c89a, #f8b4cc, #f9c89a)',
  'linear-gradient(90deg, #f8b4cc, #c5a9d4, #f8b4cc)',
];

export default function PolaroidCard({
  src,
  alt,
  caption = '',
  rotation = 0,
  delay = 0,
  onClick,
}: PolaroidCardProps) {
  const washi = washiPatterns[Math.floor(Math.random() * washiPatterns.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 22,
        delay,
      }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        y: -10,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative cursor-pointer select-none"
      style={{
        background: '#fffbf5',
        padding: '12px 12px 36px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 12px 28px rgba(0,0,0,0.08)',
        borderRadius: '2px',
        transformOrigin: 'center bottom',
        border: '1px solid rgba(245,230,211,0.8)',
      }}
    >
      {/* Washi tape on top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rounded-sm opacity-85"
        style={{ background: washi, zIndex: 2 }}
      />

      {/* Photo area */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '180px',
          height: '160px',
          background: '#f5e6d3',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="200px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#b08060;font-family:Caveat,cursive;font-size:28px;">📸<span style="font-size:13px;opacity:0.6">${alt}</span></div>`;
            }
          }}
        />
      </div>

      {/* Caption area */}
      <div
        className="mt-2 text-center"
        style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '14px',
          color: '#7a6155',
          minHeight: '20px',
          lineHeight: 1.3,
        }}
      >
        {caption || ''}
      </div>
    </motion.div>
  );
}
