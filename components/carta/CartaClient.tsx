'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = { name: string; desc?: string; price?: string };
type Dish = { name: string; desc?: string; allergens: string };
type WineGroup = { title: string; items: Item[] };
type TabId = 'brunch' | 'menu-dia' | 'principal' | 'bebidas';

const HASH_TO_TAB: Record<string, TabId> = {
  '#brunch': 'brunch',
  '#menu-del-dia': 'menu-dia',
  '#carta': 'principal',
  '#bebidas': 'bebidas',
};

const TAB_TO_HASH: Record<TabId, string> = {
  brunch: '#brunch',
  'menu-dia': '#menu-del-dia',
  principal: '#carta',
  bebidas: '#bebidas',
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

/* ── Ornamentos ── */

function Diamond({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`inline-block w-1.5 h-1.5 rotate-45 border border-dore ${className}`} />;
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-14 bg-gradient-to-l from-dore/60 to-transparent" />
      <Diamond />
      <span className="h-px w-14 bg-gradient-to-r from-dore/60 to-transparent" />
    </div>
  );
}

function SectionHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-5 mb-3">
        <span className="h-px flex-1 max-w-20 bg-dore/40" aria-hidden />
        <h2 className="font-display italic text-3xl md:text-4xl text-noir font-light">{title}</h2>
        <span className="h-px flex-1 max-w-20 bg-dore/40" aria-hidden />
      </div>
      {note ? (
        <p className="text-[11px] tracking-[0.3em] uppercase font-body text-taupe">{note}</p>
      ) : null}
    </div>
  );
}

/* ── Platos ── */

function MenuRow({ item }: { item: Item }) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        <h3 className="font-display text-xl text-noir font-light leading-snug">{item.name}</h3>
        <span className="flex-1 self-center h-px bg-noir/10" aria-hidden />
        {item.price ? (
          <span className="font-display text-lg text-dore-dark whitespace-nowrap">{item.price}</span>
        ) : null}
      </div>
      {item.desc ? (
        <p className="mt-1.5 pr-8 text-sm font-body font-light text-noir/55 leading-relaxed max-w-md">
          {item.desc}
        </p>
      ) : null}
    </div>
  );
}

function ItemList({ items, twoCols = false }: { items: Item[]; twoCols?: boolean }) {
  return (
    <div
      className={
        twoCols
          ? 'grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-9'
          : 'space-y-9 max-w-2xl mx-auto'
      }
    >
      {items.map((item) => (
        <MenuRow key={item.name} item={item} />
      ))}
    </div>
  );
}

/* ── Navegación de anclas ── */

