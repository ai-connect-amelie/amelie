'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function SalonBlock() {
  const t = useTranslations('home.salon');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-12 lg:py-18 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="order-1"
          >
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.1] font-light italic mb-8">
              {t('title')}
            </h2>
            <p className="text-noir/75 text-base font-body font-light leading-relaxed mb-10">
              {t('text')}
            </p>

            {/* Separador dorado */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-dore/30" />
              <span className="text-dore text-xs tracking-widest uppercase font-body">SL</span>
              <div className="h-px flex-1 bg-dore/30" />
            </div>

            <Link
              href={`/${locale}/alquiler-sala`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-noir text-noir text-xs tracking-widest uppercase font-body hover:bg-noir hover:text-creme transition-all duration-300"
            >
              {t('cta')}
              <span>→</span>
            </Link>
          </motion.div>

          {/* Placeholder imagen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="relative w-full aspect-[3/4] overflow-hidden bg-sable order-2"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-px bg-dore/40 mx-auto" />
              <p className="text-taupe/40 text-xs tracking-widest uppercase font-body text-center px-8">
                Foto próximamente
              </p>
              <div className="w-12 h-px bg-dore/40 mx-auto" />
            </div>
            <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-dore/60" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-dore/60" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
