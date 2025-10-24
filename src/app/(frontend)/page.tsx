import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import type { Project, Service } from '@/payload-types'

import config from '@/payload.config'
import { HeroSection } from '@/app/components/HeroSection'
import { Header } from '@/app/components/Header'
import { SelectedProjects } from '@/app/components/SelectedProjects'
import { OurServices } from '@/app/components/OurServices'
import { About } from '@/app/components/About'

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

async function getServices(): Promise<Service[]> {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'createdAt',
  })

  return services
}

export default async function HomePage() {
  const projects = await getSelectedProjects()
  const services = await getServices()

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="flex flex-col grow gap-y-32 px-8">
        <SelectedProjects projects={projects} />
        <OurServices services={services} />
        <About />
      </div>
    </div>
  )
}
