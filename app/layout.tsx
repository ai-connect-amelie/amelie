import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amélie Restaurant',
  description: 'Una experiencia gastronómica francesa auténtica en el corazón de Las Palmas de Gran Canaria.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
