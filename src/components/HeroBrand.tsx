import Image from "next/image";

/** Hero lockup matched to the patriotic mockup: glowing crest + solid white wordmark. */
export function HeroBrand({ siteName }: { siteName: string }) {
  return (
    <div className="mt-5 flex max-w-[42rem] items-center gap-4 sm:gap-5">
      <div className="shrink-0 rounded-full p-1 shadow-[0_0_0_2px_rgba(0,212,255,0.85),0_0_28px_6px_rgba(0,212,255,0.45)]">
        <Image
          src="/images/brand-crest.png"
          alt=""
          width={220}
          height={200}
          priority
          className="h-24 w-auto object-contain sm:h-28 md:h-[8.5rem]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="flex items-center gap-2 font-condensed text-3xl font-bold italic tracking-[0.12em] text-[#e60000] sm:text-4xl md:text-5xl"
          style={{ textShadow: "0 2px 0 #7a0000, 0 0 18px rgba(230,0,0,0.45)" }}
        >
          <span className="flex flex-1 flex-col gap-1" aria-hidden>
            <span className="h-[2px] w-full bg-[#e60000]" />
            <span className="h-[2px] w-[85%] self-end bg-[#e60000]/80" />
            <span className="h-[2px] w-[70%] self-end bg-[#e60000]/60" />
          </span>
          STOP
          <span className="flex flex-1 flex-col gap-1" aria-hidden>
            <span className="h-[2px] w-full bg-[#e60000]" />
            <span className="h-[2px] w-[85%] bg-[#e60000]/80" />
            <span className="h-[2px] w-[70%] bg-[#e60000]/60" />
          </span>
        </p>
        <p
          className="mt-1 font-condensed text-[1.85rem] font-bold leading-[0.95] tracking-wide text-white sm:text-4xl md:text-[3.1rem]"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}
        >
          VETERANS ABUSE
        </p>
        <div className="mt-2.5 h-[3px] w-full bg-[#e60000]" aria-hidden />
        <p className="mt-2.5 flex items-center gap-2 font-condensed text-[0.7rem] font-semibold tracking-[0.28em] text-white uppercase sm:text-xs">
          <span className="h-px flex-1 bg-white/70" aria-hidden />
          Honour <span className="text-[#e60000]">★</span> Support{" "}
          <span className="text-[#e60000]">★</span> Protect
          <span className="h-px flex-1 bg-white/70" aria-hidden />
        </p>
        <h1 className="sr-only">{siteName}</h1>
      </div>
    </div>
  );
}
