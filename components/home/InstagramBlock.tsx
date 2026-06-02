'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { botanicalBg } from '@/lib/wallpaper';

const photoSetsLeft = [
  { bg: 'from-stone-300 to-stone-400', label: 'Foto plato 1' },
  { bg: 'from-amber-200 to-amber-300', label: 'Foto local 1' },
  { bg: 'from-stone-200 to-stone-300', label: 'Foto detalle 1' },
];

const photoSetsRight = [
  { bg: 'from-amber-300 to-amber-200', label: 'Foto plato 2' },
  { bg: 'from-stone-400 to-stone-300', label: 'Foto local 2' },
  { bg: 'from-amber-200 to-stone-300', label: 'Foto detalle 2' },
];

function PhoneCard({
  photos,
  offset = 0,
  rotate = 0,
}: {
  photos: typeof photoSetsLeft;
  offset?: number;
  rotate?: number;
}) {
  const [current, setCurrent] = useState(offset % photos.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div
      className="relative w-44 md:w-52 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-taupe/30 flex-shrink-0 border border-sable/60"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {photos.map((photo, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-gradient-to-br ${photo.bg} transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/30 text-xs tracking-widest uppercase font-body text-center px-4">
              {photo.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CenterCard({ handle, cta }: { handle: string; cta: string }) {
  return (
    <div className="w-44 md:w-52 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-taupe/20 flex-shrink-0 bg-creme border border-sable flex flex-col items-center justify-end pb-10">
      {/* Top photo area */}
      <div className="absolute inset-x-0 top-0 h-[60%] bg-sable flex items-center justify-center rounded-t-3xl">
        <p className="text-taupe/40 text-xs tracking-widest uppercase font-body text-center px-4">
          Foto destacada
        </p>
      </div>

      {/* Profile info */}
      <div className="relative z-10 flex flex-col items-center gap-3 bg-creme w-full pt-14 pb-8 px-4">
        {/* Logo circle */}
        <div className="absolute -top-8 w-16 h-16 rounded-full bg-sable border-4 border-creme flex items-center justify-center shadow-md">
          <span className="font-display text-2xl text-noir italic font-light">A</span>
        </div>
        <p className="text-noir text-xs tracking-widest font-body mt-2">{handle}</p>
        <a
          href="https://www.instagram.com/amelie_cafe_las_palmas/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center px-4 py-2.5 bg-noir text-creme text-xs tracking-widest uppercase font-body hover:bg-taupe transition-colors duration-300 rounded-sm"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}


export default function InstagramBlock() {
  const t = useTranslations('home.instagram');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} style={botanicalBg} className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t('label')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-noir font-light italic whitespace-pre-line">
            {t('title')}
          </h2>
        </motion.div>

        {/* Phone cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center gap-4 md:gap-6"
        >
          <div className="mt-8">
            <PhoneCard photos={photoSetsLeft} offset={0} rotate={-6} />
          </div>
          <div className="relative">
            <CenterCard handle={t('handle')} cta={t('cta')} />
          </div>
          <div className="mt-8">
            <PhoneCard photos={photoSetsRight} offset={1} rotate={6} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
