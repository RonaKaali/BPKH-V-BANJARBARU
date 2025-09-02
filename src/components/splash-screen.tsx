'use client';

import { useState, useEffect } from 'react';

const FADE_OUT_DURATION = 500; // Durasi animasi fade-out

export function SplashScreen() {
  const [isMounted, setIsMounted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const SPLASH_DISPLAY_TIME = 2800; // Durasi total splash screen terlihat

    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    const fadeTimer = setTimeout(() => {
      setIsVisible(false); // Memulai animasi fade-out
    }, SPLASH_DISPLAY_TIME);

    const unmountTimer = setTimeout(() => {
      setIsMounted(false); // Menghilangkan komponen setelah fade-out selesai
    }, SPLASH_DISPLAY_TIME + FADE_OUT_DURATION);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfaf5',
        transition: `opacity ${FADE_OUT_DURATION}ms ease-out`,
        opacity: isVisible ? 1 : 0, // Mengontrol opacity untuk fade
        pointerEvents: 'none', // Mencegah interaksi saat transisi
      }}
    >
      <h2
        style={{
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#28a745',
          fontFamily: `'PT Sans', sans-serif`,
          textAlign: 'center',
        }}
      >
        Selamat Datang di Website
      </h2>
      <img
        src="https://www.kehutanan.go.id/images/logo.png"
        alt="Logo Kementerian Kehutanan"
        style={{ width: '200px', height: 'auto' }}
      />
      <h1
        style={{
          marginTop: '1.5rem',
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#28a745',
          fontFamily: `'PT Sans', sans-serif`,
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.3',
        }}
      >
        Balai Pemantapan Kawasan Hutan Wilayah V Banjarbaru
      </h1>
      <div
        style={{
          width: '40%',
          maxWidth: '400px',
          height: '4px',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '1.5rem',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#28a745',
            transition: 'width 2.5s ease-out',
          }}
        />
      </div>
    </div>
  );
}
