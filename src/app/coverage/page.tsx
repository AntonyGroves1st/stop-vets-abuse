import type { Metadata } from "next";
import { LongFormPage } from "@/components/LongFormPage";
import { coverageDoc } from "@/content/coverage";

export const metadata: Metadata = {
  title: "Coverage",
  description: coverageDoc.dek,
};

export default function CoveragePage() {
  return <LongFormPage doc={coverageDoc} />;
}
