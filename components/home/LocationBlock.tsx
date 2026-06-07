'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function LocationBlock() {
  const t = useTranslations('home.location');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t('label')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-noir font-light italic mb-8">
            {t('title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/reservar`}
              className="inline-flex items-center justify-center px-8 py-4 bg-noir text-creme text-xs tracking-widest uppercase font-body hover:bg-taupe transition-colors duration-300"
            >
              {t('ctaReservar')}
            </Link>
            <a
              href="https://maps.app.goo.gl/EDuBXFFsHXSDnd1V8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-noir text-noir text-xs tracking-widest uppercase font-body hover:bg-noir hover:text-creme transition-all duration-300"
            >
              {t('ctaMaps')}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full h-[400px] md:h-[500px] lg:h-[560px] overflow-hidden"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.0!2d-15.4358273!3d28.1331258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc4095ca491b0e0f%3A0xa7eb6f70d4443dd7!2sAmelie%20Caf%C3%A9!5e0!3m2!1ses!2ses!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Amelie Restaurant — Ubicación"
          />
        </motion.div>

      </div>
    </section>
  );
}
