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
    <section ref={ref} className="bg-creme py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-6">
              {t('label')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-noir font-light italic mb-10">
              {t('title')}
            </h2>

            <div className="space-y-6 mb-10">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-px h-full bg-dore/40 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-taupe font-body mb-1">Dirección</p>
                  <p className="text-noir font-body">{t('address')}</p>
                  <p className="text-noir font-body">{t('city')}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-px h-full bg-dore/40 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-taupe font-body mb-1">Horario</p>
                  <p className="text-noir font-body text-sm">{t('hours')}</p>
                  <p className="text-noir font-body text-sm">{t('hoursFriSat')}</p>
                  <p className="text-taupe font-body text-sm mt-1">{t('closed')}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-px h-full bg-dore/40 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-taupe font-body mb-1">Teléfono</p>
                  <a href="tel:+34928607570" className="text-noir font-body hover:text-dore transition-colors">
                    {t('phone')}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="aspect-square lg:aspect-auto lg:h-[480px] bg-sable relative overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.0!2d-15.4358273!3d28.1331258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc4095ca491b0e0f%3A0xa7eb6f70d4443dd7!2sAmelie%20Caf%C3%A9!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amelie Restaurant — Ubicación"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
