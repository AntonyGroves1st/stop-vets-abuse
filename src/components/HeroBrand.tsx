import Image from "next/image";
import { images } from "@/lib/images";

/** Full patriotic lockup — crest + STOP VETERANS ABUSE wordmark. */
export function HeroBrand({ siteName }: { siteName: string }) {
  return (
    <div className="mt-5 max-w-[40rem]">
      <Image
        src={images.brandBannerHero.src}
        alt={images.brandBannerHero.alt}
        width={1024}
        height={348}
        priority
        className="h-auto w-full max-w-[min(100%,36rem)] object-contain object-left drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)]"
      />
      <h1 className="sr-only">{siteName}</h1>
    </div>
  );
}
