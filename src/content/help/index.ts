import type { LongFormDoc } from "@/components/LongFormPage";
import { investigativeReporting } from "./investigative-reporting";
import { militaryFamilies } from "./military-families";
import { olderVeterans } from "./older-veterans";
import { mentalWellbeing } from "./mental-wellbeing";
import { whistleblowerDefense } from "./whistleblower-defense";
import { housingBarracks } from "./housing-barracks";
import { dodJoint } from "./dod-joint";
import { secureTipIntake } from "./secure-tip-intake";

export const helpDocs: LongFormDoc[] = [
  investigativeReporting,
  militaryFamilies,
  olderVeterans,
  mentalWellbeing,
  whistleblowerDefense,
  housingBarracks,
  dodJoint,
  secureTipIntake,
];

export function getHelpBySlug(slug: string) {
  return helpDocs.find((d) => d.slug === slug);
}
