'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = { name: string; desc?: string; price?: string };
type Dish = { name: string; desc?: string; allergens: string };
type TabId = 'brunch' | 'menu-dia' | 'principal';

const HASH_TO_TAB: Record<string, TabId> = {
  '#brunch': 'brunch',
  '#menu-del-dia': 'menu-dia',
  '#carta': 'principal',
};

const TAB_TO_HASH: Record<TabId, string> = {
  brunch: '#brunch',
  'menu-dia': '#menu-del-dia',
  principal: '#carta',
};

// Pestaña inicial según día y hora del restaurante (Canarias):
// Mar–Sáb 9:30–13:00 → brunch · Mar–Vie 13:00–16:00 → menú del día · resto → carta
function defaultTabByTime(): TabId {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Atlantic/Canary',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    const day = get('weekday');
    const minutes = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
    const brunchDays = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const menuDays = ['Tue', 'Wed', 'Thu', 'Fri'];
    if (brunchDays.includes(day) && minutes >= 570 && minutes < 780) return 'brunch';
    if (menuDays.includes(day) && minutes >= 780 && minutes < 960) return 'menu-dia';
  } catch {
    // Si Intl falla, mostramos la carta
  }
  return 'principal';
}

function MenuRow({ item }: { item: Item }) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-body text-[15px] text-noir">{item.name}</span>
        <span className="flex-1 border-b border-dotted border-taupe/40 -translate-y-1" />
        {item.price ? (
          <span className="font-body text-[15px] text-noir whitespace-nowrap">{item.price}</span>
        ) : null}
      </div>
      {item.desc ? (
        <p className="mt-1 pr-8 text-sm font-body font-light text-noir/60 leading-relaxed max-w-xl">
          {item.desc}
        </p>
      ) : null}
    </div>
  );
}

function SectionHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display italic text-3xl md:text-4xl text-noir font-light">{title}</h2>
      {note ? <p className="mt-2 text-sm font-body font-light text-taupe">{note}</p> : null}
      <div className="w-10 h-px bg-dore/50 mt-4" />
    </div>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <MenuRow key={item.name} item={item} />
      ))}
    </div>
  );
}

