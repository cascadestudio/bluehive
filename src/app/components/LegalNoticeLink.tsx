'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { translations } from '@/app/translations'
import type { Locale } from '@/app/translations'

export const LegalNoticeLink = () => {
  const pathname = usePathname()
  // Détecter la locale actuelle depuis l'URL
  const currentLocale = (pathname.split('/')[1] || 'en') as Locale
  const href = `/${currentLocale}/legal-notice`
  const t = translations[currentLocale].footer

  return (
    <Link href={href} className="hover:text-brand-blue transition-colors">
      {t.legalNotice}
    </Link>
  )
}
