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
    <div className="w-full space-y-0 border-t border-gray-300">
      {services.map((service, index) => {
        const isOpen = openIndex === index

        return (
          <div key={service.id} className="border-b border-gray-300">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-xl font-normal pr-4">{service.title}</h3>
              <div className="shrink-0">
                {isOpen ? <span className="text-2xl">−</span> : <span className="text-2xl">+</span>}
              </div>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.useCases.map((useCase, ucIndex) => (
                        <div key={ucIndex} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1 shrink-0">→</span>
                          <p className="text-sm leading-relaxed">
                            {typeof useCase === 'object' && useCase.useCase ? useCase.useCase : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
