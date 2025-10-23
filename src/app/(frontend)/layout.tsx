import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 font-sans text-lg leading-8 text-white bg-black antialiased">
        <main className="h-full">{children}</main>
      </body>
    </html>
  )
}
