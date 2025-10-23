import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import type { Project } from '@/payload-types'

import config from '@/payload.config'
import { HeroSection } from '@/app/components/HeroSection'
import { Header } from '@/app/components/Header'
import { SelectedProjects } from '@/app/components/SelectedProjects'

async function getSelectedProjects(): Promise<Project[]> {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: allProjects } = await payload.find({
    collection: 'projects',
    where: {
      selectedProject: {
        not_equals: 'none',
      },
    },
    depth: 2, // Populate all relationships
  })

  return allProjects
    .filter((project) => project.selectedProject && project.selectedProject !== 'none')
    .sort((a, b) => {
      const orderA = parseInt(a.selectedProject as string)
      const orderB = parseInt(b.selectedProject as string)
      return orderA - orderB
    })
    .slice(0, 4) // Take only the first 4 projects
}

export default async function HomePage() {
  const projects = await getSelectedProjects()

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="flex flex-col items-center justify-center grow">
        <SelectedProjects projects={projects} />
      </div>
    </div>
  )
}
