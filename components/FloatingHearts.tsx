'use client';

import { useEffect, useRef, useState } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  swayOffset: number;
  emoji: string;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const emojis = ['💗', '🌸', '✨', '💕', '🎀', '💖'];
    const hearts: Heart[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnHeart = () => {
      hearts.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 30,
        size: 14 + Math.random() * 18,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.4 + Math.random() * 0.5,
        sway: 0,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    };

    const spawnInterval = setInterval(spawnHeart, 1200);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y -= h.speed;
        h.sway += h.swaySpeed;
        h.x += Math.sin(h.sway + h.swayOffset) * 0.8;
        h.opacity -= 0.001;

        if (h.y < -40 || h.opacity <= 0) {
          hearts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = h.opacity;
        ctx.font = `${h.size}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(h.emoji, h.x, h.y);
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
