'use client';

import { useRef } from 'react';
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

function Diamond() {
  return <span className="text-dore mx-3 text-xs">◆</span>;
}

type TipoItem = { numero: string; label: string; title: string; text: string };
type StepItem = { numero: string; texto: string };

export default function EventosPage() {
  const t = useTranslations('eventos');
  const locale = useLocale();

  const tipos = t.raw('tipos.items') as TipoItem[];
  const steps = t.raw('como.steps') as StepItem[];

  return (
    <main className="bg-creme min-h-screen">

      {/* Hero */}
      <section className="relative bg-noir py-36 lg:py-48 overflow-hidden">
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-dore/25" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-dore/25" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <p className="text-dore text-xs tracking-[0.4em] uppercase font-body mb-6">
              {t('hero.label')}
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-dore/40" />
              <Diamond />
              <div className="h-px w-16 bg-dore/40" />
            </div>
            <h1 className="font-display italic text-6xl md:text-7xl lg:text-8xl text-creme font-light leading-[1.05] whitespace-pre-line">
              {t('hero.title')}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-6 mb-8">
              <div className="h-px w-16 bg-dore/40" />
              <Diamond />
              <div className="h-px w-16 bg-dore/40" />
            </div>
            <p className="text-creme/50 text-lg font-body font-light leading-relaxed max-w-xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <FadeIn delay={0.1}>
              <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
                {t('intro.label')}
              </p>
              <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light leading-[1.15] mb-8">
                {t('intro.title')}
              </h2>
              <div className="space-y-5">
                <p className="text-noir/75 text-base font-body font-light leading-relaxed">
                  {t('intro.text1')}
                </p>
                <p className="text-noir/75 text-base font-body font-light leading-relaxed">
                  {t('intro.text2')}
                </p>
              </div>
            </FadeIn>

            {/* Foto placeholder */}
            <FadeIn delay={0.25} className="relative w-full aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-sable">
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

      {/* Separador */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>

      {/* Tipos de evento */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="text-center mb-16 lg:mb-20">
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('tipos.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light">
              {t('tipos.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {tipos.map((item, i) => (
              <FadeIn key={item.numero} delay={i * 0.1}>
                <span className="text-xs tracking-[0.3em] text-dore font-body">
                  {item.numero}
                </span>
                <div className="w-8 h-px bg-dore/40 my-4" />
                <p className="text-taupe/55 text-[10px] tracking-[0.25em] uppercase font-body mb-2">
                  {item.label}
                </p>
                <h3 className="font-display italic text-xl text-noir font-light leading-snug mb-4">
                  {item.title}
                </h3>
                <p className="text-noir/60 text-sm font-body font-light leading-relaxed">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>

      {/* Cómo funciona */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="text-center mb-16">
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('como.label')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <FadeIn key={step.numero} delay={i * 0.15} className="text-center">
                <span className="font-display italic text-5xl text-dore/25 font-light block mb-4">
                  {step.numero}
                </span>
                <div className="w-6 h-px bg-dore/40 mx-auto mb-4" />
                <p className="text-noir/65 text-sm font-body font-light leading-relaxed">
                  {step.texto}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Diferencial — cita centrada */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>
      <section className="py-20 lg:py-28">
        <FadeIn className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <Diamond />
          <p className="font-display italic text-2xl md:text-3xl text-noir/70 font-light leading-relaxed mt-4">
            &ldquo;{t('diferencial.quote')}&rdquo;
          </p>
          <Diamond />
        </FadeIn>
      </section>

      {/* CTA noir */}
      <section className="bg-noir py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('cta.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-creme font-light mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-creme/45 text-base font-body font-light leading-relaxed mb-10 max-w-md mx-auto">
              {t('cta.text')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${t('cta.phone').replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-dore text-noir text-xs tracking-widest uppercase font-body hover:bg-dore/80 transition-colors duration-300"
              >
                {t('cta.phoneLabel')}
                <span>→</span>
              </a>
              <Link
                href={`/${locale}/alquiler-sala`}
                className="inline-flex items-center justify-center px-8 py-4 border border-creme/25 text-creme text-xs tracking-widest uppercase font-body hover:border-creme/50 hover:bg-creme/5 transition-all duration-300"
              >
                {t('cta.salaLabel')}
              </Link>
            </div>
            <p className="text-creme/30 text-sm font-body mt-8 tracking-wide">
              {t('cta.phone')}
            </p>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
