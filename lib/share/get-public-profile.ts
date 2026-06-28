import type { ResumeDraft } from "@/types/resume";
import { getShareRecords } from "./storage";

export async function getPublicProfile(slug: string): Promise<ResumeDraft | null> {
  const records = await getShareRecords();
  const record = records.find((item) => item.slug === slug);
  return record?.resume ?? null;
}
