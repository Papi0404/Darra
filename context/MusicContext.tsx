'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_SONG = {
  title: 'Untukmu',
  artist: 'Chrisye',
  id: 'cYYiReO2Zlc'
};

interface Song {
  title: string;
  artist: string;
  id: string;
}

interface MusicContextType {
  playing: boolean;
  currentSong: Song;
  ready: boolean;
  togglePlay: () => void;
  playSong: (song: Song) => void;
}

const MusicContext = createContext<MusicContextType>({
  playing: false,
  currentSong: DEFAULT_SONG,
  ready: false,
  togglePlay: () => {},
  playSong: () => {},
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>(DEFAULT_SONG);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  const initPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;
    if (typeof window === 'undefined') return;
    if (!window.YT || !window.YT.Player) return;

    try {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '1',
        width: '1',
        videoId: DEFAULT_SONG.id,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: DEFAULT_SONG.id,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setReady(true);
            try {
              const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
              if (wasPlaying && hasInteracted.current) {
                playerRef.current?.playVideo();
              }
            } catch (e) {}
          },
          onStateChange: (e: any) => {
            if (e.data === 1) {
              setPlaying(true);
              try { sessionStorage.setItem('musicPlaying', 'true'); } catch (e) {}
            } else if (e.data === 2 || e.data === 0) {
              setPlaying(false);
              try { sessionStorage.setItem('musicPlaying', 'false'); } catch (e) {}
            }
          },
          onError: () => {
            // Silently handle YT errors
          },
        },
      });
    } catch (e) {
      console.warn('YouTube player init failed:', e);
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleInteract = () => {
      hasInteracted.current = true;
      document.removeEventListener('click', handleInteract);
      document.removeEventListener('keydown', handleInteract);
    };
    document.addEventListener('click', handleInteract);
    document.addEventListener('keydown', handleInteract);

    // Load YT API
    if (typeof window !== 'undefined') {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (!existingScript) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.head.appendChild(tag);
        }
        (window as any).onYouTubeIframeAPIReady = initPlayer;
      }
    }

    return () => {
      document.removeEventListener('click', handleInteract);
      document.removeEventListener('keydown', handleInteract);
    };
  }, [initPlayer]);

  const togglePlay = useCallback(() => {
    if (!ready || !playerRef.current) return;
    hasInteracted.current = true;
    try {
      if (playing) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (e) {}
  }, [ready, playing]);

  const playSong = useCallback((song: Song) => {
    if (!ready || !playerRef.current) return;
    hasInteracted.current = true;
    setCurrentSong(song);
    try {
      playerRef.current.loadVideoById({ videoId: song.id, startSeconds: 0 });
      setPlaying(true);
      sessionStorage.setItem('musicPlaying', 'true');
    } catch (e) {}
  }, [ready]);

  return (
    <MusicContext.Provider value={{ playing, currentSong, ready, togglePlay, playSong }}>
      {mounted && (
        <div
          ref={containerRef}
          style={{
            position: 'fixed',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
            bottom: 0,
            left: 0,
            overflow: 'hidden',
          }}
        />
      )}
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
