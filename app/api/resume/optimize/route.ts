import { NextResponse } from "next/server";
import { optimizeResumeDraft, ResumeOptimizationError } from "@/lib/openai/optimize-resume";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ error: "请求内容必须是一个对象。" }, { status: 400 });
    }

    const result = await optimizeResumeDraft(payload as Parameters<typeof optimizeResumeDraft>[0]);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ResumeOptimizationError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "请求内容不是有效的 JSON。" }, { status: 400 });
    }

    const message = error instanceof Error && error.message.includes("OPENAI_API_KEY") ? "请先配置 OPENAI_API_KEY 环境变量。" : "AI 优化暂时不可用，请稍后重试。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
