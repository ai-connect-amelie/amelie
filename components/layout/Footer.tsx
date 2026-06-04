'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="bg-noir text-creme">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1 — Logo + Dirección + Horario */}
          <div className="flex flex-col gap-6">
            <Image
              src="/logo-light.jpeg"
              alt="Amélie Restaurant"
              width={140}
              height={56}
              className="h-14 w-auto object-contain brightness-0 invert opacity-75"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-creme/50 font-body">C. Jesús Ferrer Jimeno, 4</p>
              <p className="text-sm text-creme/50 font-body">Las Palmas de Gran Canaria</p>
              <p className="text-sm text-creme/50 font-body">España, 35010</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-creme/40 font-body">Mar–Jue · 9:30 – 16:30</p>
              <p className="text-sm text-creme/40 font-body">Vie–Sáb · 9:30 – 23:00</p>
              <p className="text-sm text-creme/25 font-body">Cerrado dom y lun</p>
            </div>
          </div>

          {/* Col 2 — Navegación + Reservas */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-creme/35 font-body mb-1">
              Navegación
            </p>
            <Link href={`/${locale}/quienes-somos`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">Quiénes somos</Link>
            <Link href={`/${locale}/carta`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">La carta</Link>
            <Link href={`/${locale}/eventos`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">Eventos</Link>
            <Link href={`/${locale}/galeria`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">Galería</Link>

            <div className="h-px bg-creme/10 my-2" />

            <p className="text-xs tracking-[0.3em] uppercase text-creme/35 font-body mb-1">
              Reservas
            </p>
            <a href="tel:+34928607570" className="text-sm text-creme/70 hover:text-dore transition-colors duration-200 font-body">
              +34 928 60 75 70
            </a>
          </div>

          {/* Col 3 — Legal */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-creme/35 font-body mb-1">
              Legal
            </p>
            <Link href={`/${locale}/privacidad`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">Política de Privacidad</Link>
            <Link href={`/${locale}/cookies`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">Política de Cookies</Link>
            <Link href={`/${locale}/aviso-legal`} className="text-sm text-creme/50 hover:text-creme transition-colors duration-200 font-body">Aviso Legal</Link>
          </div>

          {/* Col 4 — Redes sociales */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-creme/35 font-body mb-1">
              Redes sociales
            </p>
            <a
              href="https://www.instagram.com/amelie_cafe_las_palmas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-creme/40 hover:text-dore transition-colors duration-200 w-fit"
              aria-label="Instagram"
            >
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-creme/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-creme/25 font-body">
            © {new Date().getFullYear()} Amélie Restaurant · Las Palmas de Gran Canaria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
