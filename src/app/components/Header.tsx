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

  const languages = ['English', 'French', 'German']

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  return (
    <header className="absolute top-4 z-50  mx-8 h-[79px] py-5 bg-[#1e1e1e99] backdrop-blur-[5px] backdrop-brightness-100 [-webkit-backdrop-filter:blur(5px)_brightness(100%)] rounded-xl">
      <div className="grid grid-cols-12 gap-5 h-full items-center">
        <div className="col-span-2 flex items-center justify-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <Image
              className="relative w-[146.27px] h-[39px] aspect-[3.75]"
              alt="Company logo"
              src="/images/logo.svg"
              width={146}
              height={39}
            />
          </a>
        </div>

        <div className="col-span-5"></div>

        <div className="col-span-1 flex items-center">
          <a
            href="#projects"
            className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
          >
            Projects
          </a>
        </div>

        <div className="col-span-1 flex items-center">
          <a
            href="#services"
            className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
          >
            Services
          </a>
        </div>

        <div className="col-span-1 flex items-center">
          <a
            href="#about"
            className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
          >
            About
          </a>
        </div>

        <div className="col-span-1 flex items-center">
          <a
            href="#contact"
            className="font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
          >
            Contact
          </a>
        </div>

        <div className="col-span-1 flex items-center">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center font-semibold text-white text-base tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
            >
              {selectedLanguage}
              <ChevronDown className="ml-1 text-white" />
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
      </div>
    </header>
  )
}
