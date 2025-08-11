import type { Metadata } from 'next'
import './globals.css'
import fonts from './fonts'
import DesktopNav from './components/DesktopNav'
import fetchDocuments from './utils/fetchingUtils'
import { NavDataProvider } from './utils/contextUtils'
import GoogleAnalytics from './components/GoogleAnalytics'
import PageViewTracker from './components/PageViewTracker'
import { Suspense } from 'react'

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
  const navData = await fetchDocuments()

  return (
    <html lang="en" className="dark">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.amaticSc.variable} ${fonts.orbitron.variable} ${fonts.pressStart.variable} ${fonts.courierPrime.variable} ${fonts.gspFont.variable} antialiased font-gspFont`}
      >
        <NavDataProvider data={navData}>
          <DesktopNav navData={navData} />
          {children}
        </NavDataProvider>
        <Suspense>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  )
}
