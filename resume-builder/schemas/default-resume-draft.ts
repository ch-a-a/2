import type { ResumeDraft } from "@/types/resume";

export const defaultResumeDraft: ResumeDraft = {
  basics: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: ""
  },
  summary: "",
  experiences: [
    {
      id: "exp-1",
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      location: "",
      highlights: [""]
    }
  ],
  projects: [
    {
      id: "project-1",
      name: "",
      description: "",
      url: "",
      highlights: [""],
      technologies: []
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: ""
    }
  ],
  skills: []
};
