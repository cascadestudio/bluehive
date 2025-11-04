'use client'

import React from 'react'

interface HeroSectionProps {
  // Props can be added here in the future
}

export const HeroSection = ({}: HeroSectionProps): React.JSX.Element => {
  return (
    <section
      className="w-full md:h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'linear-gradient(rgba(30, 30, 30, 0.6), rgba(30, 30, 30, 0.6)), url(/images/hero.jpg)',
      }}
      aria-label="Hero section"
    >
      <div className="relative flex md:items-center h-full px-4 md:px-0 pb-4 md:pb-0">
        <div className="mt-28 md:mt-0 brand-grid gap-5">
          <div className="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-3 lg:col-span-6 flex flex-col">
            <h1 className="mb-6 font-bold text-white text-3xl md:text-4xl lg:text-5xl">
              Where advanced digital technologies meet real-world assets
            </h1>

            <p className="leading-snug mb-8 font-semibold text-white text-lg md:text-xl lg:text-2xl">
              We engineer tailored industrial IoT solutions for sectors such as utilities,
              environment, and natural resources. We transform data from machines, sensors, and
              cameras into actionable insights with AI-powered analytics, machine learning, and
              computer vision — delivering intelligence that drives smarter, faster, and more
              sustainable decisions.
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
              className="self-end md:self-start inline-flex items-center justify-center gap-1 px-6 py-3 bg-brand-blue rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Scroll to contact section"
            >
              <span className="font-bold text-white text-base">Contact us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
