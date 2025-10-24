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

        <p className="relative w-full md:w-[680px] font-section-intro-text">
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
              <div className="relative w-full h-[330px] bg-cover overflow-hidden">
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
                <div className="font-tag text-brand-blue">
                  {typeof project.categories?.[0] === 'object' ? project.categories[0].name : null}
                </div>
                <h3 className="font-card-title">{project.title}</h3>

                <p className="relative self-stretch font-base-text">{project.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
