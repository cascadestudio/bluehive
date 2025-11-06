'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import type { Project } from '@/payload-types'
import { SectionHeader } from './SectionHeader'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

interface SelectedProjectsProps {
  projects: Project[]
}

export const SelectedProjects = ({ projects }: SelectedProjectsProps): React.JSX.Element | null => {
  const pathname = usePathname()
  const currentLocale = (pathname.split('/')[1] || 'en') as Locale
  const t = translations[currentLocale].projects

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section id="projects" className="mt-20">
      <SectionHeader title={t.title} introText={t.introText} />

      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-16">
        {projects.map((project, index) => {
          const featuredImage =
            project.featuredImage && typeof project.featuredImage === 'object'
              ? project.featuredImage
              : null

          return (
            <article key={project.id} className="flex flex-col items-start gap-4 relative">
              <div className="relative w-full h-[250px] md:h-[330px] bg-cover overflow-hidden">
                {featuredImage ? (
                  <Image
                    src={featuredImage.url || ''}
                    alt={`${project.title} - Featured project image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">{t.noImage}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="font-tag text-brand-blue mb-1 md:mb-2">
                  {typeof project.categories?.[0] === 'object' ? project.categories[0].name : null}
                </div>
                <h3 className="font-card-title mb-3 md:mb-4">{project.title}</h3>

                <p className="relative self-stretch font-base-text">{project.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
