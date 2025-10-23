import React from 'react'
import Image from 'next/image'
import type { Project } from '@/payload-types'

interface SelectedProjectsProps {
  projects: Project[]
}

export const SelectedProjects = ({ projects }: SelectedProjectsProps): React.JSX.Element | null => {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="grid grid-cols-12 w-full items-start gap-8 relative flex-[0_0_auto] mt-20">
      <header className="col-span-12 inline-flex flex-col items-start gap-5 px-0 py-px relative flex-[0_0_auto]">
        <div className="relative w-full h-[34px]">
          <h2 className="text-brand-blue text-4xl font-extrabold">SELECTED PROJECTS</h2>
        </div>

        <p className="relative w-full md:w-[680px] font-section-intro-text font-[number:var(--section-intro-text-font-weight)] text-[#1e1e1e] text-[length:var(--section-intro-text-font-size)] tracking-[var(--section-intro-text-letter-spacing)] leading-[var(--section-intro-text-line-height)] [font-style:var(--section-intro-text-font-style)]">
          Here are examples of how we turn complex industrial challenges into reliable, data-driven
          solutions, built in close collaboration with our clients.
        </p>
      </header>

      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative self-stretch w-full flex-[0_0_auto]">
        {projects.map((project, index) => {
          const featuredImage =
            project.featuredImage && typeof project.featuredImage === 'object'
              ? project.featuredImage
              : null

          return (
            <article key={project.id} className={`flex flex-col w-full items-start gap-4 relative`}>
              <div className="relative w-full h-[330px] bg-cover bg-[50%_50%] rounded-lg overflow-hidden">
                {featuredImage ? (
                  <Image
                    src={featuredImage.url || ''}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className={`relative w-full h-[79px]`}>
                  <div
                    className={`w-full absolute h-[20.25%] top-0 left-0 ${
                      index === 0
                        ? 'font-mono font-normal text-brand-blue text-xs text-center tracking-[0] leading-[normal]'
                        : index === 1
                          ? 'font-mobile-tag font-[number:var(--mobile-tag-font-weight)] text-brand-blue text-[length:var(--mobile-tag-font-size)] tracking-[var(--mobile-tag-letter-spacing)] leading-[var(--mobile-tag-line-height)] [font-style:var(--mobile-tag-font-style)]'
                          : 'font-mono font-normal text-brand-blue text-xs tracking-[0] leading-[normal]'
                    } ${index === 2 ? 'text-center' : ''}`}
                  >
                    {project.categories && project.categories.length > 0
                      ? typeof project.categories[0] === 'object'
                        ? project.categories[0].name
                        : project.categories[0]
                      : 'Project'}
                  </div>

                  <h3
                    className={`absolute w-full h-[68.35%] top-[31.65%] left-0 flex items-center justify-center font-card-title font-[number:var(--card-title-font-weight)] text-[#1e1e1e] text-[length:var(--card-title-font-size)] tracking-[var(--card-title-letter-spacing)] leading-[var(--card-title-line-height)] [font-style:var(--card-title-font-style)]`}
                  >
                    {project.title}
                  </h3>
                </div>

                <p className="relative self-stretch font-base-text font-[number:var(--base-text-font-weight)] text-[#1e1e1e] text-[length:var(--base-text-font-size)] tracking-[var(--base-text-letter-spacing)] leading-[var(--base-text-line-height)] [font-style:var(--base-text-font-style)]">
                  {project.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
