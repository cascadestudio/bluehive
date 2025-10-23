import React from 'react'
import { Nunito_Sans, Roboto_Mono } from 'next/font/google'
import './globals.css'

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
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`h-full ${nunitoSans.variable} ${robotoMono.variable}`}>
      <body className="h-full m-0 font-base-text antialiased">
        <main className="h-full">{children}</main>
      </body>
    </html>
  )
}