function AnchorNav({ anchors }: { anchors: { id: string; label: string }[] }) {
  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-14 border-y border-sable py-4">
      {anchors.map((a) => (
        <button
          key={a.id}
          onClick={() => document.getElementById(a.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="text-xs tracking-widest uppercase font-body text-taupe hover:text-noir transition-colors duration-200"
        >
          {a.label}
        </button>
      ))}
    </nav>
  );
}

function BebidasSections({ idPrefix }: { idPrefix: string }) {
  const t = useTranslations('carta.bebidas');
  const groups = ['cafes', 'tes', 'lattes', 'limonadas', 'smoothies'] as const;
  return (
    <section id={`${idPrefix}-bebidas`} className="scroll-mt-28">
      <SectionHeading title={t('title')} note={t('note')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {groups.map((g) => {
          const group = t.raw(g) as { title: string; note?: string; items: Item[] };
          return (
            <div key={g}>
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-dore mb-1">
                {group.title}
              </h3>
              {group.note ? (
                <p className="text-sm font-body font-light text-noir/55 mb-4">{group.note}</p>
              ) : (
                <div className="mb-4" />
              )}
              <ItemList items={group.items} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MenuDiaPanel() {
  const t = useTranslations('carta.menuDia');
  const courses = ['primeros', 'segundos', 'postres'] as const;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light mb-3">
          {t('title')}
        </h2>
        <p className="text-sm font-body text-taupe tracking-wide mb-6">{t('hours')}</p>
        <p className="font-display text-3xl text-dore-dark">{t('price')}</p>
      </div>

      <p className="text-base font-body font-light text-noir/70 leading-relaxed text-center mb-14">
        {t('intro')}
      </p>

      <p className="text-xs tracking-[0.3em] uppercase font-body text-dore text-center mb-10">
        {t('weekLabel')}
      </p>

      <div className="space-y-12">
        {courses.map((course) => (
          <div key={course}>
            <h3 className="font-body text-xs tracking-[0.25em] uppercase text-dore mb-6">
              {t(`${course}.title`)}
            </h3>
            <div className="space-y-6">
              {(t.raw(`${course}.items`) as Dish[]).map((dish) => (
                <div key={dish.name}>
                  <p className="font-body text-[15px] text-noir">{dish.name}</p>
                  {dish.desc ? (
                    <p className="mt-1 text-sm font-body font-light text-noir/60 leading-relaxed">
                      {dish.desc}
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs font-body font-light text-taupe/80 leading-relaxed">
                    {dish.allergens}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border border-dore/40 px-6 py-5 text-center">
        <p className="text-xs tracking-[0.25em] uppercase font-body text-dore mb-2">
          {t('incluye.title')}
        </p>
        <p className="text-sm font-body text-noir/75">{t('incluye.text')}</p>
        <p className="mt-1 text-xs font-body font-light text-taupe/80">{t('incluye.allergens')}</p>
      </div>

      <p className="mt-8 text-xs font-body font-light text-taupe/80 leading-relaxed text-center">
        {t('allergyNote')}
      </p>
    </div>
  );
}

export default function CartaClient() {
  const t = useTranslations('carta');
  const [tab, setTab] = useState<TabId>('principal');

  useEffect(() => {
    const fromHash = HASH_TO_TAB[window.location.hash];
    setTab(fromHash ?? defaultTabByTime());
  }, []);

  const selectTab = (next: TabId) => {
    setTab(next);
    history.replaceState(null, '', TAB_TO_HASH[next]);
  };

  const tabs: { id: TabId; key: 'brunch' | 'menuDia' | 'principal' }[] = [
    { id: 'brunch', key: 'brunch' },
    { id: 'menu-dia', key: 'menuDia' },
    { id: 'principal', key: 'principal' },
  ];

  const brunchAnchors = [
    { id: 'brunch-salado', label: t('anchors.salado') },
    { id: 'brunch-dulce', label: t('anchors.dulce') },
    { id: 'brunch-bebidas', label: t('anchors.bebidas') },
  ];

  const principalAnchors = [
    { id: 'carta-empezar', label: t('anchors.empezar') },
    { id: 'carta-seguir', label: t('anchors.seguir') },
    { id: 'carta-hamburguesas', label: t('anchors.hamburguesas') },
    { id: 'carta-galettes', label: t('anchors.galettes') },
    { id: 'carta-postres', label: t('anchors.postres') },
    { id: 'carta-bebidas', label: t('anchors.bebidas') },
  ];

  const principalSections = ['empezar', 'seguir', 'hamburguesas', 'galettes', 'postres'] as const;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-creme">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Cabecera */}
        <div className="text-center mb-12">
          <h1 className="font-display italic text-5xl md:text-6xl text-noir font-light mb-4">
            {t('title')}
          </h1>
          <p className="text-base font-body font-light text-noir/65 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Selector de momento */}
        <p className="text-xs tracking-[0.3em] uppercase font-body text-dore text-center mb-6">
          {t('question')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-16">
          {tabs.map(({ id, key }) => (
            <button
              key={id}
              onClick={() => selectTab(id)}
              aria-pressed={tab === id}
              className={`flex flex-col items-center gap-1 px-4 py-5 border transition-colors duration-300 ${
                tab === id
                  ? 'bg-noir border-noir text-creme'
                  : 'border-noir/25 text-noir hover:border-noir'
              }`}
            >
              <span className="font-display italic text-xl font-light">{t(`tabs.${key}.label`)}</span>
              <span
                className={`text-[11px] tracking-widest uppercase font-body ${
                  tab === id ? 'text-creme/60' : 'text-taupe'
                }`}
              >
                {t(`tabs.${key}.hours`)}
              </span>
            </button>
          ))}
        </div>

        {/* Panel: Desayunos & Brunch */}
        <div className={tab === 'brunch' ? '' : 'hidden'}>
          <AnchorNav anchors={brunchAnchors} />
          <div className="space-y-20">
            <section id="brunch-salado" className="scroll-mt-28">
              <SectionHeading title={t('brunch.salado.title')} note={t('brunch.note')} />
              <ItemList items={t.raw('brunch.salado.items') as Item[]} />
            </section>
            <section id="brunch-dulce" className="scroll-mt-28">
              <SectionHeading title={t('brunch.dulce.title')} note={t('brunch.note')} />
              <ItemList items={t.raw('brunch.dulce.items') as Item[]} />
            </section>
            <BebidasSections idPrefix="brunch" />
          </div>
        </div>

        {/* Panel: Menú del Día */}
        <div className={tab === 'menu-dia' ? '' : 'hidden'}>
          <MenuDiaPanel />
        </div>

        {/* Panel: La Carta */}
        <div className={tab === 'principal' ? '' : 'hidden'}>
          <AnchorNav anchors={principalAnchors} />
          <div className="space-y-20">
            {principalSections.map((section) => {
              const data = t.raw(`principal.${section}`) as {
                title: string;
                note?: string;
                items: Item[];
              };
              return (
                <section key={section} id={`carta-${section}`} className="scroll-mt-28">
                  <SectionHeading title={data.title} note={data.note} />
                  <ItemList items={data.items} />
                </section>
              );
            })}
            <BebidasSections idPrefix="carta" />
          </div>
        </div>

        <p className="mt-20 text-center text-xs font-body font-light text-taupe tracking-wide">
          {t('igic')}
        </p>
      </div>
    </div>
  );
}
