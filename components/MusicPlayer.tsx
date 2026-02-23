'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '@/context/MusicContext';

export default function MusicPlayer() {
  const [visible, setVisible] = useState(true);
  const { playing, currentSong, ready, togglePlay } = useMusic();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(253,232,240,0.95) 0%, rgba(249,168,201,0.95) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(231,84,128,0.25)',
          }}
        >
          {/* Animated music note */}
          <motion.span
            animate={playing ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl select-none"
          >
            {playing ? '🎵' : '🎶'}
          </motion.span>

          <div className="flex flex-col">
            <span
              className="text-sm font-bold leading-none select-none whitespace-nowrap"
              style={{ color: '#4a3728' }}
            >
              {currentSong.title}
            </span>
            <span
              className="text-[10px] opacity-70 leading-none select-none whitespace-nowrap mt-1"
              style={{ color: '#4a3728' }}
            >
              {currentSong.artist}
            </span>
          </div>

          {/* Visualizer bars when playing */}
          {playing && (
            <div className="flex items-end gap-0.5 h-4 ml-1">
              {[0, 1, 2, 3].map(j => (
                <motion.div
                  key={j}
                  animate={{ height: ['30%', '100%', '30%'] }}
                  transition={{ repeat: Infinity, duration: 0.7, delay: j * 0.15 }}
                  className="w-0.5 rounded-full"
                  style={{ background: '#e75480', minHeight: '4px' }}
                />
              ))}
            </div>
          )}

          <button
            onClick={togglePlay}
            disabled={!ready}
            className="flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all active:scale-95 disabled:opacity-50 ml-1"
            style={{
              background: playing ? '#e75480' : '#f9a8c9',
              color: 'white',
            }}
            title={playing ? 'Pause musik' : 'Play musik'}
          >
            {!ready ? '⏳' : playing ? '⏸' : '▶'}
          </button>

          <button
            onClick={() => setVisible(false)}
            className="text-xs opacity-40 hover:opacity-70 transition-opacity ml-1"
            style={{ color: '#4a3728' }}
            title="Tutup"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
