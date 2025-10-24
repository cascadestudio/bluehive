'use client'

import React, { useState } from 'react'
import type { Service } from '@/payload-types'

interface ServiceAccordionProps {
  services: Service[]
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({ services }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full space-y-0 border-t border-brand-blue">
      {services.map((service, index) => {
        const isOpen = openIndex === index

        return (
          <div key={service.id} className="border-b border-brand-blue">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between py-3 text-left cursor-pointer"
            >
              <h3 className="text-xl font-bold pr-4">{service.title}</h3>
              <span className="shrink-0 text-brand-blue text-2xl">{isOpen ? '−' : '+'}</span>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Image - 6 columns */}
                  {service.image && typeof service.image === 'object' && (
                    <div className="md:col-span-6">
                      <img
                        src={service.image.url || ''}
                        alt={service.image.alt || service.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Description + Use Cases - 6 columns */}
                  <div
                    className={
                      service.image && typeof service.image === 'object'
                        ? 'md:col-span-6'
                        : 'md:col-span-12'
                    }
                  >
                    {/* Description */}
                    <div className="mb-8">
                      <p className="text-base leading-relaxed whitespace-pre-line">
                        {service.description}
                      </p>
                    </div>

                    {/* Use Cases */}
                    {service.useCases && service.useCases.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4">
                          Use Cases
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {service.useCases.map((useCase, ucIndex) => (
                            <div key={ucIndex} className="flex items-start space-x-2">
                              <span className="text-blue-600 mt-1 shrink-0">→</span>
                              <p className="text-sm leading-relaxed">
                                {typeof useCase === 'object' && useCase.useCase
                                  ? useCase.useCase
                                  : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
