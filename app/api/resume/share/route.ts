import { NextResponse } from "next/server";
import { createPublicProfile } from "@/lib/share/create-public-profile";
import type { ResumeDraft } from "@/types/resume";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ error: "请求内容必须是一个对象。" }, { status: 400 });
    }

    const slug = await createPublicProfile(payload as ResumeDraft);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
    const shareUrl = `${baseUrl}/resume/${slug}`;

    return NextResponse.json({ slug, url: shareUrl });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "无法创建分享页，请稍后重试。" }, { status: 500 });
  }
}
