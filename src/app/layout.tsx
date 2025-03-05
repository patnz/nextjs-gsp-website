import {
  getAllShows,
  getAllProjects,
  getAllTeamMembers,
  getAllCommunityPosts,
  getAllLinks,
} from '@/app/sanity/client'
import NavComponent from './components/NavComponent'
// import FloatingDecorations from './components/FloatingDecorations'
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
  const [shows, projects, teamMembers, communityPosts, links] =
    await Promise.all([
      getAllShows(),
      getAllProjects(),
      getAllTeamMembers(),
      getAllCommunityPosts(),
      getAllLinks(),
    ])

  const navData = {
    shows,
    projects,
    teamMembers,
    communityPosts,
    links,
  }

  return (
    <html lang="en" className="dark">
      <body
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.amaticSc.variable} ${fonts.orbitron.variable} ${fonts.pressStart.variable} ${fonts.courierPrime.variable} antialiased`}
      >
        {/* VIDEO BACKDROP */}
        <div className="fixed inset-0 z-10 w-full h-screen overflow-hidden opacity-0 animate-fade-in pointer-events-none">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover opacity-20"
            src="/videos/texture-backdrop-1.mp4"
          />
        </div>
        {/* VIDEO BACKDROP */}
        <Providers>
          {/* <FloatingDecorations /> */}
          <NavComponent data={navData} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
