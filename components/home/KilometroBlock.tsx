'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function KilometroBlock() {
  const t = useTranslations('home.kilometro');
  const ref = useRef(null);
  const imgRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={ref} className="py-24 lg:py-36">
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

          {/* Image con parallax horizontal inverso */}
          <div ref={imgRef} className="relative w-full aspect-[4/5] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ x }}>
              <Image
                src="/km0.webp"
                alt="Producto de temporada Km 0"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-dore/60 z-10" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-dore/60 z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
