'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function PhilosophyBlock() {
  const t = useTranslations('home.philosophy');
  const ref = useRef(null);
  const imgRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="py-12 lg:py-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-noir/50 text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-noir leading-[1.15] font-light italic mb-8">
              {t('title')}
            </h2>
            <p className="text-noir/75 text-lg font-body font-light leading-relaxed">
              {t('text')}
            </p>
          </motion.div>

          {/* Image con parallax horizontal */}
          <div ref={imgRef} className="relative w-full aspect-[4/5] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ x }}>
              <Image
                src="/home1.webp"
                alt="Amelie Restaurant"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-dore/60 z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-dore/60 z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
