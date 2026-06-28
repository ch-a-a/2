import { useState } from "react";
import { defaultResumeDraft } from "../schemas/default-resume-draft";
import type { ResumeDraft } from "@/types/resume";

export function useResumeDraft(initialDraft: ResumeDraft = defaultResumeDraft) {
  return useState<ResumeDraft>(initialDraft);
}
