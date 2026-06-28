"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, GraduationCap, LinkIcon, Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeDraft, ResumeEducation, ResumeExperience, ResumeOptimizationResult, ResumeProject } from "@/types/resume";

type ResumeFormProps = {
  draft: ResumeDraft;
  onDraftChange: (draft: ResumeDraft) => void;
};

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
};

type TextareaProps = FieldProps & {
  rows?: number;
};

type ExperienceEntryProps = {
  experience: ResumeExperience;
  index: number;
  canRemove: boolean;
  onUpdate: (id: string, patch: Partial<ResumeExperience>) => void;
  onHighlightChange: (id: string, index: number, value: string) => void;
  onRemove: (id: string) => void;
};

type ProjectEntryProps = {
  project: ResumeProject;
  index: number;
  canRemove: boolean;
  onUpdate: (id: string, patch: Partial<ResumeProject>) => void;
  onHighlightChange: (id: string, index: number, value: string) => void;
  onTechnologiesChange: (projectId: string, value: string) => void;
  onRemove: (id: string) => void;
};

type EducationEntryProps = {
  item: ResumeEducation;
  index: number;
  canRemove: boolean;
  onUpdate: (id: string, patch: Partial<ResumeEducation>) => void;
  onRemove: (id: string) => void;
};

function createId(prefix: string) {
  const generatedId = globalThis.crypto?.randomUUID?.();
  if (generatedId) return prefix + "-" + generatedId;
  return prefix + "-" + Math.random().toString(36).slice(2, 9);
}

