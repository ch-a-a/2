import { z } from "zod";

export const resumeDraftSchema = z.object({
  basics: z.object({
    name: z.string().max(80),
    title: z.string().max(120),
    email: z.string().email().or(z.literal("")),
    phone: z.string().max(40),
    location: z.string().max(80),
    website: z.string().max(160),
    linkedin: z.string().max(160),
    github: z.string().max(160)
  }),
  summary: z.string().max(1200),
  experiences: z.array(
    z.object({
      id: z.string(),
      company: z.string().max(120),
      role: z.string().max(120),
      startDate: z.string().max(30),
      endDate: z.string().max(30),
      location: z.string().max(80),
      highlights: z.array(z.string().max(300))
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string().max(120),
      description: z.string().max(500),
      url: z.string().max(160),
      highlights: z.array(z.string().max(300)),
      technologies: z.array(z.string().max(40))
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      school: z.string().max(120),
      degree: z.string().max(120),
      major: z.string().max(120),
      startDate: z.string().max(30),
      endDate: z.string().max(30)
    })
  ),
  skills: z.array(z.string().max(40))
});
