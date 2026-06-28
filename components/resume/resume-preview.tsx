import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Github, Globe2, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { ResumeDraft } from "@/types/resume";

function hasText(value: string) {
  return value.trim().length > 0;
}

function cleanList(values: string[]) {
  return values.filter((value) => hasText(value));
}

function ContactItem({ icon: Icon, value }: { icon: LucideIcon; value: string }) {
  if (!hasText(value)) return null;

  return (
    <span className="inline-flex items-center gap-1.5 break-all text-[11px] leading-5 text-slate-600">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      {value}
    </span>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid print:break-inside-avoid space-y-3">
      <h3 className="border-b border-slate-300 pb-1 text-[12px] font-bold uppercase tracking-[0.08em] text-slate-950 print:text-[11px]">{title}</h3>
      {children}
    </section>
  );
}

function EmptyText({ children }: { children: ReactNode }) {
  return <p className="text-[12px] leading-6 text-slate-400">{children}</p>;
}

export function ResumePreview({ draft }: { draft: ResumeDraft }) {
  const contactItems = [
    { icon: Mail, value: draft.basics.email },
    { icon: Phone, value: draft.basics.phone },
    { icon: MapPin, value: draft.basics.location },
    { icon: Globe2, value: draft.basics.website },
    { icon: Linkedin, value: draft.basics.linkedin },
    { icon: Github, value: draft.basics.github }
  ];
  const hasContact = contactItems.some((item) => hasText(item.value));
  const experiences = draft.experiences.map((experience) => ({ ...experience, highlights: cleanList(experience.highlights) }));
  const projects = draft.projects.map((project) => ({ ...project, highlights: cleanList(project.highlights) }));
  const hasExperience = experiences.some((experience) => hasText(experience.company) || hasText(experience.role) || experience.highlights.length > 0);
  const hasProjects = projects.some((project) => hasText(project.name) || hasText(project.description) || project.highlights.length > 0);
  const hasEducation = draft.education.some((item) => hasText(item.school) || hasText(item.degree) || hasText(item.major));

  return (
    <div className="space-y-3 animate-fade-in-up">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.24)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">在线预览</p>
          <p className="mt-1 text-xs text-slate-400">A4 纸张比例，后续可直接衔接 PDF 导出。</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-md bg-white/5 px-2.5 py-1">A4</span>
          <span className="rounded-md bg-white/5 px-2.5 py-1">单页优先</span>
          <span className="rounded-md bg-white/5 px-2.5 py-1">ATS 友好</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[28px] border border-slate-800/70 bg-slate-900/95 p-4 shadow-inner sm:p-6">
        <article className="resume-paper mx-auto min-h-[1123px] w-[794px] max-w-full bg-white px-12 py-10 text-slate-950 shadow-[0_20px_30px_rgba(15,23,42,0.08)] print:shadow-none print:w-[210mm] print:min-h-[297mm] print:px-0 print:py-0">
          <header className="border-b border-slate-300/70 pb-5">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h2 className="break-words text-[30px] font-bold leading-tight tracking-normal text-slate-950">{draft.basics.name || "你的姓名"}</h2>
                <p className="mt-1 text-[15px] font-medium text-slate-600">{draft.basics.title || "目标职位"}</p>
              </div>
              <div className="shrink-0 rounded-md border border-slate-200 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Resume</div>
            </div>
            {hasContact ? (
              <div className="mt-4 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                {contactItems.map(({ icon: Icon, value }) => (
                  <ContactItem key={Icon.name + value} icon={Icon} value={value} />
                ))}
              </div>
            ) : null}
          </header>

          <div className="mt-6 space-y-6 text-[12px] leading-6">
            <ResumeSection title="个人摘要">
              {hasText(draft.summary) ? (
                <p className="whitespace-pre-line text-slate-700">{draft.summary}</p>
              ) : (
                <EmptyText>填写职业摘要后，这里会展示一段适合放在简历开头的个人概述。</EmptyText>
              )}
            </ResumeSection>

            <ResumeSection title="工作经历">
              {hasExperience ? (
                <div className="space-y-5">
                  {experiences.map((experience) => {
                    if (!hasText(experience.company) && !hasText(experience.role) && experience.highlights.length === 0) return null;

                    return (
                      <article key={experience.id} className="break-inside-avoid space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-[13px] font-bold text-slate-950">{experience.role || "职位名称"}</h4>
                            <p className="font-medium text-slate-700">{experience.company || "公司名称"}</p>
                          </div>
                          <p className="max-w-[220px] text-right text-[11px] leading-5 text-slate-500">
                            {[experience.startDate, experience.endDate].filter(Boolean).join(" - ") || "起止时间"}
                            {hasText(experience.location) ? " · " + experience.location : ""}
                          </p>
                        </div>
                        {experience.highlights.length > 0 ? (
                          <ul className="list-disc space-y-1 pl-5 text-slate-700">
                            {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                          </ul>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyText>填写工作经历后，这里会展示职责、成果和影响。</EmptyText>
              )}
            </ResumeSection>

            <ResumeSection title="项目经历">
              {hasProjects ? (
                <div className="space-y-5">
                  {projects.map((project) => {
                    if (!hasText(project.name) && !hasText(project.description) && project.highlights.length === 0) return null;

                    return (
                      <article key={project.id} className="break-inside-avoid space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-[13px] font-bold text-slate-950">{project.name || "项目名称"}</h4>
                          {hasText(project.url) ? <p className="max-w-[260px] break-all text-right text-[11px] text-slate-500">{project.url}</p> : null}
                        </div>
                        {hasText(project.description) ? <p className="text-slate-700">{project.description}</p> : null}
                        {project.highlights.length > 0 ? (
                          <ul className="list-disc space-y-1 pl-5 text-slate-700">
                            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                          </ul>
                        ) : null}
                        {project.technologies.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.technologies.map((technology) => (
                              <span key={technology} className="rounded border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">{technology}</span>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyText>填写项目经历后，这里会展示项目目标、职责和成果。</EmptyText>
              )}
            </ResumeSection>

            <ResumeSection title="教育经历">
              {hasEducation ? (
                <div className="space-y-3">
                  {draft.education.map((item) => {
                    if (!hasText(item.school) && !hasText(item.degree) && !hasText(item.major)) return null;

                    return (
                      <article key={item.id} className="break-inside-avoid flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-[13px] font-bold text-slate-950">{item.school || "学校名称"}</h4>
                          <p className="text-slate-700">{[item.degree, item.major].filter(Boolean).join(" · ") || "学历与专业"}</p>
                        </div>
                        <p className="text-right text-[11px] text-slate-500">{[item.startDate, item.endDate].filter(Boolean).join(" - ") || "起止时间"}</p>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyText>填写教育经历后，这里会展示学校、学历和专业。</EmptyText>
              )}
            </ResumeSection>

            <ResumeSection title="技能">
              {draft.skills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {draft.skills.map((skill) => (
                    <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">{skill}</span>
                  ))}
                </div>
              ) : (
                <EmptyText>填写技能后，这里会展示技能标签。</EmptyText>
              )}
            </ResumeSection>
          </div>
        </article>
      </div>
    </div>
  );
}
