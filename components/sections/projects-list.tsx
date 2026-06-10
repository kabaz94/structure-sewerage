import { ProjectCaseStudy } from "./project-case-study";
import { Project } from "@/types";

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <section className="py-24 px-6 lg:px-24 max-w-7xl mx-auto">
      <div className="space-y-32">
        {projects.map((project) => (
          <ProjectCaseStudy key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
