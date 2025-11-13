'use client'

import React, { useState } from 'react'
import type { Service } from '@/payload-types'
import Image from 'next/image'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

interface ServiceAccordionProps {
  services: Service[]
  locale?: Locale
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({ services, locale = 'en' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const t = translations[locale].services

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-0 border-t border-brand-blue">
      {services.map((service, index) => {
        const isOpen = openIndex === index

        return (
          <div key={service.id} className="border-b border-brand-blue">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between py-2 md:py-3 text-left cursor-pointer transition-colors hover:text-brand-blue"
            >
              <h3 className="text-sm md:text-xl font-bold pr-4">{service.title}</h3>
              <span
                className="shrink-0 text-brand-blue text-2xl transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)' }}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {/* Accordion Content */}
            <div
              className={`grid-rows-[0fr] grid transition-all duration-400 ease-in-out ${
                isOpen ? 'grid-rows-[1fr]' : ''
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-8 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                    {/* Image - 6 columns */}
                    {service.image && typeof service.image === 'object' && (
                      <div className="md:col-span-5">
                        <div className="w-full aspect-680/510 overflow-hidden">
                          <Image
                            src={service.image.url || ''}
                            alt={service.image.alt || `${service.title} - Service illustration`}
                            width={service.image.width || 800}
                            height={service.image.height || 600}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    )}

                    {/* Description + Use Cases - 6 columns */}
                    <div
                      className={`flex flex-col justify-between ${
                        service.image && typeof service.image === 'object'
                          ? 'md:col-span-7'
                          : 'md:col-span-12'
                      }`}
                    >
                      {/* Description */}
                      <div className="mb-8">
                        <p className="font-base-text whitespace-pre-line">{service.description}</p>
                      </div>

                      {/* Use Cases */}
                      {service.useCases && service.useCases.length > 0 && (
                        <div>
                          <h4 className="font-tag mb-1">{t.useCases}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-x-8 gap-y-1 md:gap-y-2 border-t border-brand-blue pt-1">
                            {service.useCases.map((useCase, ucIndex) => (
                              <div
                                key={ucIndex}
                                className="flex items-start space-x-2 md:col-span-3"
                              >
                                <span className="text-brand-blue shrink-0">→</span>
                                <p className="text-xs md:text-sm">
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
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
