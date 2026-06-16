'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/quienes-somos', label: t('quienesSomos') },
    { href: '/carta', label: t('carta') },
    { href: '/eventos', label: t('eventos') },
    { href: '/hit-card', label: t('hitCard') },
    { href: '/alquiler-sala', label: t('alquilerSala') },
    { href: '/galeria', label: t('galeria') },
    { href: '/contacto', label: t('contacto') },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-creme/95 backdrop-blur-sm shadow-sm border-b border-sable'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full pl-4 pr-6 lg:pl-8 lg:pr-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center self-center">
          <Image
            src="/logo-horizontal.png"
            alt="Amélie Restaurant"
            width={180}
            height={48}
            className="h-10 lg:h-12 w-auto object-contain block"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-sm tracking-widest uppercase text-noir/70 hover:text-noir transition-colors duration-200 font-body"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language switcher dropdown */}
          <div ref={langRef} className="hidden sm:block relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-body text-noir/70 hover:text-noir transition-colors duration-200"
            >
              {locale.toUpperCase()}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-creme border border-sable shadow-lg min-w-[80px] z-50">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { switchLocale(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs tracking-widest font-body transition-colors duration-150 ${
                      locale === l.code
                        ? 'text-noir bg-sable font-medium'
                        : 'text-taupe hover:text-noir hover:bg-sable/50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reserve CTA */}
          <Link
            href={`/${locale}/reservar`}
            className="hidden sm:inline-flex items-center px-5 py-2.5 bg-noir text-creme text-xs tracking-widest uppercase font-body hover:bg-taupe transition-colors duration-300"
          >
            {t('reservar')}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <span className={`block w-6 h-px bg-noir transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-noir transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-noir transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-creme border-t border-sable transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-noir/70 hover:text-noir transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/reservar`}
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center px-5 py-3 bg-noir text-creme text-xs tracking-widest uppercase mt-2"
          >
            {t('reservar')}
          </Link>
          <div className="flex items-center gap-3 pt-2">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => { switchLocale(l.code); setMenuOpen(false); }}
                className={`text-xs tracking-widest font-body ${
                  locale === l.code ? 'text-noir font-medium' : 'text-taupe'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
