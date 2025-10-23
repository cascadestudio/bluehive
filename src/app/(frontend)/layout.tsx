import React from 'react'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`h-full ${nunitoSans.variable}`}>
      <body className="h-full m-0 font-nunito-sans text-lg leading-8 text-white bg-black antialiased">
        <main className="h-full">{children}</main>
      </body>
    </html>
  )
}
