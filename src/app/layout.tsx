// app/layout.tsx
import {
  getAllShows,
  getAllProjects,
  getAllTeamMembers,
  getAllCommunityPosts,
  getAllLinks,
} from '@/app/sanity/client'
import NavComponent from './components/NavComponent'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import fonts from './fonts'
// FONT THINGS

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

  console.log(navData.shows)

  return (
    <html lang="en" className="dark">
      <body
        className={`${fonts.geistSans.variable} ${fonts.geistMono.variable} ${fonts.amaticSc.variable} ${fonts.orbitron.variable} ${fonts.pressStart.variable} ${fonts.courierPrime.variable}  antialiased`}
      >
        <Providers>
          <NavComponent data={navData} />

          {children}
        </Providers>
      </body>
    </html>
  )
}
