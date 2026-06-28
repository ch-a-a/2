import { resumeDraftSchema } from "@/features/resume-builder/schemas/resume-schema";
import type { ResumeDraft, ResumeOptimizationResult } from "@/types/resume";
import { createOpenAIClient } from "./client";

const systemPrompt = [
  "You are an expert resume editor for Chinese and bilingual technology candidates.",
  "Improve resume wording for clarity, impact, ATS readability, and job relevance.",
  "Preserve all factual data, IDs, dates, contact details, URLs, schools, companies, and technologies.",
  "Do not invent metrics, employers, degrees, or experience. If a metric is missing, use stronger but factual wording.",
  "Return only valid JSON. Do not wrap the JSON in markdown."
].join(" ");

const outputContract = {
  draft: "ResumeDraft with the exact same object shape as the input",
  suggestions: ["One short Chinese suggestion explaining an important improvement"]
};

export class ResumeOptimizationError extends Error {
  constructor(message: string, public statusCode = 500) {
    super(message);
    this.name = "ResumeOptimizationError";
  }
}

function hasContent(draft: ResumeDraft) {
  const searchable = [draft.basics.name, draft.basics.title, draft.summary, ...draft.experiences.flatMap((item) => [item.company, item.role, ...item.highlights]), ...draft.projects.flatMap((item) => [item.name, item.description, ...item.highlights]), ...draft.skills];
  return searchable.some((value) => value.trim().length > 0);
}

function parseJsonObject(content: string) {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("No JSON object found.");
  return JSON.parse(content.slice(start, end + 1)) as unknown;
}

function pickSuggestions(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").slice(0, 5);
}

export async function optimizeResumeDraft(rawDraft: ResumeDraft): Promise<ResumeOptimizationResult> {
  const validation = resumeDraftSchema.safeParse(rawDraft);
  if (!validation.success) throw new ResumeOptimizationError("简历内容格式不正确，请检查邮箱、字段长度和列表内容。", 400);

  const draft = validation.data;
  if (!hasContent(draft)) throw new ResumeOptimizationError("请先填写一些简历内容，再使用 AI 优化。", 400);

  const client = createOpenAIClient();
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_RESUME_MODEL ?? "gpt-4o-mini",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: JSON.stringify({
          task: "Optimize this resume draft. Keep the same schema and IDs. Improve summary, experience highlights, project description, and project highlights. Keep output concise and professional in Chinese unless the original field is clearly English.",
          outputContract,
          draft
        })
      }
    ]
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new ResumeOptimizationError("OpenAI 没有返回可用内容，请稍后重试。", 502);

  let parsed: unknown;
  try {
    parsed = parseJsonObject(content);
  } catch {
    throw new ResumeOptimizationError("AI 返回内容无法解析，请稍后重试。", 502);
  }

  const result = parsed as { draft?: unknown; suggestions?: unknown };
  const optimizedDraft = resumeDraftSchema.safeParse(result.draft);
  if (!optimizedDraft.success) throw new ResumeOptimizationError("AI 返回的简历格式不符合预期，请稍后重试。", 502);

  return { status: "optimized", draft: optimizedDraft.data, suggestions: pickSuggestions(result.suggestions) };
}
