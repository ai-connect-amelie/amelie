import type { Metadata } from 'next';
import { Gloock, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const gloock = Gloock({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Amélie Restaurant — Las Palmas de Gran Canaria',
    template: '%s | Amélie Restaurant',
  },
  description: 'Restaurante francés auténtico en Las Palmas. Galette bretonne, pan artesano y una experiencia cultural única en Gran Canaria.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Amélie Restaurant',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  const messages = await getMessages();

  return (
    <div lang={locale} className={`${gloock.variable} ${inter.variable} min-h-screen flex flex-col bg-creme text-noir antialiased`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
