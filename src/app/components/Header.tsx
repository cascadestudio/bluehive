'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from './ChevronDown'

interface HeaderProps {
  className?: string
}

export const Header = ({ className = '' }: HeaderProps): React.JSX.Element => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const languages = ['English', 'French', 'German']

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-4 z-50 px-4 md:px-8 w-full">
      <div className="py-5 bg-[#1e1e1e99] backdrop-blur-[5px] backdrop-brightness-100 [-webkit-backdrop-filter:blur(5px)_brightness(100%)] rounded-xl h-full">
        {/* Desktop & Mobile Header Bar */}
        <div className="grid grid-cols-12 gap-2 md:gap-5 items-center">
          {/* Logo */}
          <div className="col-span-6 md:col-span-3 flex items-center justify-start ml-3 md:ml-7">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <Image
                className="relative w-[120px] md:w-[146.27px] h-auto aspect-[3.75]"
                alt="BlueHive logo"
                src="/logos/bluehive.svg"
                width={146}
                height={39}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block md:col-span-3 xl:col-span-4"></div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <a
              href="#projects"
              className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
            >
              Projects
            </a>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <a
              href="#services"
              className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
            >
              Services
            </a>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <a
              href="#about"
              className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
            >
              About
            </a>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center">
            <a
              href="#contact"
              className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:flex  lg:col-span-2 xl:col-span-1 items-center">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
              >
                {selectedLanguage}
                <ChevronDown className="text-white" />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-1 w-[80px] bg-[#1e1e1e99] backdrop-blur-[5px] rounded-lg shadow-lg z-10">
                  {languages
                    .filter((language) => language !== selectedLanguage)
                    .map((language) => (
                      <button
                        key={language}
                        onClick={() => handleLanguageChange(language)}
                        className="w-full px-3 py-2  font-semibold text-white  first:rounded-t-lg last:rounded-b-lg hover:opacity-80 transition-opacity"
                      >
                        {language}
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
              aria-label="Toggle menu"
            >
              <span
                className={`absolute left-0 w-full h-[2.5px] bg-brand-blue transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-[4px]'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2.5px] bg-brand-blue transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-[4px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-4">
            <a
              href="#projects"
              onClick={handleMobileLinkClick}
              className="block font-semibold text-white text-base py-2 hover:opacity-80 transition-opacity"
            >
              Projects
            </a>
            <a
              href="#services"
              onClick={handleMobileLinkClick}
              className="block font-semibold text-white text-base py-2 hover:opacity-80 transition-opacity"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={handleMobileLinkClick}
              className="block font-semibold text-white text-base py-2 hover:opacity-80 transition-opacity"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={handleMobileLinkClick}
              className="block font-semibold text-white text-base py-2 hover:opacity-80 transition-opacity"
            >
              Contact
            </a>

            {/* Mobile Language Dropdown */}
            <div className="relative pt-2">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center font-semibold text-white text-base hover:opacity-80 transition-opacity"
              >
                {selectedLanguage}
                <ChevronDown className="ml-1 text-white" />
              </button>

              {isLanguageOpen && (
                <div className="mt-2 w-full bg-[#1e1e1e99] backdrop-blur-[5px] rounded-lg shadow-lg">
                  {languages
                    .filter((language) => language !== selectedLanguage)
                    .map((language) => (
                      <button
                        key={language}
                        onClick={() => handleLanguageChange(language)}
                        className="w-full px-3 py-2 text-left font-semibold text-white first:rounded-t-lg last:rounded-b-lg hover:opacity-80 transition-opacity"
                      >
                        {language}
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
