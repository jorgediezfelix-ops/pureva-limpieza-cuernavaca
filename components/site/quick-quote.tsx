'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { currency, extrasList, propertyOptions } from '@/lib/content';
import { business } from '@/lib/site';

export function QuickQuote() {
  const [property, setProperty] = useState('hogar');
  const [area, setArea] = useState(80);
  const [bathrooms, setBathrooms] = useState(2);
  const [service, setService] = useState('regular');
  const [frequency, setFrequency] = useState('unica');
  const [extras, setExtras] = useState<string[]>([]);
  const [folio, setFolio] = useState('');

  const estimate = useMemo(() => {
    const base: Record<string, number> = {
      hogar: 220,
      oficina: 460,
      comercio: 520,
      condominio: 630,
      airbnb: 300,
    };
    const areaRate: Record<string, number> = {
      hogar: 4,
      oficina: 5.2,
      comercio: 5.6,
      condominio: 5.8,
      airbnb: 4.4,
    };
    const serviceFactor: Record<string, number> = { regular: 1, profunda: 1.42, mudanza: 1.64 };
    const frequencyFactor: Record<string, number> = { unica: 1, semanal: 0.9, quincenal: 0.94, mensual: 0.97 };
    const raw = (base[property] + area * areaRate[property] + bathrooms * 75 + extras.length * 160) * serviceFactor[service] * frequencyFactor[frequency];
    return Math.max(590, Math.round(raw / 10) * 10);
  }, [area, bathrooms, extras.length, frequency, property, service]);

  function toggleExtra(extra: string) {
    setExtras((current) =>
      current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra],
    );
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFolio(`PV-${String(Date.now()).slice(-6)}`);
  }

  if (folio) {
    return (
      <div className="grid min-h-[580px] place-items-center rounded-[30px] border border-white/15 bg-white p-7 text-center shadow-[0_40px_90px_rgba(2,24,42,.45)] sm:p-10">
        <div className="max-w-md">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#def8f0] to-[#c9f2e6] text-[#078c72] shadow-inner">
            <CheckCircle2 className="size-10" />
          </span>
          <p className="mt-7 text-xs font-black uppercase tracking-[.18em] text-[#0b978e]">Solicitud recibida</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-[#07345b]">Tu cotización está en camino</h3>
          <p className="mt-4 leading-7 text-[#5c7485]">
            Folio <strong className="text-[#0d4b69]">{folio}</strong>. Confirmaremos disponibilidad y precio final contigo por WhatsApp.
          </p>
          <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#eff9fa] to-[#e6f6f4] p-5">
            <span className="text-sm font-bold text-[#668091]">Estimación actual</span>
            <strong className="mt-1 block text-3xl font-extrabold text-[#073c64]">{currency.format(estimate)}</strong>
          </div>
          <Button
            nativeButton={false}
            className="btn-shine mt-7 h-13 w-full rounded-full bg-gradient-to-r from-[#08a884] to-[#0bbf8c] px-6 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(8,168,132,.32)] hover:brightness-[1.06]"
            render={<a href={business.whatsappUrl} />}
          >
            <MessageCircle className="size-5" /> Confirmar por WhatsApp
          </Button>
          <button className="mt-5 text-sm font-bold text-[#5c7485] hover:text-[#087e8e]" onClick={() => setFolio('')} type="button">
            Crear otra cotización
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitQuote}
      className="rounded-[30px] border border-white/15 bg-white p-6 text-[#123c58] shadow-[0_40px_90px_rgba(2,24,42,.45)] sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4eef0] pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-[.16em] text-[#0b978e]">Cotizador inteligente</span>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#07345b]">Configura tu servicio</h3>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-[#eaf8fa] to-[#e2f6f2] px-4 py-2 text-right ring-1 ring-[#d2ecec]">
          <span className="block text-[.65rem] font-black uppercase tracking-[.14em] text-[#708794]">Estimación</span>
          <strong className="text-xl font-extrabold text-[#087d91]">{currency.format(estimate)}</strong>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-extrabold">1. Tipo de espacio</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {propertyOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              className={`property-choice ${property === value ? 'property-choice-active' : ''}`}
              onClick={() => setProperty(value)}
              type="button"
              aria-pressed={property === value}
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="quote-field">
          <span>Superficie aproximada</span>
          <span className="quote-input-wrap">
            <input min="20" max="3000" value={area} onChange={(event) => setArea(Number(event.target.value))} type="number" required />
            <small>m²</small>
          </span>
        </label>
        <label className="quote-field">
          <span>Número de baños</span>
          <span className="quote-input-wrap">
            <input min="1" max="30" value={bathrooms} onChange={(event) => setBathrooms(Number(event.target.value))} type="number" required />
            <small>baños</small>
          </span>
        </label>
        <label className="quote-field">
          <span>Tipo de servicio</span>
          <select value={service} onChange={(event) => setService(event.target.value)}>
            <option value="regular">Limpieza regular</option>
            <option value="profunda">Limpieza profunda</option>
            <option value="mudanza">Mudanza / entrega</option>
          </select>
        </label>
        <label className="quote-field">
          <span>Frecuencia</span>
          <select value={frequency} onChange={(event) => setFrequency(event.target.value)}>
            <option value="unica">Servicio único</option>
            <option value="semanal">Cada semana · ahorra 10%</option>
            <option value="quincenal">Cada 15 días · ahorra 6%</option>
            <option value="mensual">Cada mes · ahorra 3%</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-extrabold">2. ¿Quieres agregar algo más?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {extrasList.map((extra) => {
            const selected = extras.includes(extra);
            return (
              <button
                key={extra}
                type="button"
                onClick={() => toggleExtra(extra)}
                aria-pressed={selected}
                className={`extra-choice ${selected ? 'extra-choice-active' : ''}`}
              >
                <span>{selected ? <Check className="size-4" /> : <Sparkles className="size-4" />}</span>
                {extra}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 border-t border-[#e4eef0] pt-6 sm:grid-cols-3">
        <label className="quote-field">
          <span>Nombre</span>
          <input className="standalone-input" placeholder="Tu nombre" required />
        </label>
        <label className="quote-field">
          <span>WhatsApp</span>
          <input className="standalone-input" inputMode="tel" placeholder="777 000 0000" required />
        </label>
        <label className="quote-field">
          <span>Fecha preferida</span>
          <input className="standalone-input" type="date" required />
        </label>
      </div>

      <div className="mt-7 flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-br from-[#eff9fa] to-[#e8f6f3] p-5 ring-1 ring-[#dbeeee] sm:flex-row">
        <div>
          <span className="block text-xs font-black uppercase tracking-[.13em] text-[#6a8291]">Precio aproximado desde</span>
          <strong className="mt-1 block text-3xl font-extrabold tracking-tight text-[#073c64]">{currency.format(estimate)} MXN</strong>
          <span className="text-xs font-semibold text-[#758a98]">El precio final se confirma antes de reservar.</span>
        </div>
        <Button
          type="submit"
          className="btn-shine h-14 w-full rounded-full bg-gradient-to-r from-[#08a884] to-[#0cc08d] px-7 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(8,168,132,.3)] transition hover:-translate-y-0.5 hover:brightness-[1.06] sm:w-auto"
        >
          Solicitar cotización <ArrowRight className="size-5" />
        </Button>
      </div>
    </form>
  );
}
