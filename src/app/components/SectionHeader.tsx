import React from 'react'

interface SectionHeaderProps {
  title: string
  introText?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, introText }) => {
  return (
    <>
      <h2 className="font-section-title mb-2">{title}</h2>

      {introText && (
        <div className="brand-grid mb-10">
          <p className="col-span-12 md:col-span-6 section-intro-text">{introText}</p>
        </div>
      )}
    </>
  )
}
