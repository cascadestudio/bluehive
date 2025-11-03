import React from 'react'
import type { Service } from '@/payload-types'
import { ServiceAccordion } from './ServiceAccordion'
import { SectionHeader } from './SectionHeader'

interface OurServicesProps {
  services: Service[]
}

export const OurServices: React.FC<OurServicesProps> = ({ services }) => {
  return (
    <section id="services" className="border-t border-brand-blue pt-4">
      <SectionHeader
        title="OUR SERVICES"
        introText="Our services are guided by three core values:"
      />
      <div className="brand-grid mb-8 section-intro-text">
        <div className="space-y-6 col-span-12 md:col-span-6">
          <p>
            <b>Innovation</b> – We harness the potential of digital technologies by testing and
            validating new tools and approaches in collaboration with trusted partners. Only the
            solutions that combine performance, flexibility, and real business value are integrated
            into our offerings.
          </p>
          <p>
            <b>Rigor</b> – We apply proven engineering practices and robust methodologies to build
            systems that are reliable, scalable, and sustainable. Modular architectures and modern
            DevOps methods ensure teamwork, knowledge sharing, and long-term resilience.
          </p>
          <p>
            <b>Pragmatism</b> – We stay close to customer needs, focusing on practical, incremental,
            and iterative solutions. Rather than building "technology for technology's sake," we
            validate requirements with our clients and deliver exactly what they need, in the form
            that best serves their operations.
          </p>
        </div>
      </div>

      {/* Services Accordion */}
      <ServiceAccordion services={services} />
    </section>
  )
}
