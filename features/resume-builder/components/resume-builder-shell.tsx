"use client";

import { useState } from "react";
import { ResumePreviewPanel } from "./resume-preview-panel";
import { ResumeForm } from "./resume-form";
import { defaultResumeDraft } from "../schemas/default-resume-draft";
import type { ResumeDraft } from "@/types/resume";

export function ResumeBuilderShell() {
  const [draft, setDraft] = useState<ResumeDraft>(defaultResumeDraft);

  return (
    <section className="container py-8 lg:py-10">
      <div className="mb-6 overflow-hidden rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-[0_30px_120px_rgba(15,23,42,0.22)]">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-300">AI Resume Studio</p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">用更优雅的流程完成简历制作</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              结构化填写、AI 优化与实时预览一体化，帮助你快速生成更适合投递的简历。
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-300 sm:justify-end">
            <div className="rounded-3xl border border-white/10 bg-white/10 px-4 py-3">实时保存</div>
            <div className="rounded-3xl border border-white/10 bg-white/10 px-4 py-3">导出 PDF</div>
            <div className="rounded-3xl border border-white/10 bg-white/10 px-4 py-3">分享主页</div>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/10 px-4 py-3 text-center text-sm text-slate-200">AI 建议实时生效</div>
          <div className="rounded-3xl bg-white/10 px-4 py-3 text-center text-sm text-slate-200">简历结构推荐</div>
          <div className="rounded-3xl bg-white/10 px-4 py-3 text-center text-sm text-slate-200">导出无缝连接</div>
        </div>
        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-4 text-sm text-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.12)] backdrop-blur">
          <p className="font-medium text-white">上次同步</p>
          <p className="mt-1 leading-6 text-slate-300">你的编辑会在预览区实时反映。准备好后，一键导出 PDF 或发布公开简历。</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:gap-8">
        <div className="space-y-4">
          <div className="rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition-all duration-300 motion-safe:animate-fade-in-up hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950/90">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-teal-500">工作台</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-950 dark:text-white">实时构建 · 同步预览</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">左侧填写简历内容，右侧预览会即时更新，感受更轻柔的产品级操作体验。</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-900 dark:bg-slate-800 dark:text-slate-100">Auto save</span>
                <span className="rounded-full bg-teal-400/15 px-3 py-1 text-teal-200">Live sync</span>
              </div>
            </div>
            <ResumeForm draft={draft} onDraftChange={setDraft} />
          </div>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <ResumePreviewPanel draft={draft} />
        </div>
      </div>
    </section>
  );
}
