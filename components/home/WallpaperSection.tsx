'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WallpaperSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgPositionY = useTransform(scrollYProgress, [0, 1], ['0px', '-200px']);

  return (
    <motion.div
      ref={ref}
      className="wallpaper-wrapper"
      style={isMobile ? { backgroundPositionY: bgPositionY } : {}}
    >
      {children}
    </motion.div>
  );
}
