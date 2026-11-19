import type { Metadata } from "next";
import { LongFormPage } from "@/components/LongFormPage";
import { missionDoc } from "@/content/mission";

export const metadata: Metadata = {
  title: "Mission",
  description: missionDoc.dek,
};

export default function MissionPage() {
  return <LongFormPage doc={missionDoc} />;
}
