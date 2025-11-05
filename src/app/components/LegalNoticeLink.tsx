'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const LegalNoticeLink = () => {
  const pathname = usePathname()
  // Détecter la locale actuelle depuis l'URL
  const currentLocale = pathname.split('/')[1] || 'en'
  const href = `/${currentLocale}/legal-notice`

  return (
    <Link href={href} className="hover:text-brand-blue transition-colors">
      Legal notice
    </Link>
  )
}
