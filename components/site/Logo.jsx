import Image from "next/image";

/** NamDTU emblemasi va kafedra nomi. `inverted` — to'q fon uchun. */
export default function Logo({ inverted = false }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`shrink-0 rounded-full ${inverted ? "bg-white p-0.5" : ""}`}>
        <Image
          src="/images/namdtu-logo.png"
          alt="Namangan davlat texnika universiteti logotipi"
          width={48}
          height={48}
          className="size-12"
        />
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-[17px] font-semibold ${inverted ? "text-white" : "text-brand-950"}`}>
          Axborot tizimlari va texnologiyalari
        </span>
        <span className={`label-caps mt-0.5 block text-[10.5px] ${inverted ? "text-brand-300" : "text-slate-500"}`}>
          Kafedrasi · NamDTU
        </span>
      </span>
    </span>
  );
}
