'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

type Item = { nombre: string; text: string };

function Diamond() {
  return <span className="text-dore mx-3 text-xs">◆</span>;
}

export default function RegalAmelieBlock() {
  const t = useTranslations('home.regala');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as Item[];

  return (
    <section ref={ref} className="bg-noir py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-dore text-xs tracking-[0.4em] uppercase font-body mb-6">
            {t('label')}
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-dore/30" />
            <Diamond />
            <div className="h-px w-12 bg-dore/30" />
          </div>
          <h2 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-creme font-light leading-[1.05] mb-6">
            {t('title')}
          </h2>
          <p className="text-creme/45 text-base font-body font-light leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {items.map((item, i) => (
            <motion.div
              key={item.nombre}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {/* Foto placeholder */}
              <div className="relative w-full aspect-[3/4] bg-creme/5 mb-5 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-px bg-dore/25" />
                  <p className="text-creme/20 text-[10px] tracking-widest uppercase font-body text-center px-6">
                    Foto próximamente
                  </p>
                  <div className="w-8 h-px bg-dore/25" />
                </div>
                <div className="absolute top-4 left-4 w-7 h-7 border-t border-l border-dore/25" />
                <div className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-dore/25" />
              </div>

              {/* Texto */}
              <div className="flex-1 flex flex-col">
                <div className="w-6 h-px bg-dore/35 mb-4" />
                <h3 className="font-display italic text-xl text-creme font-light leading-tight mb-3">
                  {item.nombre}
                </h3>
                <p className="text-creme/45 text-sm font-body font-light leading-relaxed flex-1">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <Link
            href={`/${locale}/hit-card`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-dore text-noir text-xs tracking-widest uppercase font-body hover:bg-dore/80 transition-colors duration-300"
          >
            {t('cta')}
            <span>→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
