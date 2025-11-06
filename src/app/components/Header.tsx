'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown } from './ChevronDown'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

interface HeaderProps {
  className?: string
}

export const Header = ({ className = '' }: HeaderProps): React.JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Détecter la locale actuelle depuis l'URL
  const currentLocale = (pathname.split('/')[1] || 'en') as Locale
  const t = translations[currentLocale].header
  const selectedLanguage = currentLocale === 'fr' ? t.french : t.english

  const languages = [
    { code: 'en' as Locale, label: t.english },
    { code: 'fr' as Locale, label: t.french },
  ]

  const handleLanguageChange = (localeCode: Locale) => {
    setIsLanguageOpen(false)
    // Replace the current locale in the pathname with the new locale
    const pathSegments = pathname.split('/').filter(Boolean)
    const newPathSegments =
      pathSegments.length > 0 && ['en', 'fr'].includes(pathSegments[0])
        ? [localeCode, ...pathSegments.slice(1)]
        : [localeCode, ...pathSegments]
    const newPath = '/' + newPathSegments.join('/')
    router.push(newPath)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 112 // Offset pour compenser le header fixe (top-4 + padding)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    // Fermer le menu mobile si ouvert
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  const mobileMenuItemBaseClasses =
    'w-full text-left font-semibold text-white text-base py-3 hover:opacity-80 transition-opacity bg-transparent cursor-pointer border-b border-brand-blue'

  return (
    <header className="fixed top-4 z-50 px-4 md:px-8 w-full">
      <div className="py-5 bg-[#1e1e1e99] backdrop-blur-[5px] backdrop-brightness-100 [-webkit-backdrop-filter:blur(5px)_brightness(100%)] rounded-xl h-full">
        {/* Desktop & Mobile Header Bar */}
        <div className="grid grid-cols-12 gap-2 md:gap-5 items-center">
          {/* Logo */}
          <div className="col-span-6 md:col-span-3 flex items-center justify-start ml-3 md:ml-7">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
              aria-label={t.scrollToTop}
            >
              <Image
                className="relative w-[120px] md:w-[146.27px] h-auto aspect-[3.75]"
                alt="BlueHive logo"
                src="/logos/bluehive.svg"
                width={146}
                height={39}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block md:col-span-3 xl:col-span-4"></div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="font-semibold text-white text-base hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {t.projects}
            </button>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <button
              onClick={() => scrollToSection('services')}
              className="font-semibold text-white text-base hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {t.services}
            </button>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <button
              onClick={() => scrollToSection('about')}
              className="font-semibold text-white text-base hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {t.about}
            </button>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="font-semibold text-white text-base hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {t.contact}
            </button>
          </div>

          <div className="hidden md:flex  lg:col-span-2 xl:col-span-1 items-center">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center font-semibold text-white text-base hover:opacity-80 transition-opacity cursor-pointer"
              >
                {selectedLanguage}
                <ChevronDown className="text-white" />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full mt-1 w-[100px] bg-brand-black rounded-lg shadow-lg z-10">
                  {languages
                    .filter((language) => language.code !== currentLocale)
                    .map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className="w-full px-3 py-2  font-semibold text-white  first:rounded-t-lg last:rounded-b-lg hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        {language.code === 'fr' ? t.french : t.english}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="col-span-6 md:hidden flex items-center justify-end mr-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 relative w-6 h-5"
              aria-label={t.toggleMenu}
            >
              <span
                className={`absolute left-0 w-full h-[2px] bg-brand-blue transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-[4px]'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-brand-blue transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-[4px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 px-4">
            <button
              onClick={() => scrollToSection('projects')}
              className={`${mobileMenuItemBaseClasses} border-t`}
            >
              {t.projects}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={mobileMenuItemBaseClasses}
            >
              {t.services}
            </button>
            <button onClick={() => scrollToSection('about')} className={mobileMenuItemBaseClasses}>
              {t.about}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={mobileMenuItemBaseClasses}
            >
              {t.contact}
            </button>

            {/* Mobile Language Dropdown */}
            <div className="relative py-3 border-b border-brand-blue">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center font-semibold text-white text-base hover:opacity-80 transition-opacity cursor-pointer"
              >
                {selectedLanguage}
                <ChevronDown className="ml-1 text-white" />
              </button>

              {isLanguageOpen && (
                <div className="mt-2 absolute bg-brand-black backdrop-blur-[5px] rounded-lg shadow-lg">
                  {languages
                    .filter((language) => language.code !== currentLocale)
                    .map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className="w-full text-base px-3 py-2 text-left font-semibold text-white first:rounded-t-lg last:rounded-b-lg hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        {language.code === 'fr' ? t.french : t.english}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
