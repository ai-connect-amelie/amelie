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
    <footer className="bg-noir text-creme overflow-hidden">

      {/* Línea dorada superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-dore/50 to-transparent" />

      {/* Bloque central — logo grande */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16 text-center">
        <Image
          src="/logo-light.jpeg"
          alt="Amélie Restaurant"
          width={200}
          height={80}
          className="h-20 w-auto object-contain brightness-0 invert opacity-70 mx-auto mb-10"
        />

        {/* Nav horizontal centrada */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-xs tracking-[0.2em] uppercase text-creme/40 hover:text-dore transition-colors duration-300 font-body"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        {/* Separador ornamental */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-dore/30" />
          <span className="text-dore/50 text-xs tracking-[0.3em]">✦</span>
          <div className="h-px w-16 bg-dore/30" />
        </div>

        {/* Info en fila */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-dore/60 font-body mb-1">Dirección</p>
            <p className="text-sm text-creme/50 font-body">C. Jesús Ferrer Jimeno, 4 · Las Palmas de Gran Canaria</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-creme/10" />
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-dore/60 font-body mb-1">Horario</p>
            <p className="text-sm text-creme/50 font-body">Mar–Jue 9:30–16:30 · Vie–Sáb 9:30–16:30 y 20:00–23:00</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-creme/10" />
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-dore/60 font-body mb-1">Teléfono</p>
            <a href="tel:+34928607570" className="text-sm text-creme/50 hover:text-dore transition-colors font-body">
              +34 928 60 75 70
            </a>
          </div>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/amelie_cafe_las_palmas/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-creme/30 hover:text-dore transition-colors duration-300 mb-16"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="text-xs tracking-[0.25em] font-body">@amelie_cafe_las_palmas</span>
        </a>

        {/* Bottom */}
        <div className="h-px w-full bg-creme/8 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-creme/20 font-body tracking-widest">
            © {new Date().getFullYear()} AMÉLIE RESTAURANT · LAS PALMAS DE GRAN CANARIA
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacidad`} className="text-xs text-creme/20 hover:text-creme/40 transition-colors font-body tracking-widest">
              {t('footer.privacy')}
            </Link>
            <span className="text-creme/10">·</span>
            <Link href={`/${locale}/cookies`} className="text-xs text-creme/20 hover:text-creme/40 transition-colors font-body tracking-widest">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
