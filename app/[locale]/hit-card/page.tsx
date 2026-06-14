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

type ExperienceItem = {
  numero: string;
  nombre: string;
  descripcion: string;
  incluye: string;
  precio: string;
};

function ExperienceCard({ item, delay }: { item: ExperienceItem; delay: number }) {
  return (
    <FadeIn delay={delay} className="flex flex-col">
      {/* Marco doble */}
      <div className="border border-dore/40 p-1.5 flex flex-col flex-1">
        <div className="border border-dore/20 p-8 flex flex-col flex-1">

          {/* Placeholder foto */}
          <div className="relative w-full aspect-[4/3] bg-sable mb-8 overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-px bg-dore/30" />
              <p className="text-taupe/30 text-[10px] tracking-widest uppercase font-body">
                Foto próximamente
              </p>
              <div className="w-8 h-px bg-dore/30" />
            </div>
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-dore/30" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-dore/30" />
          </div>

          {/* Número */}
          <p className="text-dore text-xs tracking-[0.3em] font-body mb-3">
            {item.numero}
          </p>

          {/* Filete */}
          <div className="w-8 h-px bg-dore/40 mb-5" />

          {/* Nombre */}
          <h3 className="font-display italic text-2xl md:text-3xl text-noir font-light leading-tight mb-4">
            {item.nombre}
          </h3>

          {/* Descripción */}
          <p className="text-noir/65 text-sm font-body font-light leading-relaxed mb-6 flex-1">
            {item.descripcion}
          </p>

          {/* Incluye */}
          <div className="border-l-2 border-dore/35 pl-4 mb-6">
            <p className="text-taupe/60 text-[10px] tracking-[0.2em] uppercase font-body mb-1">
              Incluye
            </p>
            <p className="text-noir/70 text-xs font-body font-light leading-relaxed">
              {item.incluye}
            </p>
          </div>

          {/* Footer: pax + precio */}
          <div className="flex items-end justify-between pt-4 border-t border-dore/20">
            <div>
              <p className="text-taupe/50 text-[10px] tracking-widest uppercase font-body">Para 2 personas</p>
              <p className="text-taupe/50 text-[10px] tracking-widest uppercase font-body">Válido 1 año</p>
            </div>
            <div className="text-right">
              <span className="font-display text-3xl text-dore-dark font-light">{item.precio}</span>
              <span className="text-dore-dark text-sm font-body ml-1">€</span>
            </div>
          </div>

        </div>
      </div>
    </FadeIn>
  );
}

export default function HitCardPage() {
  const t = useTranslations('hitCard');
  const locale = useLocale();

  const experiences = t.raw('experiences.items') as ExperienceItem[];
  const steps = t.raw('como.steps') as { numero: string; texto: string }[];

  return (
    <main className="bg-creme min-h-screen">

      {/* Hero */}
      <section className="relative bg-noir py-36 lg:py-48 text-center overflow-hidden">
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-dore/25" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-dore/25" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <p className="text-dore text-xs tracking-[0.4em] uppercase font-body mb-6">
              {t('hero.label')}
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-dore/40" />
              <Diamond />
              <div className="h-px w-12 bg-dore/40" />
            </div>
            <h1 className="font-display italic text-6xl md:text-7xl lg:text-8xl text-creme font-light leading-[1.05] mb-6">
              {t('hero.title')}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-dore/40" />
              <Diamond />
              <div className="h-px w-12 bg-dore/40" />
            </div>
            <p className="text-creme/50 text-lg font-body font-light leading-relaxed max-w-xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-dore/15">
        <FadeIn className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-noir/55 text-sm font-body font-light leading-relaxed italic">
            {t('intro.text')}
          </p>
        </FadeIn>
      </section>

      {/* Experiencias */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <FadeIn className="text-center mb-16 lg:mb-20">
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t('experiences.label')}
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light">
              {t('experiences.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {experiences.map((item, i) => (
              <ExperienceCard key={item.numero} item={item} delay={i * 0.15} />
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <p className="text-taupe/50 text-xs tracking-widest uppercase font-body">
              {t('nota')}
            </p>
          </FadeIn>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <FadeIn key={step.numero} delay={i * 0.15} className="text-center">
                <span className="font-display italic text-5xl text-dore/30 font-light block mb-4">
                  {step.numero}
                </span>
                <div className="w-6 h-px bg-dore/40 mx-auto mb-4" />
                <p className="text-noir/70 text-sm font-body font-light leading-relaxed">
                  {step.texto}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
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
              <a
                href="https://maps.app.goo.gl/EDuBXFFsHXSDnd1V8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-creme/25 text-creme text-xs tracking-widest uppercase font-body hover:border-creme/50 hover:bg-creme/5 transition-all duration-300"
              >
                {t('cta.visitLabel')}
              </a>
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
