'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import type { Service } from '@/payload-types'
import { ServiceAccordion } from './ServiceAccordion'
import { SectionHeader } from './SectionHeader'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

interface OurServicesProps {
  services: Service[]
}

export const OurServices: React.FC<OurServicesProps> = ({ services }) => {
  const pathname = usePathname()
  const currentLocale = (pathname.split('/')[1] || 'en') as Locale
  const t = translations[currentLocale].services

  return (
    <section id="services" className="border-t border-brand-blue pt-4">
      <SectionHeader title={t.title} introText={t.introText} />
      <div className="brand-grid mb-8 section-intro-text">
        <div className="space-y-6 col-span-12 md:col-span-6">
          <p>
            <b>{t.innovation}</b> – {t.innovationText}
          </p>
          <p>
            <b>{t.rigor}</b> – {t.rigorText}
          </p>
          <p>
            <b>{t.pragmatism}</b> – {t.pragmatismText}
          </p>
        </div>
      </div>

      {/* Services Accordion */}
      <ServiceAccordion services={services} locale={currentLocale} />
    </section>
  )
}
