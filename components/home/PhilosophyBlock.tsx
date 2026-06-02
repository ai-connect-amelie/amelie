'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { botanicalBg } from '@/lib/wallpaper';

export default function PhilosophyBlock() {
  const t = useTranslations('home.philosophy');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} style={botanicalBg} className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.15] font-light italic mb-8">
              {t('title')}
            </h2>
            <p className="text-taupe text-lg font-body font-light leading-relaxed">
              {t('text')}
            </p>
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative aspect-[4/5] bg-sable flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-px bg-dore mx-auto mb-4" />
              <p className="text-taupe/50 text-xs tracking-widest uppercase font-body">
                Fotografía del local
              </p>
              <div className="w-16 h-px bg-dore mx-auto mt-4" />
            </div>
            {/* Decorative corner */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-dore/40" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-dore/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
