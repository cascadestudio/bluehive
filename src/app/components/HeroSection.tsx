import React from 'react'

interface HeroSectionProps {
  // Props can be added here in the future
}

export const HeroSection = ({}: HeroSectionProps): React.JSX.Element => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/hero.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-brand-black opacity-60" />

      <div className="relative flex items-center h-full px-4 md:px-0">
        <div className="brand-grid gap-5">
          <div className="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-3 lg:col-span-6">
            <h1 className="mb-6 font-bold text-white text-3xl md:text-4xl lg:text-5xl">
              Where advanced digital technologies meet real-world assets
            </h1>

            <p className="mb-8 font-semibold text-white text-lg md:text-xl lg:text-2xl">
              We engineer tailored industrial IoT solutions for sectors such as utilities,
              environment, and natural resources. We transform data from machines, sensors, and
              cameras into actionable insights with AI-powered analytics, machine learning, and
              computer vision — delivering intelligence that drives smarter, faster, and more
              sustainable decisions.
            </p>

            <button className="inline-flex items-center justify-center gap-1 px-6 py-3 bg-brand-blue rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-black">
              <span className="font-bold text-white text-base">Contact us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
