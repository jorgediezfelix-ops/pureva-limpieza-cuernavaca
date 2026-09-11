import { asset } from '@/lib/site';

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* Isotipo de la marca. El alt va vacío: el nombre accesible lo aporta el
          texto contiguo, así los lectores de pantalla no lo anuncian dos veces. */}
      <img
        src={asset('/logo-mark.png')}
        alt=""
        width={256}
        height={256}
        className="size-11 shrink-0 object-contain"
        decoding="async"
      />
      <span>
        <span
          className={`block font-display text-[1.28rem] font-extrabold tracking-[.18em] transition-colors duration-300 ${
            inverted ? 'text-white' : 'text-[#07345b]'
          }`}
        >
          PUREVA
        </span>
        <span
          className={`block text-[.58rem] font-bold uppercase tracking-[.24em] transition-colors duration-300 ${
            inverted ? 'text-[#7ce4de]' : 'text-[#129bb0]'
          }`}
        >
          Limpieza profesional
        </span>
      </span>
    </span>
  );
}
