'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function QuienesSomosPage() {
  const t = useTranslations('quienesSomos');
  const locale = useLocale();

  const pilares = ['pan', 'galette', 'km0'] as const;

  return (
    <main className="bg-creme min-h-screen">

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <Image
          src="/home1.webp"
          alt="Amelie Restaurant"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('hero.label')}
            </p>
            <h1 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-creme font-light leading-[1.1] whitespace-pre-line">
              {t('hero.title')}
            </h1>
            <p className="text-creme/65 text-base md:text-lg font-body font-light leading-relaxed mt-6 max-w-xl">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <FadeIn>
              <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-6">
                {t('historia.label')}
              </p>
              <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light leading-[1.15] mb-8">
                {t('historia.title')}
              </h2>
              <p className="text-noir/75 text-lg font-body font-light leading-relaxed">
                {t('historia.text')}
              </p>
            </FadeIn>

            {/* Foto en acción — pendiente */}
            <FadeIn delay={0.2} className="relative w-full aspect-[4/5] overflow-hidden bg-sable">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-px bg-dore/40 mx-auto" />
                <p className="text-taupe/40 text-xs tracking-widest uppercase font-body text-center px-8">
                  Foto próximamente
                </p>
                <div className="w-12 h-px bg-dore/40 mx-auto" />
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-dore/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-dore/40" />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Separador dorado */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>

      {/* Filosofía */}
      <section className="py-24 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('filosofia.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-noir font-light leading-[1.15] mb-10">
              {t('filosofia.title')}
            </h2>
            <p className="text-noir/70 text-lg font-body font-light leading-relaxed">
              {t('filosofia.text')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Separador dorado */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>

      {/* Pilares */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('pilares.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light">
              {t('pilares.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {pilares.map((key, i) => (
              <FadeIn key={key} delay={i * 0.15}>
                <span className="text-xs tracking-[0.3em] text-dore font-body">
                  {t(`pilares.${key}.number`)}
                </span>
                <div className="w-8 h-px bg-dore/40 my-4" />
                <h3 className="font-display italic text-2xl text-noir font-light mb-4">
                  {t(`pilares.${key}.title`)}
                </h3>
                <p className="text-noir/65 text-sm font-body font-light leading-relaxed">
                  {t(`pilares.${key}.text`)}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-noir py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <h2 className="font-display italic text-4xl md:text-5xl text-creme font-light mb-10">
              {t('cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/reservar`}
                className="inline-flex items-center justify-center px-8 py-4 bg-dore text-noir text-xs tracking-widest uppercase font-body hover:bg-dore/80 transition-colors duration-300"
              >
                {t('cta.reservar')}
              </Link>
              <Link
                href={`/${locale}/carta`}
                className="inline-flex items-center justify-center px-8 py-4 border border-creme/30 text-creme text-xs tracking-widest uppercase font-body hover:border-creme hover:bg-creme/10 transition-all duration-300"
              >
                {t('cta.carta')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
