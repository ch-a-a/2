import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileText,
  Globe2,
  Layers3,
  LockKeyhole,
  Share2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "ATS 友好的内容结构",
  "面向岗位的表达优化",
  "在线预览与分享主页"
];

const features = [
  {
    title: "结构化填写",
    description: "按基础信息、工作经历、项目经历与技能亮点组织内容，避免遗漏关键经历。",
    icon: FileText
  },
  {
    title: "AI 优化表达",
    description: "把普通描述改写成更清晰、更结果导向、适合招聘筛选的表达。",
    icon: Sparkles
  },
  {
    title: "实时预览",
    description: "填写时同步查看版式与内容层级，减少来回修改的成本。",
    icon: Layers3
  },
  {
    title: "PDF 导出",
    description: "为投递场景准备稳定格式，方便上传招聘平台或直接发送给 HR。",
    icon: Download
  },
  {
    title: "个人主页",
    description: "生成可分享的公开简历页面，让作品、项目和经历更容易被打开。",
    icon: Share2
  },
  {
    title: "可扩展账户体系",
    description: "为登录、版本管理和云端保存预留清晰的产品路径。",
    icon: LockKeyhole
  }
];

const steps = [
  { label: "填写", text: "输入个人信息、经历与项目背景" },
  { label: "优化", text: "用 AI 强化表达和重点" },
  { label: "预览", text: "检查版式、层级与可读性" },
  { label: "分享", text: "导出 PDF 或发布个人主页" }
];

export default function HomePage() {
  return (
    <div className="bg-transparent">
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.16),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#111827_45%,_#172033_100%)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.12),_transparent_24%)]" />
        <div className="container relative grid min-h-[calc(100vh-64px)] gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-100 backdrop-blur">
              <BriefcaseBusiness className="h-4 w-4 text-teal-300" />
              为求职者打造的 AI 简历工具
            </div>
            <div className="mt-6 space-y-5">
              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                更快写出一份让人愿意点开的简历
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                从内容填写、AI 润色、实时预览到 PDF 导出和个人主页分享，把简历制作流程收进一个更干净、更高效的工作台。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                <Link href="/builder">
                  开始创建简历
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Link href="/resume/demo">查看分享效果</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200 backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-[0_25px_80px_rgba(2,8,23,0.35)] backdrop-blur">
            <div className="rounded-[24px] border border-white/10 bg-slate-900/85 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">实时预览</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">产品经理简历</h2>
                </div>
                <span className="rounded-full bg-teal-400/15 px-3 py-1 text-sm font-medium text-teal-200">AI Ready</span>
              </div>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="h-3 w-32 rounded bg-white/90" />
                  <div className="mt-3 grid gap-2">
                    <div className="h-2.5 rounded bg-slate-700" />
                    <div className="h-2.5 w-11/12 rounded bg-slate-700" />
                    <div className="h-2.5 w-4/5 rounded bg-slate-700" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                    <div className="h-3 w-24 rounded bg-amber-400" />
                    <div className="space-y-2">
                      <div className="h-2.5 rounded bg-slate-700" />
                      <div className="h-2.5 rounded bg-slate-700" />
                      <div className="h-2.5 w-3/4 rounded bg-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                    <div className="h-3 w-20 rounded bg-rose-400" />
                    <div className="flex flex-wrap gap-2">
                      <span className="h-7 w-16 rounded-full bg-slate-700" />
                      <span className="h-7 w-20 rounded-full bg-slate-700" />
                      <span className="h-7 w-14 rounded-full bg-slate-700" />
                      <span className="h-7 w-24 rounded-full bg-slate-700" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-teal-400/20 bg-teal-400/10 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 text-teal-300" />
                    <div>
                      <p className="font-medium text-white">AI 优化建议</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        将职责描述改为结果导向表达，突出指标、影响范围和使用的方法。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container py-14 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-teal-700">核心能力</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-950">从草稿到投递，一条流程完成</h2>
          <p className="mt-3 leading-7 text-slate-600">
            围绕简历制作的关键路径设计，让填写、优化、预览和分享都保持顺手。
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
                <Icon className="h-5 w-5 text-teal-700" />
                <h3 className="mt-4 text-lg font-medium text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="border-y border-slate-200/80 bg-slate-50/80">
        <div className="container py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-medium text-teal-700">工作流程</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-950">四步完成一份可投递简历</h2>
              <p className="mt-3 leading-7 text-slate-600">
                每一步都服务于真实投递场景，帮助你把经历整理成更容易被理解的表达。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((step, index) => (
                <div key={step.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <h3 className="font-medium text-slate-950">{step.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 sm:py-16">
        <div className="grid gap-6 rounded-[32px] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-teal-200">
              <Globe2 className="h-4 w-4" />
              准备开始
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">先创建第一份简历草稿</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              先把经历整理成一版清晰草稿，再继续优化措辞、版式和分享方式。
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="border-white/20 bg-white text-slate-950 hover:bg-slate-100">
            <Link href="/builder">
              进入简历工作台
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
