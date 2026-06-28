"use client";

import { Github, Globe2, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeDraft } from "@/types/resume";

function hasText(value: string) {
  return value.trim().length > 0;
}

function ContactItem({ icon: Icon, value }: { icon: typeof Mail; value: string }) {
  if (!hasText(value)) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <Icon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
      {value}
    </span>
  );
}

const emptyDraft: ResumeDraft = {
  basics: {
    name: "候选人姓名",
    title: "目标职位",
    email: "example@example.com",
    phone: "123456789",
    location: "城市 / 远程",
    website: "https://your-site.com",
    linkedin: "linkedin.com/in/yourname",
    github: "github.com/yourname"
  },
  summary: "请从简历构建页面生成的内容中查看完整职业摘要。",
  experiences: [
    {
      id: "exp-1",
      company: "公司名称",
      role: "职位名称",
      startDate: "2023.01",
      endDate: "至今",
      location: "城市",
      highlights: ["描述你的核心职责与成就。"]
    }
  ],
  projects: [
    {
      id: "project-1",
      name: "项目名称",
      description: "项目简介和你负责的关键部分。",
      url: "https://project.com",
      highlights: ["体现结果、影响和使用的技术。"],
      technologies: ["Next.js", "TypeScript"]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "学校名称",
      degree: "学历",
      major: "专业",
      startDate: "2018.09",
      endDate: "2022.06"
    }
  ],
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
};

export function ResumePublicProfile({ resume }: { resume: ResumeDraft | null }) {
  const displayResume = resume ?? emptyDraft;

  const contactItems = [
    { icon: Mail, value: displayResume.basics.email },
    { icon: Phone, value: displayResume.basics.phone },
    { icon: MapPin, value: displayResume.basics.location },
    { icon: Globe2, value: displayResume.basics.website },
    { icon: Linkedin, value: displayResume.basics.linkedin },
    { icon: Github, value: displayResume.basics.github }
  ];

  return (
    <section className="container py-10">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200/80 bg-white p-10 shadow-[0_22px_80px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-950/90 dark:text-white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">公开简历</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">{displayResume.basics.name}</h1>
            <p className="mt-2 text-xl font-medium text-slate-600 dark:text-slate-300">{displayResume.basics.title}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {contactItems.map(({ icon: Icon, value }) => (
              <ContactItem key={Icon.name + value} icon={Icon} value={value} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <section className="space-y-4 rounded-[24px] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">职业摘要</h2>
              <p className="leading-7 text-slate-700 dark:text-slate-300">{displayResume.summary}</p>
            </section>

            <section className="space-y-6 rounded-[24px] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">工作经历</h2>
              {displayResume.experiences.map((experience) => (
                <div key={experience.id} className="space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-950 dark:text-white">{experience.role}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{experience.company}</p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{experience.startDate} - {experience.endDate}{experience.location ? ` · ${experience.location}` : ""}</p>
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="space-y-6 rounded-[24px] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">项目经历</h2>
              {displayResume.projects.map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-950 dark:text-white">{project.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                    </div>
                    {project.url ? (
                      <a href={project.url} className="text-sm text-teal-600 hover:underline" target="_blank" rel="noreferrer">{project.url}</a>
                    ) : null}
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {project.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{technology}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">教育经历</h2>
              {displayResume.education.map((item) => (
                <div key={item.id} className="space-y-1 py-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.school}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.degree} · {item.major}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.startDate} - {item.endDate}</p>
                </div>
              ))}
            </section>

            <section className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">技能标签</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {displayResume.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{skill}</span>
                ))}
              </div>
            </section>

            <div className="rounded-[24px] border border-slate-200/80 bg-slate-950/95 p-6 text-slate-100 shadow-[0_15px_50px_rgba(15,23,42,0.18)] dark:border-slate-700">
              <p className="text-sm uppercase tracking-[0.18em] text-teal-200">分享说明</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                这个公开页面现在从服务器共享存储读取，朋友访问该链接时也能查看简历内容。
              </p>
              <Button className="mt-4 w-full bg-teal-400 text-slate-950 hover:bg-teal-300" onClick={() => window.print()}>
                保存 PDF
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
