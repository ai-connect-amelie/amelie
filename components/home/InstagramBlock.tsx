'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const POSTS = [
  {
    id: 1,
    gradient: 'from-[#f5e6d3] to-[#e8d5b7]',
    label: 'Galette bretonne',
    caption: 'La galette que cruzó el océano 🌊 Harina ecológica de Bretaña, molida en un molino histórico desde 1870. La única auténtica en Gran Canaria.',
    hashtags: '#amelie #galettebretonnecanarias #laspalmasgc #gastronomiafrancesa',
    likes: 127,
    comments: 12,
    timeAgo: '2 días',
  },
  {
    id: 2,
    gradient: 'from-[#ede5d8] to-[#d9cfc0]',
    label: 'Pan de la casa',
    caption: 'Nuestro pan. Elaborado cada día en nuestra cocina con receta propia. 🥖 El ritual que comienza antes del primer plato.',
    hashtags: '#pancasero #amelie #franciaengrancanaria #artesanal',
    likes: 203,
    comments: 18,
    timeAgo: '4 días',
  },
  {
    id: 3,
    gradient: 'from-[#f0ebe4] to-[#e4ddd3]',
    label: 'Rincón Amelie',
    caption: 'Porque cada detalle importa ✨ Un rincón de Francia en el corazón de Las Palmas de Gran Canaria.',
    hashtags: '#amelie #brunch #laspalmasgrancanaria #cafeteria',
    likes: 89,
    comments: 7,
    timeAgo: '1 semana',
  },
];

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const igFont = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' };

function InstagramCard({ post }: { post: typeof POSTS[0] }) {
  return (
    <article className="bg-white border border-[#dbdbdb] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full p-[2px] flex-shrink-0"
            style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
          >
            <div className="w-full h-full rounded-full bg-[#E8DDD0] flex items-center justify-center">
              <span className="text-[#1C1814] text-[11px] font-bold" style={igFont}>A</span>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#262626] leading-tight" style={igFont}>
              amelie_cafe_las_palmas
            </p>
            <p className="text-[11px] text-[#737373] leading-tight" style={igFont}>
              Las Palmas de Gran Canaria
            </p>
          </div>
        </div>
        <button className="text-[#262626] p-1" aria-label="Más opciones">
          <MoreIcon />
        </button>
      </div>

      {/* Photo placeholder */}
      <div className={`w-full aspect-square bg-gradient-to-br ${post.gradient} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[#8C7B6B]/40 text-[11px] tracking-widest uppercase" style={igFont}>
            {post.label}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1 text-[#262626]">
        <div className="flex items-center gap-4">
          <button aria-label="Me gusta"><HeartIcon /></button>
          <button aria-label="Comentar"><CommentIcon /></button>
          <button aria-label="Enviar"><SendIcon /></button>
        </div>
        <button aria-label="Guardar"><BookmarkIcon /></button>
      </div>

      {/* Likes */}
      <div className="px-3 pb-1">
        <p className="text-[13px] font-semibold text-[#262626]" style={igFont}>
          {post.likes.toLocaleString('es-ES')} me gusta
        </p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-1">
        <p className="text-[13px] text-[#262626] leading-[1.4]" style={igFont}>
          <span className="font-semibold">amelie_cafe_las_palmas</span>{' '}
          {post.caption}{' '}
          <span className="text-[#00376B]">{post.hashtags}</span>
        </p>
      </div>

      {/* Comments */}
      <div className="px-3 pb-1">
        <p className="text-[13px] text-[#737373] cursor-pointer" style={igFont}>
          Ver los {post.comments} comentarios
        </p>
      </div>

      {/* Date */}
      <div className="px-3 pb-3">
        <p className="text-[10px] text-[#8e8e8e] uppercase tracking-wide" style={igFont}>
          Hace {post.timeAgo}
        </p>
      </div>
    </article>
  );
}

export default function InstagramBlock() {
  const t = useTranslations('home.instagram');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-dore text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t('label')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-noir font-light italic whitespace-pre-line mb-4">
            {t('title')}
          </h2>
          <a
            href="https://www.instagram.com/amelie_cafe_las_palmas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-taupe hover:text-noir transition-colors font-body"
          >
            {t('handle')}
          </a>
        </motion.div>

        {/* Desktop: 3 cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6"
        >
          {POSTS.map((post) => (
            <InstagramCard key={post.id} post={post} />
          ))}
        </motion.div>

        {/* Mobile: 1 card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="md:hidden"
        >
          <InstagramCard post={POSTS[0]} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/amelie_cafe_las_palmas/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-noir text-creme text-xs tracking-widest uppercase font-body hover:bg-taupe transition-colors duration-300"
          >
            {t('cta')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
