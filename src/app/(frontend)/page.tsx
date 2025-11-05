import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import type { Project, Service } from '@/payload-types'
import type { Metadata } from 'next'

import config from '@/payload.config'
import { HeroSection } from '@/app/components/HeroSection'
import { SelectedProjects } from '@/app/components/SelectedProjects'
import { OurServices } from '@/app/components/OurServices'
import { About } from '@/app/components/About'

export const metadata: Metadata = {
  title: 'BlueHive Digital Solutions',
  description:
    'BlueHive Digital Solutions engineers tailored industrial IoT solutions for utilities, environment, and natural resources. We transform data from machines, sensors, and cameras into actionable insights with AI-powered analytics, machine learning, and computer vision.',
  openGraph: {
    title: 'BlueHive Digital Solutions | Industrial IoT & AI Solutions',
    description:
      'We engineer tailored industrial IoT solutions and transform data from machines, sensors, and cameras into actionable insights with AI-powered analytics.',
    url: '/',
  },
}

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

  // Structured Data for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BlueHive Digital Solutions',
    url: 'https://bluehive.ch',
    logo: 'https://bluehive.ch/logos/bluehive.svg',
    description:
      'BlueHive Digital Solutions designs, builds, and maintains tailored industrial IoT solutions for sectors such as water, wastewater, environment, recycling, mining, and aggregates.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '20, chemin Michée-Chauderon',
      addressLocality: 'Genève',
      postalCode: '1203',
      addressCountry: 'CH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+41-22-591-26-31',
      contactType: 'Customer Service',
      email: 'contact@bluehive.ch',
    },
    sameAs: ['https://www.linkedin.com/company/bluehive-digital-solutions'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BlueHive Digital Solutions',
    url: 'https://bluehive.ch',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bluehive.ch/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <div className="flex flex-col grow gap-y-16 md:gap-y-32 px-4 md:px-8">
        <SelectedProjects projects={projects} />
        <OurServices services={services} />
        <About />
      </div>
    </>
  )
}
