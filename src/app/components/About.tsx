'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { PersonCard } from './PersonCard'
import { SectionHeader } from './SectionHeader'
import Image from 'next/image'
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
            linkedinUrl="https://linkedin.com/in/vincent-mottier"
            locale={currentLocale}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <PersonCard
            image="/images/patrick-zhao.jpg"
            name="Patrick (Yupeng) Zhao"
            position={t.coFounderCTO}
            description={t.patrickDescription}
            linkedinUrl="https://linkedin.com/in/patrick-zhao"
            locale={currentLocale}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-4">
          <h3 className="font-tag text-base! mb-3">{t.collaborators}</h3>
          <div>
            <p className="font-bold">Mohammed Amin Belarbi</p>
            <p className="text-sm">{t.seniorDataScientist}</p>
          </div>
          <div>
            <p className="font-bold">Alaedinne Hmida </p>
            <p className="text-sm">{t.softwareEngineer}</p>
          </div>
          <div>
            <p className="font-bold">Grégoire Mottier</p>
            <p className="text-sm">{t.technicalCollaborator}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-4">
          <h3 className="font-tag text-base! mb-3">{t.partners}</h3>
          <Image src="/logos/arcanite.png" alt="Arcanite partner logo" width={140} height={30} />
          <Image src="/logos/ei3.svg" alt="EI3 partner logo" width={50} height={40} />
        </div>
      </div>
    </section>
  )
}
