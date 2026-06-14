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

const usoKeys = ['corporativo', 'privado', 'grupo'] as const;
const modalidadKeys = ['a', 'b'] as const;

export default function AlquilerSalaPage() {
  const t = useTranslations('alquilerSala');
  const locale = useLocale();

  return (
    <main className="bg-creme min-h-screen">

      {/* Hero */}
      <section className="relative bg-noir py-36 lg:py-48 flex items-center overflow-hidden">
        {/* Placeholder foto */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-dore/20 via-transparent to-dore/10" />
        </div>
        {/* Ornamento esquinas */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-dore/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-dore/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <p className="text-dore text-xs tracking-[0.4em] uppercase font-body mb-6">
              {t('hero.label')}
            </p>
            {/* Filete superior */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-dore/40" />
              <Diamond />
              <div className="h-px w-16 bg-dore/40" />
            </div>
            <h1 className="font-display italic text-6xl md:text-7xl lg:text-8xl text-creme font-light leading-[1.05]">
              {t('hero.title')}
            </h1>
            {/* Filete inferior */}
            <div className="flex items-center justify-center gap-4 mt-6 mb-8">
              <div className="h-px w-16 bg-dore/40" />
              <Diamond />
              <div className="h-px w-16 bg-dore/40" />
            </div>
            <p className="text-creme/55 text-lg md:text-xl font-body font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Placeholder foto */}
            <FadeIn className="relative w-full aspect-[3/4] overflow-hidden bg-sable order-2 lg:order-1">
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

            <FadeIn delay={0.15} className="order-1 lg:order-2">
              <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
                {t('intro.label')}
              </p>
              <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light leading-[1.15] mb-8">
                {t('intro.title')}
              </h2>
              <div className="space-y-5 mb-10">
                <p className="text-noir/75 text-base font-body font-light leading-relaxed">
                  {t('intro.text1')}
                </p>
                <p className="text-noir/75 text-base font-body font-light leading-relaxed">
                  {t('intro.text2')}
                </p>
              </div>
              {/* Dato capacidad inline */}
              <div className="border-l-2 border-dore/40 pl-6">
                <p className="font-display italic text-3xl text-noir font-light">
                  {t('capacidad.numero')} <span className="text-lg">{t('capacidad.unidad')}</span>
                </p>
                <p className="text-taupe/60 text-xs tracking-widest uppercase font-body mt-1">
                  {t('capacidad.nota')}
                </p>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>

      {/* Modalidades */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="text-center mb-14">
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('modalidades.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light">
              {t('modalidades.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {modalidadKeys.map((key, i) => {
              const tags = t.raw(`modalidades.${key}.tags`) as string[];
              return (
                <FadeIn key={key} delay={i * 0.15}>
                  <div className="border border-dore/40 p-1.5 h-full">
                    <div className="border border-dore/20 p-8 lg:p-10 h-full flex flex-col">
                      <span className="text-dore text-xs tracking-[0.3em] font-body">
                        {t(`modalidades.${key}.numero`)}
                      </span>
                      <div className="w-8 h-px bg-dore/40 my-4" />
                      <p className="text-taupe/60 text-[10px] tracking-[0.25em] uppercase font-body mb-2">
                        {t(`modalidades.${key}.label`)}
                      </p>
                      <h3 className="font-display italic text-2xl md:text-3xl text-noir font-light leading-tight mb-5">
                        {t(`modalidades.${key}.title`)}
                      </h3>
                      <p className="text-noir/65 text-sm font-body font-light leading-relaxed flex-1 mb-8">
                        {t(`modalidades.${key}.text`)}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-dore/20">
                        {tags.map((tag) => (
                          <span key={tag} className="text-[10px] tracking-widest uppercase font-body text-taupe/60 border border-dore/25 px-3 py-1.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-dore/20" />
      </div>

      {/* Usos */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="text-center mb-16 lg:mb-20">
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('usos.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light">
              {t('usos.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {usoKeys.map((key, i) => (
              <FadeIn key={key} delay={i * 0.15}>
                <span className="text-xs tracking-[0.3em] text-dore font-body">
                  {t(`usos.${key}.numero`)}
                </span>
                <div className="w-8 h-px bg-dore/40 my-4" />
                <p className="text-taupe/60 text-[10px] tracking-[0.25em] uppercase font-body mb-2">
                  {t(`usos.${key}.label`)}
                </p>
                <h3 className="font-display italic text-2xl text-noir font-light mb-4">
                  {t(`usos.${key}.title`)}
                </h3>
                <p className="text-noir/65 text-sm font-body font-light leading-relaxed">
                  {t(`usos.${key}.text`)}
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

      {/* Precio */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-taupe/60 text-[10px] tracking-[0.3em] uppercase font-body min-w-max">
              {t('precio.label')}
            </p>
            <div className="h-px flex-1 bg-dore/20" />
            <p className="text-noir/70 text-sm font-body font-light italic">
              {t('precio.texto')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA final — noir */}
      <section className="bg-noir py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('cta.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-creme font-light mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-creme/50 text-base font-body font-light leading-relaxed mb-10 max-w-lg mx-auto">
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
                href={`/${locale}/carta`}
                className="inline-flex items-center justify-center px-8 py-4 border border-creme/25 text-creme text-xs tracking-widest uppercase font-body hover:border-creme/60 hover:bg-creme/5 transition-all duration-300"
              >
                Ver la carta
              </Link>
            </div>
            <p className="text-creme/35 text-sm font-body mt-8 tracking-wide">
              {t('cta.phone')}
            </p>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
