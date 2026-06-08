'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function DifferentialsBlock() {
  const t = useTranslations('home.differentials');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cards = [
    { key: 'pan',     number: '01', href: '/quienes-somos', photo: '/388063.webp' },
    { key: 'galette', number: '02', href: '/carta',         photo: '/388071-_1_.webp' },
    { key: 'historia',number: '03', href: '/quienes-somos', photo: null },
  ] as const;

  return (
    <section ref={ref} className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t('label')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-noir font-light italic">
            {t('title')}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-taupe/20">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-creme p-10 lg:p-12 flex flex-col group hover:bg-noir transition-colors duration-500"
            >
              <span className="text-xs tracking-[0.3em] text-noir/40 font-body mb-8">
                {card.number}
              </span>

              {/* Image area */}
              <div className="relative aspect-square bg-sable mb-8 overflow-hidden">
                {card.photo ? (
                  <Image
                    src={card.photo}
                    alt={t(`${card.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-sable group-hover:bg-noir/50 transition-colors duration-500">
                    <p className="text-taupe/40 text-xs tracking-widest uppercase font-body group-hover:text-creme/20 transition-colors duration-500">
                      Foto próximamente
                    </p>
                  </div>
                )}
              </div>

              <h3 className="font-display text-2xl lg:text-3xl text-noir group-hover:text-creme font-light italic mb-4 transition-colors duration-500">
                {t(`${card.key}.title`)}
              </h3>
              <p className="text-noir/70 text-sm font-body font-light leading-relaxed mb-8 flex-1 group-hover:text-creme/60 transition-colors duration-500">
                {t(`${card.key}.text`)}
              </p>
              <Link
                href={`/${locale}${card.href}`}
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-dore font-body group-hover:text-dore transition-colors duration-200"
              >
                {t(`${card.key}.cta`)}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
