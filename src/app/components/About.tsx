'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { PersonCard } from './PersonCard'
import { SectionHeader } from './SectionHeader'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

export const About: React.FC = () => {
  const pathname = usePathname()
  const currentLocale = (pathname.split('/')[1] || 'en') as Locale
  const t = translations[currentLocale].about

  return (
    <section id="about" className="section-border mb-20 md:mb-0">
      <SectionHeader title={t.title} introText={t.introText} />

      <div className="brand-grid gap-y-16! md:gap-y-0!">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <PersonCard
            image="/images/vincent-mottier.jpg"
            name="Vincent Mottier"
            position={t.coFounderCEO}
            description={t.vincentDescription}
            linkedinUrl="https://www.linkedin.com/in/vmottier/"
            locale={currentLocale}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <PersonCard
            image="/images/patrick-zhao.jpg"
            name="Patrick (Yupeng) Zhao"
            position={t.coFounderCTO}
            description={t.patrickDescription}
            linkedinUrl="https://www.linkedin.com/in/zhaopatrick/"
            locale={currentLocale}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <PersonCard
            image="/images/Grégoire.jpg"
            name="Grégoire Mottier"
            position={t.seniorDataScientist}
            description={t.gregoireDescription}
            locale={currentLocale}
            linkedinUrl="https://ch.linkedin.com/in/gmottier"
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-4">
          <h3 className="font-tag text-base! mb-3">{t.collaborators}</h3>
          <div>
            <p className="font-bold">Alaedinne Hmida </p>
            <p className="text-sm">{t.softwareEngineer}</p>
          </div>
          <div>
            <p className="font-bold">Grégoire Mottier</p>
            <p className="text-sm">{t.technicalCollaborator}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
