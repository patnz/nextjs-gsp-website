import type { Metadata } from 'next'
import { Geist, Geist_Mono, Amatic_SC, Orbitron } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { getAllShows } from './sanity/client'
import NavComponent from './components/NavComponent'

// FONT THINGS

const amaticSc = Amatic_SC({
  variable: '--font-amatic-sc',
  weight: '700',
  subsets: ['latin'],
})

const orbitron = Orbitron({
  variable: '--font-orbitron',
  weight: 'variable',
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const shows = await getAllShows()
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amaticSc.variable} ${orbitron.variable}  antialiased`}
      >
        <Providers>
          <NavComponent shows={shows} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
