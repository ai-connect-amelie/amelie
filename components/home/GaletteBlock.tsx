'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function GaletteBlock() {
  const t = useTranslations('home.galette');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-creme py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image placeholder — full bleed style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative aspect-[3/4] bg-sable order-2 lg:order-1"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-px bg-dore/60" />
              <p className="text-taupe/40 text-xs tracking-widest uppercase font-body text-center px-8">
                Fotografía galette bretonne
              </p>
              <div className="w-20 h-px bg-dore/60" />
            </div>
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-dore/30" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-dore/30" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.1] font-light italic mb-8">
              {t('title')}
            </h2>
            <div className="space-y-5 mb-10">
              <p className="text-taupe text-base font-body font-light leading-relaxed">
                {t('text1')}
              </p>
              <p className="text-taupe text-base font-body font-light leading-relaxed">
                {t('text2')}
              </p>
            </div>

            {/* Decorative detail */}
            <div className="border-l-2 border-dore/40 pl-6 mb-10">
              <p className="text-noir/50 text-sm font-display italic">
                "Depuis 1870, la même meule, la même farine,<br />le même savoir-faire."
              </p>
            </div>

            <Link
              href={`/${locale}/carta`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-noir text-noir text-xs tracking-widest uppercase font-body hover:bg-noir hover:text-creme transition-all duration-300"
            >
              {t('cta')}
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
