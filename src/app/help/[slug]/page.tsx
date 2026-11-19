import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LongFormPage } from "@/components/LongFormPage";
import { getHelpBySlug, helpDocs } from "@/content/help";

export function generateStaticParams() {
  return helpDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getHelpBySlug(slug);
  if (!doc) return { title: "How we help" };
  return { title: doc.title, description: doc.dek };
}

export default async function HelpTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getHelpBySlug(slug);
  if (!doc) notFound();
  return <LongFormPage doc={doc} />;
}
