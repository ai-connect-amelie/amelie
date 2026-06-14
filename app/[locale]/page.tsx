import Hero from '@/components/home/Hero';
import PhilosophyBlock from '@/components/home/PhilosophyBlock';
import ManifestoBlock from '@/components/home/ManifestoBlock';
import DifferentialsBlock from '@/components/home/DifferentialsBlock';
import KilometroBlock from '@/components/home/KilometroBlock';
import GaletteBlock from '@/components/home/GaletteBlock';
import SalonBlock from '@/components/home/SalonBlock';
import InstagramBlock from '@/components/home/InstagramBlock';
import LocationBlock from '@/components/home/LocationBlock';
import WallpaperSection from '@/components/home/WallpaperSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WallpaperSection>
        <PhilosophyBlock />
        <ManifestoBlock />
        <DifferentialsBlock />
        <KilometroBlock />
        <GaletteBlock />
        <SalonBlock />
        <InstagramBlock />
        <LocationBlock />
      </WallpaperSection>
    </>
  );
}
