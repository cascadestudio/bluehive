import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import type { Project, ProjectCategory, Media } from '@/payload-types'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

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

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        {/* Featured Projects Section */}
        <section className="featured-projects">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                {project.featuredImage && typeof project.featuredImage === 'object' && (
                  <div className="project-image">
                    <Image
                      src={project.featuredImage.url || ''}
                      alt={project.title}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.categories && project.categories.length > 0 && (
                    <div className="project-categories">
                      {project.categories.map((category, index) => (
                        <span key={index} className="category-tag">
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
