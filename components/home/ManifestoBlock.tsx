'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function ManifestoBlock() {
  const t = useTranslations('home.manifesto');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const lines = [
    { normal: t('l1a'), highlight: t('l1b') },
    { normal: t('l2a'), highlight: t('l2b') },
    { normal: t('l3a'), highlight: t('l3b') },
    { normal: t('l4a'), highlight: t('l4b') },
  ];

  return (
    <section ref={ref} className="py-10 lg:py-14">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="w-12 h-px bg-dore/50 mx-auto mb-10" />
          <p className="font-display font-light leading-[1.25]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {lines.map((line, i) => (
              <span key={i} className="block">
                <span className="text-noir">{line.normal} </span>
                <span className="text-dore italic">{line.highlight}</span>
              </span>
            ))}
          </p>
          <div className="w-12 h-px bg-dore/50 mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
}
