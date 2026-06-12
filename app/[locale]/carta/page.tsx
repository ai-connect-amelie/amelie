import type { Metadata } from 'next';
import CartaClient from '@/components/carta/CartaClient';

export const metadata: Metadata = {
  title: 'La carta',
  description:
    'Carta de Amélie Restaurant: desayunos y brunch, menú del día y cocina francesa con la auténtica galette bretonne en Las Palmas de Gran Canaria.',
};

export default function CartaPage() {
  return <CartaClient />;
}
