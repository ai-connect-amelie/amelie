'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function PhilosophyBlock() {
  const t = useTranslations('home.philosophy');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.15] font-light italic mb-8">
              {t('title')}
            </h2>
            <p className="text-noir/75 text-lg font-body font-light leading-relaxed">
              {t('text')}
            </p>
          </motion.div>

          {/* Image */}
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <Image
              src="/home1.webp"
              alt="Amelie Restaurant"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Reveal curtain */}
            <motion.div
              className="absolute inset-0 bg-noir origin-left z-10"
              initial={{ scaleX: 1 }}
              animate={inView ? { scaleX: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-dore/60 z-20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-dore/60 z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
