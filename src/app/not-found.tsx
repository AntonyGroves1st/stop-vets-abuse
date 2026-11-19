import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-28 text-center md:px-8">
      <p className="text-xs tracking-[0.22em] text-aluminum uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-slate">This file was never filed — or it moved.</p>
      <Link href="/" className="mt-8 inline-block bg-ink px-5 py-3 text-sm text-bone">
        Return home
      </Link>
    </div>
  );
}
