'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const carouselImages = ['/harina.webp', '/388054.webp'];

export default function GaletteBlock() {
  const t = useTranslations('home.galette');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Carrusel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full aspect-[3/4] overflow-hidden order-2 lg:order-1"
          >
            {carouselImages.map((src, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: i === current ? 1 : 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                <Image
                  src={src}
                  alt="Bretaña desde 1870"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            ))}
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all duration-500 ${i === current ? 'w-8 bg-dore' : 'w-3 bg-creme/50'}`}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-dore/60 z-10" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-dore/60 z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.1] font-light italic mb-8">
              {t('title')}
            </h2>
            <div className="space-y-5 mb-10">
              <p className="text-noir/75 text-base font-body font-light leading-relaxed">
                {t('text1')}
              </p>
              <p className="text-noir/75 text-base font-body font-light leading-relaxed">
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
