import Image from "next/image";

/** Hero lockup: crest art + guaranteed solid-white wordmark (no 50/50 V). */
export function HeroBrand({ siteName }: { siteName: string }) {
  return (
    <div className="mt-5 flex max-w-[40rem] items-center gap-3 sm:gap-4">
      <Image
        src="/images/brand-crest.png"
        alt=""
        width={220}
        height={200}
        priority
        className="h-24 w-auto shrink-0 object-contain sm:h-28 md:h-32"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-condensed text-2xl font-bold italic tracking-[0.08em] text-flag-red sm:text-3xl md:text-4xl">
          <span className="h-px flex-1 bg-flag-red/80" aria-hidden />
          STOP
          <span className="h-px flex-1 bg-flag-red/80" aria-hidden />
        </p>
        <p className="font-condensed text-[1.65rem] font-bold leading-none tracking-wide text-white sm:text-4xl md:text-[2.75rem]">
          VETERANS ABUSE
        </p>
        <div className="mt-2 h-px w-full bg-flag-red" aria-hidden />
        <p className="mt-2 flex items-center gap-2 font-condensed text-[0.65rem] font-semibold tracking-[0.22em] text-white uppercase sm:text-xs">
          <span className="h-px flex-1 bg-white/50" aria-hidden />
          Honour <span className="text-flag-red">★</span> Support{" "}
          <span className="text-flag-red">★</span> Protect
          <span className="h-px flex-1 bg-white/50" aria-hidden />
        </p>
        <h1 className="sr-only">{siteName}</h1>
      </div>
    </div>
  );
}
