import type { ResumeDraft } from "@/types/resume";
import { saveShareRecord } from "./storage";

function createSlug(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const suffix = Math.random().toString(36).slice(2, 7);
  return base ? `${base}-${suffix}` : `resume-${suffix}`;
}

export async function createPublicProfile(draft: ResumeDraft) {
  const slug = createSlug(draft.basics.name || "公开简历");
  await saveShareRecord({
    slug,
    createdAt: new Date().toISOString(),
    resume: draft
  });
  return slug;
}
