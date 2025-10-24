import React from 'react'
import Image from 'next/image'

interface PersonCardProps {
  image: string
  name: string
  position: string
  description: string
  linkedinUrl?: string
}

export const PersonCard: React.FC<PersonCardProps> = ({
  image,
  name,
  position,
  description,
  linkedinUrl,
}) => {
  return (
    <div className="flex flex-col">
      {/* Image */}
      <div className="mb-4 w-full aspect-square relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Name */}
      <h3 className="font-card-title mb-1">{name}</h3>

      {/* Position */}
      <p className="font-tag text-base! mb-3">{position}</p>

      {/* Description */}
      <p className="text-sm mb-4 grow">{description}</p>

      {/* LinkedIn Button */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-dark-blue transition-colors"
          aria-label={`Visit ${name}'s LinkedIn profile`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="var(--brand-black)"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      )}
    </div>
  )
}
