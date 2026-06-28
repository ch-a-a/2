import { notFound } from "next/navigation";
import { ResumePublicProfile } from "@/components/resume/resume-public-profile";
import { getPublicProfile } from "@/lib/share/get-public-profile";

type ResumePageProps = {
  params: { slug: string };
};

export default async function ResumePage({ params }: ResumePageProps) {
  const { slug } = params;
  const resume = await getPublicProfile(slug);

  if (!resume) {
    notFound();
  }

  return <ResumePublicProfile resume={resume} />;
}
