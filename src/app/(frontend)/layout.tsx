import React from 'react'
import { Nunito_Sans, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bluehive.ch'),
  title: {
    default: 'BlueHive Digital Solutions | Industrial IoT & AI Solutions',
    template: '%s | BlueHive Digital Solutions',
  },
  description:
    'BlueHive Digital Solutions designs, builds, and maintains tailored industrial IoT solutions for sectors such as water, wastewater, environment, recycling, mining, and aggregates. We transform data into actionable insights through AI-powered analytics, machine learning, and computer vision.',
  keywords: [
    'industrial IoT',
    'IIoT solutions',
    'AI analytics',
    'machine learning',
    'computer vision',
    'water management',
    'wastewater treatment',
    'environmental monitoring',
    'industrial automation',
    'data analytics',
    'Switzerland',
    'Geneva',
  ],
  authors: [{ name: 'BlueHive Digital Solutions' }],
  creator: 'BlueHive Digital Solutions',
  publisher: 'BlueHive Digital Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'BlueHive Digital Solutions',
    title: 'BlueHive Digital Solutions | Industrial IoT & AI Solutions',
    description:
      'We engineer tailored industrial IoT solutions and transform data from machines, sensors, and cameras into actionable insights with AI-powered analytics.',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'BlueHive Digital Solutions - Industrial IoT Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlueHive Digital Solutions | Industrial IoT & AI Solutions',
    description:
      'We engineer tailored industrial IoT solutions and transform data into actionable insights with AI-powered analytics.',
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`h-full ${nunitoSans.variable} ${robotoMono.variable}`}>
      <body className="h-full m-0 font-base-text antialiased">
        <div className="flex flex-col min-h-full">
          <Header />
          <main className="flex flex-col grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
