interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(config: { videoId: string; startSeconds?: number }): void;
  destroy(): void;
}

interface YTPlayerConstructor {
  new (element: HTMLElement, config: any): YTPlayer;
}

interface YTNamespace {
  Player: YTPlayerConstructor;
}

interface Window {
  YT: YTNamespace;
  onYouTubeIframeAPIReady: () => void;
}
