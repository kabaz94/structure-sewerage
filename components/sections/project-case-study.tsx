import Image from "next/image";
import { FadeUp } from "@/components/shared/fade-up";
import { Project } from "@/types";

interface ProjectCaseStudyProps {
  project: Project;
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <article className="flex flex-col items-center text-center">
      <FadeUp className="max-w-3xl mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-12 h-px bg-tertiary-container" />
          <span className="text-sm font-bold tracking-widest uppercase text-on-surface-variant font-label">
            {project.sector}
          </span>
          <span className="w-12 h-px bg-tertiary-container" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">
          {project.client}
        </h2>
        <h3 className="text-xl font-semibold text-secondary mb-4">
          {project.title}
        </h3>
        <p className="text-on-surface-variant leading-relaxed mb-8 text-lg">
          {project.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold text-on-surface"
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeUp>

      <FadeUp className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.images.map((image, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl bg-surface-container-low group aspect-[4/3]"
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${project.client} project image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </FadeUp>
    </article>
  );
}
