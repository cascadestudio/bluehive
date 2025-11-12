'use client'

import React from 'react'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

interface HeroSectionProps {
  locale?: Locale
}

export const HeroSection = ({ locale = 'en' }: HeroSectionProps): React.JSX.Element => {
  const t = translations[locale].hero

  return (
    <section className="relative w-full md:h-screen overflow-hidden" aria-label="Hero section">
      {/* Background Image avec overlay */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="BlueHive Digital Solutions - Industrial IoT Solutions"
        >
          <source src="/videos/hero-web.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex md:items-center h-full px-4 md:px-0 pb-4 md:pb-0">
        <div className="mt-28 md:mt-0 brand-grid gap-5">
          <div className="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-3 lg:col-span-6 flex flex-col">
            <h1 className="mb-6 font-bold text-white text-3xl md:text-4xl lg:text-5xl">
              {t.title}
            </h1>

            <p className="leading-snug mb-8 font-semibold text-white text-lg md:text-xl lg:text-2xl">
              {t.description}
            </p>

            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  const headerOffset = 112
                  const elementPosition = contactSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                }
              }}
              className="cursor-pointer self-end md:self-start inline-flex items-center justify-center gap-1 px-6 py-3 bg-brand-blue rounded-lg hover:opacity-90 transition-opacity"
              aria-label={t.scrollToContact}
            >
              <span className="font-bold text-white text-base">{t.contactButton}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