function AnchorNav({ anchors }: { anchors: { id: string; label: string }[] }) {
  return (
    <nav className="sticky top-20 z-30 bg-creme/95 backdrop-blur-sm border-y border-dore/25 py-3.5 mb-16 flex flex-wrap items-center justify-center gap-y-1">
      {anchors.map((a, i) => (
        <Fragment key={a.id}>
          {i > 0 ? <Diamond className="mx-3 scale-[0.6] border-dore/60" /> : null}
          <button
            onClick={() => document.getElementById(a.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[11px] tracking-[0.2em] uppercase font-body text-noir/55 hover:text-dore-dark transition-colors duration-200"
          >
            {a.label}
          </button>
        </Fragment>
      ))}
    </nav>
  );
}

/* ── Bebidas & Vinos ── */

function BebidasPanel() {
  const t = useTranslations('carta.bebidas');
  const groups = ['cafes', 'tes', 'lattes', 'limonadas', 'smoothies'] as const;
  const wineGroups = (t.raw('vinos.groups') as WineGroup[]).filter((g) => g.items.length > 0);
  return (
    <div className="space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
        {groups.map((g) => {
          const group = t.raw(g) as { title: string; note?: string; items: Item[] };
          return (
            <section key={g} id={`bebidas-${g}`} className="scroll-mt-40">
              <h3 className="font-display italic text-2xl text-noir font-light">{group.title}</h3>
              <div className="w-8 h-px bg-dore/50 mt-2.5 mb-2.5" aria-hidden />
              {group.note ? (
                <p className="text-sm font-body font-light text-noir/55 mb-5">{group.note}</p>
              ) : (
                <div className="mb-5" />
              )}
              <div className="space-y-5">
                {group.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Vinos */}
      <section id="bebidas-vinos" className="scroll-mt-40">
        <SectionHeading title={t('vinos.title')} note={t('vinos.note')} />
        {wineGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
            {wineGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-display italic text-2xl text-noir font-light">{group.title}</h3>
                <div className="w-8 h-px bg-dore/50 mt-2.5 mb-5" aria-hidden />
                <div className="space-y-5">
                  {group.items.map((item) => (
                    <MenuRow key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="font-display italic text-xl text-noir/60 font-light max-w-md mx-auto leading-relaxed">
              {t('vinos.placeholder')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Enlace cruzado hacia Bebidas & Vinos ── */

function DrinkLink({ onGo }: { onGo: () => void }) {
  const t = useTranslations('carta.drinkLink');
  return (
    <div className="text-center pt-2">
      <Ornament />
      <p className="font-display italic text-2xl text-noir/75 font-light mt-7 mb-6">
        {t('question')}
      </p>
      <button
        onClick={onGo}
        className="inline-flex items-center px-9 py-3.5 border border-noir text-noir text-xs tracking-widest uppercase font-body hover:bg-noir hover:text-creme transition-all duration-300"
      >
        {t('cta')}
      </button>
    </div>
  );
}

/* ── Menú del Día ── */

function CourseHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className="h-px flex-1 max-w-12 bg-dore/40" aria-hidden />
      <h3 className="text-xs tracking-[0.3em] uppercase font-body text-dore-dark text-center">
        {title}
      </h3>
      <span className="h-px flex-1 max-w-12 bg-dore/40" aria-hidden />
    </div>
  );
}

function MenuDiaPanel() {
  const t = useTranslations('carta.menuDia');
  const courses = ['primeros', 'segundos', 'postres'] as const;
  return (
    <div className="max-w-3xl mx-auto border border-dore/50 p-1.5">
      <div className="border border-dore/25 px-6 sm:px-12 lg:px-16 py-14 lg:py-18">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.35em] uppercase font-body text-dore mb-4">
            {t('hours')}
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-noir font-light mb-7">
            {t('title')}
          </h2>
          <Ornament />
          <p className="mt-8">
            <span className="inline-block border border-dore/60 px-9 py-2.5 font-display text-3xl text-noir font-light">
              {t('price')}
            </span>
          </p>
        </div>

        <p className="text-[15px] font-body font-light text-noir/65 leading-relaxed text-center mb-14 max-w-xl mx-auto">
          {t('intro')}
        </p>

        <p className="font-display italic text-2xl text-noir/80 font-light text-center mb-12">
          {t('weekLabel')}
        </p>

        <div className="space-y-14">
          {courses.map((course) => (
            <div key={course}>
              <CourseHeading title={t(`${course}.title`)} />
              <div className="space-y-8 text-center">
                {(t.raw(`${course}.items`) as Dish[]).map((dish) => (
                  <div key={dish.name}>
                    <p className="font-display text-xl text-noir font-light leading-snug">
                      {dish.name}
                    </p>
                    {dish.desc ? (
                      <p className="mt-1.5 text-sm font-body font-light text-noir/60 leading-relaxed max-w-md mx-auto">
                        {dish.desc}
                      </p>
                    ) : null}
                    <p className="mt-1.5 text-[11px] font-body font-light text-taupe/85 leading-relaxed max-w-md mx-auto">
                      {dish.allergens}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-dore/40 bg-sable/40 px-6 py-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase font-body text-dore-dark mb-2.5">
            {t('incluye.title')}
          </p>
          <p className="font-display text-lg text-noir font-light">{t('incluye.text')}</p>
          <p className="mt-1.5 text-[11px] font-body font-light text-taupe/85">
            {t('incluye.allergens')}
          </p>
        </div>

        <p className="mt-10 text-xs font-body font-light text-taupe/85 leading-relaxed text-center max-w-lg mx-auto">
          {t('allergyNote')}
        </p>
      </div>
    </div>
  );
}

/* ── Página ── */

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

  const goBebidas = () => {
    selectTab('bebidas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs: { id: TabId; key: 'brunch' | 'menuDia' | 'principal' | 'bebidas' }[] = [
    { id: 'brunch', key: 'brunch' },
    { id: 'menu-dia', key: 'menuDia' },
    { id: 'principal', key: 'principal' },
    { id: 'bebidas', key: 'bebidas' },
  ];

  const brunchAnchors = [
    { id: 'brunch-salado', label: t('anchors.salado') },
    { id: 'brunch-dulce', label: t('anchors.dulce') },
  ];

  const principalAnchors = [
    { id: 'carta-empezar', label: t('anchors.empezar') },
    { id: 'carta-seguir', label: t('anchors.seguir') },
    { id: 'carta-hamburguesas', label: t('anchors.hamburguesas') },
    { id: 'carta-galettes', label: t('anchors.galettes') },
    { id: 'carta-postres', label: t('anchors.postres') },
  ];

  const bebidasAnchors = [
    { id: 'bebidas-cafes', label: t('anchors.cafes') },
    { id: 'bebidas-tes', label: t('anchors.tes') },
    { id: 'bebidas-lattes', label: t('anchors.lattes') },
    { id: 'bebidas-limonadas', label: t('anchors.limonadas') },
    { id: 'bebidas-smoothies', label: t('anchors.smoothies') },
    { id: 'bebidas-vinos', label: t('anchors.vinos') },
  ];

  const principalSections = ['empezar', 'seguir', 'hamburguesas', 'galettes', 'postres'] as const;

  const panelClass = (id: TabId) => (tab === id ? 'carta-panel' : 'hidden');

  return (
    <div className="min-h-screen pt-36 pb-28 bg-creme">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Cabecera editorial */}
        <header className="text-center mb-16">
          <p className="text-[11px] tracking-[0.4em] uppercase font-body text-dore mb-5">
            Amélie · Cuisine & Brunch
          </p>
          <h1 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-noir font-light mb-6">
            {t('title')}
          </h1>
          <p className="text-base font-body font-light text-noir/60 max-w-xl mx-auto leading-relaxed mb-8">
            {t('subtitle')}
          </p>
          <Ornament />
        </header>

        {/* Selector de momento */}
        <p className="font-display italic text-2xl text-noir/75 font-light text-center mb-8">
          {t('question')}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-20">
          {tabs.map(({ id, key }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => selectTab(id)}
                aria-pressed={active}
                className={`group p-1.5 border transition-colors duration-300 ${
                  active ? 'border-noir bg-noir' : 'border-noir/20 hover:border-dore/70'
                }`}
              >
                <span
                  className={`flex flex-col items-center justify-center gap-2 border px-3 py-5 lg:py-6 h-full transition-colors duration-300 ${
                    active ? 'border-dore/50' : 'border-transparent group-hover:border-dore/30'
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-[0.3em] uppercase font-body text-center ${
                      active ? 'text-dore' : 'text-taupe'
                    }`}
                  >
                    {t(`tabs.${key}.hours`)}
                  </span>
                  <span
                    className={`font-display italic text-xl lg:text-2xl font-light leading-tight text-center ${
                      active ? 'text-creme' : 'text-noir'
                    }`}
                  >
                    {t(`tabs.${key}.label`)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel: Desayunos & Brunch */}
        <div className={panelClass('brunch')}>
          <AnchorNav anchors={brunchAnchors} />
          <div className="space-y-24">
            <section id="brunch-salado" className="scroll-mt-40">
              <SectionHeading title={t('brunch.salado.title')} note={t('brunch.note')} />
              <ItemList items={t.raw('brunch.salado.items') as Item[]} twoCols />
            </section>
            <section id="brunch-dulce" className="scroll-mt-40">
              <SectionHeading title={t('brunch.dulce.title')} note={t('brunch.note')} />
              <ItemList items={t.raw('brunch.dulce.items') as Item[]} twoCols />
            </section>
            <DrinkLink onGo={goBebidas} />
          </div>
        </div>

        {/* Panel: Menú del Día */}
        <div className={panelClass('menu-dia')}>
          <MenuDiaPanel />
        </div>

        {/* Panel: Bebidas & Vinos */}
        <div className={panelClass('bebidas')}>
          <AnchorNav anchors={bebidasAnchors} />
          <BebidasPanel />
        </div>

        {/* Panel: La Carta */}
        <div className={panelClass('principal')}>
          <AnchorNav anchors={principalAnchors} />
          <div className="space-y-24">
            {principalSections.map((section) => {
              const data = t.raw(`principal.${section}`) as {
                title: string;
                note?: string;
                items: Item[];
              };
              return (
                <section key={section} id={`carta-${section}`} className="scroll-mt-40">
                  <SectionHeading title={data.title} note={data.note} />
                  <ItemList items={data.items} twoCols={data.items.length > 3} />
                </section>
              );
            })}
            <DrinkLink onGo={goBebidas} />
          </div>
        </div>

        {/* Pie */}
        <div className="mt-24 text-center">
          <Ornament />
          <p className="mt-6 text-[11px] tracking-[0.25em] uppercase font-body text-taupe">
            {t('igic')}
          </p>
        </div>
      </div>
    </div>
  );
}
