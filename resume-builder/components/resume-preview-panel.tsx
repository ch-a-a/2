import { ResumePreview } from "@/components/resume/resume-preview";
import type { ResumeDraft } from "@/types/resume";

export function ResumePreviewPanel({ draft }: { draft: ResumeDraft }) {
  return (
    <div className="rounded-[32px] border border-slate-800/70 bg-slate-950/95 p-4 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] transition duration-300 motion-safe:animate-fade-in-up">
      <div className="mb-4 flex flex-col gap-4 rounded-[24px] bg-slate-900/90 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">实时预览</p>
          <p className="mt-1 text-lg font-semibold">当前简历实时渲染</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-slate-300">
          <span className="rounded-full bg-slate-800/70 px-3 py-1">关键词校验</span>
          <span className="rounded-full bg-slate-800/70 px-3 py-1">格式预览</span>
          <span className="rounded-full bg-teal-400/15 px-3 py-1 text-teal-200">自动同步</span>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-3 border-b border-white/10 pb-4 text-xs text-slate-400">
        <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">A4 纵向</span>
        <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">单页优先</span>
        <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">ATS 友好</span>
      </div>
      <div className="mb-4 rounded-[22px] border border-slate-800/75 bg-slate-950/80 p-4 text-slate-300 shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
        <p className="text-sm font-medium text-white">预览说明</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          内容会自动更新到预览中，建议保持一页清晰输出，便于后续 PDF 导出和分享链接展示。
        </p>
      </div>
      <ResumePreview draft={draft} />
    </div>
  );
}
