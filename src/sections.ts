import type { SectionId } from "./types";

export function sectionsWithSupportMode(
  sections: readonly SectionId[],
  showSupportMode: boolean,
): SectionId[] {
  if (!showSupportMode || sections.includes("support")) {
    return [...sections];
  }

  const next = [...sections];
  const diagnosticsIndex = next.indexOf("diagnostics");
  const actionsIndex = next.indexOf("actions");
  const insertIndex =
    diagnosticsIndex >= 0
      ? diagnosticsIndex + 1
      : actionsIndex >= 0
        ? actionsIndex
        : next.length;
  next.splice(insertIndex, 0, "support");
  return next;
}
