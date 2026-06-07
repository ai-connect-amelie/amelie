'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

type Slide = { type: 'image'; src: string } | { type: 'gradient'; bg: string };

const slides: Slide[] = [
  { type: 'image', src: '/hero1.webp' },
  { type: 'image', src: '/hero2.webp' },
  { type: 'image', src: '/hero3.webp' },
  { type: 'image', src: '/hero4.webp' },
];

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">

      {/* Background slides — crossfade, todas montadas a la vez */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          aria-hidden
        >
          {s.type === 'image' ? (
            <Image
              src={s.src}
              alt=""
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
          ) : null}
        </motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-noir/45" aria-hidden />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
            Las Palmas de Gran Canaria · Est. 2023
          </p>
          <h1 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-creme leading-[1.1] mb-6 font-light">
            {t('title')}
          </h1>
          <p className="text-creme/65 text-base md:text-lg font-body font-light leading-relaxed mb-10 max-w-lg tracking-wide">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/reservar`}
              className="inline-flex items-center justify-center px-8 py-4 bg-dore text-noir text-sm tracking-widest uppercase font-body hover:bg-dore-dark transition-colors duration-300"
            >
              {t('ctaReservar')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-6 lg:left-12 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-px transition-all duration-500 ${
              i === current ? 'w-12 bg-dore' : 'w-4 bg-noir/30'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-creme/0 to-creme/30" />
      </motion.div>
    </section>
  );
}
