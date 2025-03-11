import Navigation from '@/app/components/Navigation'
import fetchDocuments from '@/app/utils/fetchingUtils'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import fonts from './fonts'

export const metadata: Metadata = {
  title:
    'Golden Scissor Puppets | Making Your Fever Dream A Reality | Puppet Freaks Based in Naarm Melbourne | Performance Art Puppetry',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch all data for navigation
  const navData = await fetchDocuments()

  return (
    <html lang="en" className="dark">
      <body
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.amaticSc.variable} ${fonts.orbitron.variable} ${fonts.pressStart.variable} ${fonts.courierPrime.variable} antialiased`}
      >
        {/* <Providers> */}
        <Navigation data={navData} />
        {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}
