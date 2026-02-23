'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Link utama untuk BGM awal
const DEFAULT_SONG = {
  title: 'Untukmu',
  artist: 'Daraaa', // Atau namamu/nama penyanyi asli
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

const MusicContext = createContext<MusicContextType | undefined>(undefined);

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>(DEFAULT_SONG);
  const [ready, setReady] = useState(false);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track if this is the first load so we don't autoplay if user didn't interact
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Interaction listener to allow autoplay later
    const handleInteract = () => {
      hasInteracted.current = true;
      document.removeEventListener('click', handleInteract);
      document.removeEventListener('keydown', handleInteract);
    };
    document.addEventListener('click', handleInteract);
    document.addEventListener('keydown', handleInteract);

    // Initialize YouTube
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      document.removeEventListener('click', handleInteract);
      document.removeEventListener('keydown', handleInteract);
    };
  }, []);

  const initPlayer = () => {
    if (!containerRef.current) return;
    
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '1',
      width: '1',
      videoId: currentSong.id,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: currentSong.id,
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
          // Try to play if session storage says we were playing
          const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
          if (wasPlaying) {
             // We can only autoplay if there was previous interaction,
             // YT API will block otherwise if the page was freshly hard-reloaded without interaction
             try {
                // We'll just let the user click play if it fails
               if (hasInteracted.current) {
                 playerRef.current.playVideo();
               }
             } catch(e) {}
          }
        },
        onStateChange: (e: any) => {
          // 1 = playing, 2 = paused, 0 = ended
          if (e.data === 1) {
            setPlaying(true);
            sessionStorage.setItem('musicPlaying', 'true');
          } else if (e.data === 2 || e.data === 0) {
            setPlaying(false);
            sessionStorage.setItem('musicPlaying', 'false');
          }
        },
      },
    });
  };

  const togglePlay = () => {
    if (!ready || !playerRef.current) return;
    // user interacted by definition of clicking toggle
    hasInteracted.current = true;
    
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const playSong = (song: Song) => {
    if (!ready || !playerRef.current) return;
    hasInteracted.current = true;
    
    setCurrentSong(song);
    playerRef.current.loadVideoById({
       videoId: song.id,
       startSeconds: 0
    });
    // loadVideoById automatically plays
    setPlaying(true);
    sessionStorage.setItem('musicPlaying', 'true');
  };

  return (
    <MusicContext.Provider value={{ playing, currentSong, ready, togglePlay, playSong }}>
      {/* Hidden container for YT iframe */}
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
        }}
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
