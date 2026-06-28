export type ResumeBasics = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
};

export type ResumeExperience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
};

export type ResumeProject = {
  id: string;
  name: string;
  description: string;
  url: string;
  highlights: string[];
  technologies: string[];
};

export type ResumeEducation = {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
};

export type ResumeDraft = {
  basics: ResumeBasics;
  summary: string;
  experiences: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  skills: string[];
};

export type ResumeOptimizationResult = {
  status: "optimized";
  draft: ResumeDraft;
  suggestions: string[];
};
