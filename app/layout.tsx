import type { Metadata } from "next";
import "./globals.css";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import { MusicProvider } from "@/context/MusicContext";

export const metadata: Metadata = {
  title: "daraa sayaangkuuu — untukmu 💗",
  description: "Scrapbook digital dari Januar, dengan segenap hati — untuk daraa sayaangkuuu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: 'linear-gradient(135deg, #fdf6ee 0%, #fde8ef 50%, #fdf6ee 100%)',
          minHeight: '100vh',
        }}
      >
        <MusicProvider>
          <FloatingHearts />
          {children}
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
