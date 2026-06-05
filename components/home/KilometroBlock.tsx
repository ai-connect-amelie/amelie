'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function KilometroBlock() {
  const t = useTranslations('home.kilometro');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.1] font-light italic mb-8 whitespace-pre-line">
              {t('title')}
            </h2>
            <p className="text-noir/75 text-base font-body font-light leading-relaxed mb-10">
              {t('text')}
            </p>
            <div className="flex flex-wrap gap-3">
              {(['pill1', 'pill2', 'pill3'] as const).map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center px-4 py-1.5 border border-dore/50 text-taupe text-xs tracking-widest uppercase font-body"
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative aspect-[4/5] bg-sable flex flex-col items-center justify-center gap-6 overflow-hidden"
          >
            {/* Large decorative text */}
            <p
              className="font-display text-[120px] lg:text-[160px] text-dore/10 leading-none select-none absolute"
              aria-hidden
            >
              0
            </p>
            {/* Content */}
            <div className="relative text-center z-10">
              <div className="w-px h-12 bg-dore/30 mx-auto mb-6" />
              <p className="font-display text-2xl text-noir/30 italic font-light">Km</p>
              <p className="font-display text-6xl text-dore/40 font-light leading-none">.0</p>
              <div className="w-px h-12 bg-dore/30 mx-auto mt-6" />
            </div>
            <p className="relative z-10 text-taupe/50 text-xs tracking-widest uppercase font-body text-center px-8">
              {t('caption')}
            </p>
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-dore/30" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-dore/30" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
