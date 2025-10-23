import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import type { Project as _Project } from '@/payload-types'

import config from '@/payload.config'
import { HeroSection } from '@/components/HeroSection'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user: _user } = await payload.auth({ headers })

  // Fetch selected projects (1-4) with their categories and featured images
  const { docs: allProjects } = await payload.find({
    collection: 'projects',
    where: {
      selectedProject: {
        not_equals: 'none',
      },
    },
    depth: 2, // This will populate all relationships
  })

  // Sort projects by selectedProject order (1, 2, 3, 4)
  const projects = allProjects
    .filter((project) => project.selectedProject && project.selectedProject !== 'none')
    .sort((a, b) => {
      const orderA = parseInt(a.selectedProject as string)
      const orderB = parseInt(b.selectedProject as string)
      return orderA - orderB
    })
    .slice(0, 4) // Take only the first 4 projects

  const _fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div>
      <HeroSection />
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Featured Projects Section */}
        <section className="my-16 w-full max-w-6xl px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-10 leading-tight">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-600 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
              >
                {project.featuredImage && typeof project.featuredImage === 'object' && (
                  <div className="w-full h-48 overflow-hidden">
                    <Image
                      src={project.featuredImage.url || ''}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 leading-7">{project.title}</h3>
                  <p className="text-base leading-6 mb-4 text-gray-300">{project.description}</p>
                  {project.categories && project.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm border border-gray-500"
                        >
                          {typeof category === 'object' ? category.name : category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
