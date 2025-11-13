'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { LegalNoticeLink } from './LegalNoticeLink'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

export const Footer: React.FC = () => {
  const pathname = usePathname()
  const currentLocale = (pathname.split('/')[1] || 'en') as Locale
  const t = translations[currentLocale].footer

  return (
    <footer id="contact" className="px-4 md:px-8">
      <div className="border-t border-brand-blue pt-6 pb-4 mt-16 md:mt-32">
        <div className="brand-grid gap-y-10! md:gap-y-0!">
          {/* Contact Us */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2">
            <h3 className="font-tag mb-4">{t.contactUs}</h3>
            <div className="space-y-1 text-sm">
              <p>
                <a
                  href="mailto:contact@bluehive.ch"
                  className="hover:text-brand-blue transition-colors"
                >
                  contact@bluehive.ch
                </a>
              </p>
              <p>
                <a href="tel:+41225912631" className="hover:text-brand-blue transition-colors">
                  +41 22 591 26 31
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/company/bluehive-digital-solutions/"
                  className="hover:text-brand-blue transition-colors"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>

          {/* Head Office */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h3 className="font-tag mb-4">{t.headOffice}</h3>
            <address className="text-sm not-italic">
              <a
                href="https://maps.google.com/?q=20+chemin+Michée-Chauderon+1203+Genève"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-blue transition-colors space-y-1"
              >
                <p>BlueHive Digital Solutions LLC,</p>
                <p>20, chemin Michée-Chauderon,</p>
                <p>CH-1203 Genève</p>
              </a>
            </address>
          </div>

          {/* Offices */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h3 className="font-tag mb-4">{t.offices}</h3>
            <address className="text-sm not-italic">
              <a
                href="https://maps.google.com/?q=rue+de+Lyon+77+1203+Genève"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-blue transition-colors space-y-1"
              >
                <p>BlueHive Digital Solutions LLC,</p>
                <p>rue de Lyon 77,</p>
                <p>CH-1203 Genève</p>
              </a>
            </address>
          </div>

          {/* Sitemap */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2">
            <h3 className="font-tag mb-4">{t.sitemap}</h3>
            <nav className="text-sm space-y-1">
              <p>
                <a href="#projects" className="hover:text-brand-blue transition-colors">
                  {t.projects}
                </a>
              </p>
              <p>
                <a href="#services" className="hover:text-brand-blue transition-colors">
                  {t.services}
                </a>
              </p>
              <p>
                <a href="#about" className="hover:text-brand-blue transition-colors">
                  {t.about}
                </a>
              </p>
            </nav>
          </div>

          {/* Legal */}
          <div className="col-span-12 sm:col-span-6 md:col-span-2">
            <h3 className="font-tag mb-4">{t.legal}</h3>
            <div className="text-sm space-y-1">
              <p>
                <LegalNoticeLink />
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs gap-y-2">
          <p>
            {t.copyright} {new Date().getFullYear()}
          </p>
          <p>
            {t.websiteBy}{' '}
            <a
              href="https://www.cascadestudio.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              Cascade studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
