'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const navLinks = [
    { href: '/quienes-somos', key: 'quienesSomos' },
    { href: '/carta', key: 'carta' },
    { href: '/alquiler-sala', key: 'alquilerSala' },
    { href: '/hit-card', key: 'hitCard' },
    { href: '/eventos', key: 'eventos' },
    { href: '/galeria', key: 'galeria' },
    { href: '/contacto', key: 'contacto' },
  ];

  return (
    <footer className="bg-noir text-creme">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Image
              src="/logo-light.jpeg"
              alt="Amélie Restaurant"
              width={120}
              height={48}
              className="h-12 w-auto object-contain brightness-0 invert opacity-80"
            />
            <p className="text-sm text-creme/50 font-body leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/amelie_cafe_las_palmas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-creme/40 hover:text-dore transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase text-dore font-body mb-2">
              Navegación
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase text-dore font-body mb-2">
              Contacto
            </p>
            <p className="text-sm text-creme/50 font-body">
              C. Jesús Ferrer Jimeno, 4<br />
              35010 Las Palmas de Gran Canaria
            </p>
            <a
              href="tel:+34928607570"
              className="text-sm text-creme/50 hover:text-creme transition-colors font-body"
            >
              +34 928 60 75 70
            </a>
            <div className="mt-2">
              <p className="text-xs text-creme/30 font-body">Mar–Jue · 9:30–16:30</p>
              <p className="text-xs text-creme/30 font-body">Vie–Sáb · 9:30–16:30 y 20:00–23:00</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-creme/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-creme/25 font-body">
            © {new Date().getFullYear()} Amélie Restaurant · {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacidad`} className="text-xs text-creme/25 hover:text-creme/50 transition-colors font-body">
              {t('footer.privacy')}
            </Link>
            <Link href={`/${locale}/cookies`} className="text-xs text-creme/25 hover:text-creme/50 transition-colors font-body">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