function Field({ label, value, placeholder, type = "text", onChange }: FieldProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
      {label}
      <input
        type={type}
        className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white/90 px-3 text-sm font-medium text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-teal-400"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function Textarea({ label, value, placeholder, rows = 4, onChange }: TextareaProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
      {label}
      <textarea
        rows={rows}
        className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-3 text-sm font-medium leading-6 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-teal-400"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-[26px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 motion-safe:animate-fade-in-up hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950/85">
      <div>
        <h2 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ExperienceEntry({ experience, index, canRemove, onUpdate, onHighlightChange, onRemove }: ExperienceEntryProps) {
  return (
    <div className="space-y-4 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-200 hover:border-teal-300 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <BriefcaseBusiness className="h-4 w-4 text-teal-700" />
          工作经历 {index + 1}
        </div>
        {canRemove ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(experience.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            删除
          </Button>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="公司" value={experience.company} onChange={(value) => onUpdate(experience.id, { company: value })} placeholder="例如：Acme Inc." />
        <Field label="职位" value={experience.role} onChange={(value) => onUpdate(experience.id, { role: value })} placeholder="例如：高级前端工程师" />
        <Field label="开始时间" value={experience.startDate} onChange={(value) => onUpdate(experience.id, { startDate: value })} placeholder="2022.03" />
        <Field label="结束时间" value={experience.endDate} onChange={(value) => onUpdate(experience.id, { endDate: value })} placeholder="至今 / 2025.06" />
        <Field label="地点" value={experience.location} onChange={(value) => onUpdate(experience.id, { location: value })} placeholder="北京 / 远程" />
      </div>
      <Textarea label="亮点 1" value={experience.highlights[0] ?? ""} onChange={(value) => onHighlightChange(experience.id, 0, value)} placeholder="例如：主导重构核心投递流程，将页面加载时间降低 42%。" rows={3} />
      <Textarea label="亮点 2" value={experience.highlights[1] ?? ""} onChange={(value) => onHighlightChange(experience.id, 1, value)} placeholder="例如：搭建组件库，支撑 6 条业务线复用。" rows={3} />
    </div>
  );
}

function ProjectEntry({ project, index, canRemove, onUpdate, onHighlightChange, onTechnologiesChange, onRemove }: ProjectEntryProps) {
  return (
    <div className="space-y-4 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-200 hover:border-teal-300 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <LinkIcon className="h-4 w-4 text-teal-700" />
          项目经历 {index + 1}
        </div>
        {canRemove ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(project.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            删除
          </Button>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="项目名称" value={project.name} onChange={(value) => onUpdate(project.id, { name: value })} placeholder="例如：AI Resume Builder" />
        <Field label="项目链接" value={project.url} onChange={(value) => onUpdate(project.id, { url: value })} placeholder="https://project.com" />
      </div>
      <Textarea label="项目简介" value={project.description} onChange={(value) => onUpdate(project.id, { description: value })} placeholder="说明项目目标、你的角色和核心结果。" rows={3} />
      <Textarea label="项目亮点" value={project.highlights[0] ?? ""} onChange={(value) => onHighlightChange(project.id, 0, value)} placeholder="例如：集成 OpenAI API 自动生成简历优化建议。" rows={3} />
      <Field label="技术栈" value={project.technologies.join(", ")} onChange={(value) => onTechnologiesChange(project.id, value)} placeholder="Next.js, TypeScript, Tailwind CSS" />
    </div>
  );
}

function EducationEntry({ item, index, canRemove, onUpdate, onRemove }: EducationEntryProps) {
  return (
    <div className="space-y-4 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-200 hover:border-teal-300 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <GraduationCap className="h-4 w-4 text-teal-700" />
          教育经历 {index + 1}
        </div>
        {canRemove ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(item.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            删除
          </Button>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="学校" value={item.school} onChange={(value) => onUpdate(item.id, { school: value })} placeholder="例如：上海交通大学" />
        <Field label="学历" value={item.degree} onChange={(value) => onUpdate(item.id, { degree: value })} placeholder="本科 / 硕士" />
        <Field label="专业" value={item.major} onChange={(value) => onUpdate(item.id, { major: value })} placeholder="计算机科学与技术" />
        <Field label="开始时间" value={item.startDate} onChange={(value) => onUpdate(item.id, { startDate: value })} placeholder="2018.09" />
        <Field label="结束时间" value={item.endDate} onChange={(value) => onUpdate(item.id, { endDate: value })} placeholder="2022.06" />
      </div>
    </div>
  );
}

export function ResumeForm({ draft, onDraftChange }: ResumeFormProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeMessage, setOptimizeMessage] = useState("");
  const [optimizeError, setOptimizeError] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  const updateBasics = useCallback((key: keyof ResumeDraft["basics"], value: string) => {
    onDraftChange({ ...draft, basics: { ...draft.basics, [key]: value } });
  }, [draft, onDraftChange]);

  const updateExperience = useCallback((id: string, patch: Partial<ResumeExperience>) => {
    onDraftChange({ ...draft, experiences: draft.experiences.map((experience) => experience.id === id ? { ...experience, ...patch } : experience) });
  }, [draft, onDraftChange]);

  const updateExperienceHighlight = useCallback((id: string, index: number, value: string) => {
    onDraftChange({
      ...draft,
      experiences: draft.experiences.map((experience) => {
        if (experience.id !== id) return experience;
        const highlights = [...experience.highlights];
        highlights[index] = value;
        return { ...experience, highlights };
      })
    });
  }, [draft, onDraftChange]);

  const addExperience = useCallback(() => {
    onDraftChange({ ...draft, experiences: [...draft.experiences, { id: createId("exp"), company: "", role: "", startDate: "", endDate: "", location: "", highlights: [""] }] });
  }, [draft, onDraftChange]);

  const removeExperience = useCallback((id: string) => {
    onDraftChange({ ...draft, experiences: draft.experiences.filter((experience) => experience.id !== id) });
  }, [draft, onDraftChange]);

  const updateProject = useCallback((id: string, patch: Partial<ResumeProject>) => {
    onDraftChange({ ...draft, projects: draft.projects.map((project) => project.id === id ? { ...project, ...patch } : project) });
  }, [draft, onDraftChange]);

  const updateProjectHighlight = useCallback((id: string, index: number, value: string) => {
    onDraftChange({
      ...draft,
      projects: draft.projects.map((project) => {
        if (project.id !== id) return project;
        const highlights = [...project.highlights];
        highlights[index] = value;
        return { ...project, highlights };
      })
    });
  }, [draft, onDraftChange]);

  const addProject = useCallback(() => {
    onDraftChange({ ...draft, projects: [...draft.projects, { id: createId("project"), name: "", description: "", url: "", highlights: [""], technologies: [] }] });
  }, [draft, onDraftChange]);

  const removeProject = useCallback((id: string) => {
    onDraftChange({ ...draft, projects: draft.projects.filter((project) => project.id !== id) });
  }, [draft, onDraftChange]);

  const updateEducation = useCallback((id: string, patch: Partial<ResumeEducation>) => {
    onDraftChange({ ...draft, education: draft.education.map((item) => item.id === id ? { ...item, ...patch } : item) });
  }, [draft, onDraftChange]);

  const addEducation = useCallback(() => {
    onDraftChange({ ...draft, education: [...draft.education, { id: createId("edu"), school: "", degree: "", major: "", startDate: "", endDate: "" }] });
  }, [draft, onDraftChange]);

  const removeEducation = useCallback((id: string) => {
    onDraftChange({ ...draft, education: draft.education.filter((item) => item.id !== id) });
  }, [draft, onDraftChange]);

  const updateSkills = useCallback((value: string) => {
    onDraftChange({ ...draft, skills: value.split(",").map((skill) => skill.trim()).filter(Boolean) });
  }, [draft, onDraftChange]);

  const updateTechnologies = useCallback((projectId: string, value: string) => {
    updateProject(projectId, { technologies: value.split(",").map((technology) => technology.trim()).filter(Boolean) });
  }, [updateProject]);

  const router = useRouter();

  const handleOptimize = useCallback(async () => {
    setIsOptimizing(true);
    setOptimizeError("");
    setOptimizeMessage("");

    try {
      const response = await fetch("/api/resume/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });
      const result = (await response.json()) as Partial<ResumeOptimizationResult> & { error?: string };

      if (!response.ok || !result.draft) throw new Error(result.error ?? "AI 优化失败，请稍后重试。");

      onDraftChange(result.draft);
      setOptimizeMessage(result.suggestions && result.suggestions.length > 0 ? "已优化：" + result.suggestions.join("；") : "AI 已完成优化，并回填到预览区。");
    } catch (error) {
      setOptimizeError(error instanceof Error ? error.message : "AI 优化失败，请稍后重试。");
    } finally {
      setIsOptimizing(false);
    }
  }, [draft, onDraftChange]);

  const handleExportPDF = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  const handleGenerateSharePage = useCallback(async () => {
    try {
      const response = await fetch("/api/resume/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });

      const result = await response.json();
      if (!response.ok || !result.slug) {
        throw new Error(result.error ?? "创建公开简历失败，请稍后重试。");
      }

      const url = `${window.location.origin}/resume/${result.slug}`;
      setShareUrl(url);
      router.push(`/resume/${result.slug}`);
    } catch (error) {
      setOptimizeError(error instanceof Error ? error.message : "创建公开简历失败，请稍后重试。");
    }
  }, [draft, router]);

  return (
    <form className="space-y-4 animate-fade-in-up">
      <div className="rounded-[24px] bg-slate-950/5 px-4 py-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-slate-800/60">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-slate-900 dark:text-slate-100">实时更新你的简历预览。</p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-white/70 px-2.5 py-1 text-slate-900 dark:bg-slate-800 dark:text-slate-100">自动同步</span>
            <span className="rounded-full bg-teal-400/15 px-2.5 py-1 text-teal-700 dark:text-teal-200">即时反馈</span>
          </div>
        </div>
      </div>
      <FormSection title="基础信息" description="填写招聘方最先看到的身份、职位和联系方式。">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="姓名" value={draft.basics.name} onChange={(value) => updateBasics("name", value)} placeholder="例如：张三" />
          <Field label="目标职位" value={draft.basics.title} onChange={(value) => updateBasics("title", value)} placeholder="例如：全栈工程师" />
          <Field label="邮箱" type="email" value={draft.basics.email} onChange={(value) => updateBasics("email", value)} placeholder="name@example.com" />
          <Field label="手机号" value={draft.basics.phone} onChange={(value) => updateBasics("phone", value)} placeholder="138 0000 0000" />
          <Field label="所在城市" value={draft.basics.location} onChange={(value) => updateBasics("location", value)} placeholder="上海 / 远程" />
          <Field label="个人网站" value={draft.basics.website} onChange={(value) => updateBasics("website", value)} placeholder="https://your-site.com" />
          <Field label="LinkedIn" value={draft.basics.linkedin} onChange={(value) => updateBasics("linkedin", value)} placeholder="linkedin.com/in/yourname" />
          <Field label="GitHub" value={draft.basics.github} onChange={(value) => updateBasics("github", value)} placeholder="github.com/yourname" />
        </div>
      </FormSection>

      <FormSection title="职业摘要" description="用 3-5 句话概括你的经验、优势和目标方向。">
        <Textarea label="摘要内容" value={draft.summary} onChange={(value) => onDraftChange({ ...draft, summary: value })} placeholder="例如：5 年全栈开发经验，熟悉 Next.js、Node.js 和云部署，曾主导多个从 0 到 1 的产品交付。" rows={5} />
      </FormSection>

      <FormSection title="工作经历" description="突出职责、结果和影响，AI 会基于这些内容优化表达。">
        <div className="space-y-4">
          {draft.experiences.map((experience, index) => (
            <ExperienceEntry key={experience.id} experience={experience} index={index} canRemove={draft.experiences.length > 1} onUpdate={updateExperience} onHighlightChange={updateExperienceHighlight} onRemove={removeExperience} />
          ))}
          <Button type="button" variant="outline" onClick={addExperience}><Plus className="mr-2 h-4 w-4" />添加工作经历</Button>
        </div>
      </FormSection>

      <FormSection title="项目经历" description="填写能体现能力和成果的项目，适合技术岗、产品岗和设计岗。">
        <div className="space-y-4">
          {draft.projects.map((project, index) => (
            <ProjectEntry key={project.id} project={project} index={index} canRemove={draft.projects.length > 1} onUpdate={updateProject} onHighlightChange={updateProjectHighlight} onTechnologiesChange={updateTechnologies} onRemove={removeProject} />
          ))}
          <Button type="button" variant="outline" onClick={addProject}><Plus className="mr-2 h-4 w-4" />添加项目经历</Button>
        </div>
      </FormSection>

      <FormSection title="教育经历" description="填写学校、学历、专业和就读时间。">
        <div className="space-y-4">
          {draft.education.map((item, index) => (
            <EducationEntry key={item.id} item={item} index={index} canRemove={draft.education.length > 1} onUpdate={updateEducation} onRemove={removeEducation} />
          ))}
          <Button type="button" variant="outline" onClick={addEducation}><Plus className="mr-2 h-4 w-4" />添加教育经历</Button>
        </div>
      </FormSection>

      <FormSection title="技能" description="用英文逗号分隔技能，预览区会自动渲染成标签。">
        <Field label="技能列表" value={draft.skills.join(", ")} onChange={updateSkills} placeholder="React, Next.js, TypeScript, Node.js, PostgreSQL" />
      </FormSection>

      <div className="space-y-3 rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95 p-4 text-white shadow-[0_20px_70px_rgba(15,23,42,0.18)] dark:border-slate-700">
        <div className="grid gap-3 sm:grid-cols-3">
          <Button type="button" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20" onClick={handleOptimize} disabled={isOptimizing}><Sparkles className="mr-2 h-4 w-4" />{isOptimizing ? "优化中..." : "AI 优化"}</Button>
          <Button type="button" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20" onClick={handleExportPDF}>导出 PDF</Button>
          <Button type="button" className="bg-teal-400 text-slate-950 hover:bg-teal-300" onClick={handleGenerateSharePage}>生成分享页</Button>
        </div>
        <div className="rounded-2xl bg-slate-900/80 p-4 text-sm leading-6 text-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
          <p className="font-medium">提示</p>
          <p className="mt-2 text-slate-300">为了 PDF 和分享页效果，建议保持关键经历清晰、突出结果与方法。</p>
        </div>
        {shareUrl ? (
          <p className="text-sm leading-6 text-teal-200">
            已生成分享页：
            <a href={shareUrl} className="ml-1 underline" target="_blank" rel="noreferrer">
              {shareUrl}
            </a>
          </p>
        ) : null}
        {optimizeMessage ? <p className="text-sm leading-6 text-teal-200">{optimizeMessage}</p> : null}
        {optimizeError ? <p className="text-sm leading-6 text-red-300">{optimizeError}</p> : null}
      </div>
    </form>
  );
}
