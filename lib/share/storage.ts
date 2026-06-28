import fs from "fs/promises";
import path from "path";
import type { ResumeDraft } from "@/types/resume";

type ResumeShareRecord = {
  slug: string;
  createdAt: string;
  resume: ResumeDraft;
};

const STORAGE_FILE_NAME = ".resume-shares.json";
const STORAGE_PATH = path.join(process.cwd(), STORAGE_FILE_NAME);
const KV_KEY = "resume-shares";

async function getKVClient() {
  if (!process.env.VERCEL || !process.env.VERCEL_KV_URL) {
    return null;
  }

  try {
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

async function readShareRecords(): Promise<ResumeShareRecord[]> {
  const kv = await getKVClient();
  if (kv) {
    const records = await kv.get<ResumeShareRecord[]>(KV_KEY);
    return records ?? [];
  }

  try {
    const file = await fs.readFile(STORAGE_PATH, "utf-8");
    return JSON.parse(file) as ResumeShareRecord[];
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeShareRecords(records: ResumeShareRecord[]) {
  const kv = await getKVClient();
  if (kv) {
    await kv.set(KV_KEY, records);
    return;
  }

  await fs.writeFile(STORAGE_PATH, JSON.stringify(records, null, 2), "utf-8");
}

export async function getShareRecords(): Promise<ResumeShareRecord[]> {
  return await readShareRecords();
}

export async function saveShareRecord(record: ResumeShareRecord) {
  const records = await readShareRecords();
  records.push(record);
  await writeShareRecords(records);
}
