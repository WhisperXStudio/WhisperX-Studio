import registry from "@/data/whisperx-registry.json";
import designSpec from "@/global-tw4-master.v7.full-spec.json";

export type Status = "IMPLEMENTED"|"CONNECTED"|"PARTIAL"|"SIMULATED"|"PLACEHOLDER"|"PLANNED"|"BLOCKED"|"UNSUPPORTED"|"DEPRECATED"|"REMOVED";
export type SkillRecord = (typeof registry.skills)[number];
export type LibraryItem = (typeof registry.library)[number];

export const statusOrder: Status[] = ["IMPLEMENTED","CONNECTED","PARTIAL","SIMULATED","PLACEHOLDER","PLANNED","BLOCKED","UNSUPPORTED","DEPRECATED","REMOVED"];

export function getRegistry() { return registry; }
export function getDesignSpecSummary() {
  return { id: designSpec.id, version: designSpec.version, target: designSpec.meta.target.slice(0, 6), standards: designSpec.meta.standards.slice(0, 6), locks: designSpec.meta.locks };
}
export function getLibraryItem(id: string) { return registry.library.find((item) => item.id === id); }
export function getRelatedSkills(item: LibraryItem) { return registry.skills.filter((skill) => item.related.includes(skill.id)); }
export function classifyStatus(status: Status) { return statusOrder.includes(status) ? status : "BLOCKED"; }
export function buildInstallPlan(skillId: string) {
  const skill = registry.skills.find((entry) => entry.id === skillId);
  if (!skill) return null;
  return { skillId, status: skill.status as Status, dependencies: skill.dependencies, conflictDetection: "CONNECTED", duplicateDetection: "CONNECTED", safeWriteRoots: skill.safeWrites, rollback: skill.safeWrites.length ? "PARTIAL" : "UNSUPPORTED" };
}
