import Hero from '@/components/home/Hero';
import PhilosophyBlock from '@/components/home/PhilosophyBlock';
import DifferentialsBlock from '@/components/home/DifferentialsBlock';
import GaletteBlock from '@/components/home/GaletteBlock';
import InstagramBlock from '@/components/home/InstagramBlock';
import LocationBlock from '@/components/home/LocationBlock';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophyBlock />
      <DifferentialsBlock />
      <GaletteBlock />
      <InstagramBlock />
      <LocationBlock />
    </>
  );
}
