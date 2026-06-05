'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const leftPhotos = [
  { bg: 'from-[#f5e6d3] to-[#e8cfa8]', label: 'Galette bretonne' },
  { bg: 'from-[#e8ddd0] to-[#d4c4a8]', label: 'Pan de la casa' },
  { bg: 'from-[#f0ebe0] to-[#e0d4bc]', label: 'Desayuno Amelie' },
];

const rightPhotos = [
  { bg: 'from-[#dde8d0] to-[#c8d8b8]', label: 'Terraza Amelie' },
  { bg: 'from-[#e8e0d0] to-[#d0c8b0]', label: 'Detalle del local' },
  { bg: 'from-[#f0e4d0] to-[#e0ccb0]', label: 'Plato del día' },
];

const igFont = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' };

function PhotoCard({ photos, index }: { photos: typeof leftPhotos; index: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 3200 + index * 500);
    return () => clearInterval(timer);
  }, [photos.length, index]);

  return (
    <div className="w-full aspect-[9/16] relative rounded-xl overflow-hidden shadow-2xl shadow-noir/15">
      {photos.map((photo, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-gradient-to-br ${photo.bg} transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center">
            <span className="text-white/20 text-[10px] tracking-widest uppercase font-body">
              {photo.label}
            </span>
          </div>
        </div>
      ))}
      {/* Amelie logo — top left */}
      <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md z-10">
        <span className="font-display text-noir text-base italic font-light">A</span>
      </div>
    </div>
  );
}

function CenterCard({ handle, cta }: { handle: string; cta: string }) {
  return (
    <div className="w-full aspect-[9/16] bg-white border border-[#dbdbdb] flex flex-col overflow-hidden rounded-xl shadow-2xl shadow-noir/15">
      {/* Photo top */}
      <div className="flex-1 bg-gradient-to-br from-[#ede8e0] to-[#ddd4c8] relative flex items-center justify-center">
        <p className="text-taupe/30 text-[10px] tracking-widest uppercase font-body">Foto destacada</p>
        {/* Logo circle overlapping divider */}
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white z-10 shadow-md"
          style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
        >
          <div className="absolute inset-[3px] rounded-full bg-[#E8DDD0] flex items-center justify-center">
            <span className="font-display text-noir text-xl italic font-light">A</span>
          </div>
        </div>
      </div>
      {/* Profile bottom */}
      <div className="pt-10 pb-8 px-6 flex flex-col items-center gap-4">
        <p className="text-[13px] font-semibold text-[#262626] text-center" style={igFont}>
          {handle}
        </p>
        <a
          href="https://www.instagram.com/amelie_cafe_las_palmas/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-2 rounded-lg text-[14px] font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ ...igFont, background: '#0095F6' }}
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
    <section ref={ref} className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t('label')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-noir font-light italic whitespace-pre-line mb-4">
            {t('title')}
          </h2>
          <a
            href="https://www.instagram.com/amelie_cafe_las_palmas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-taupe hover:text-noir transition-colors font-body"
          >
            {t('handle')}
          </a>
        </motion.div>

        {/* Desktop: 3 big cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden md:flex items-end gap-4 lg:gap-6 pb-8"
        >
          <div className="flex-1 pb-14" style={{ transform: 'rotate(-4deg)', transformOrigin: 'bottom right' }}>
            <PhotoCard photos={leftPhotos} index={0} />
          </div>
          <div className="flex-1 relative z-10">
            <CenterCard handle={t('handle')} cta={t('cta')} />
          </div>
          <div className="flex-1 pb-14" style={{ transform: 'rotate(4deg)', transformOrigin: 'bottom left' }}>
            <PhotoCard photos={rightPhotos} index={1} />
          </div>
        </motion.div>

        {/* Mobile: 1 card centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="md:hidden max-w-xs mx-auto"
        >
          <CenterCard handle={t('handle')} cta={t('cta')} />
        </motion.div>

      </div>
    </section>
  );
}
