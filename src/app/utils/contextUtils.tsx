'use client'

import React, { createContext, useContext } from 'react'

// Import your actual types
import type {
  AboutUs,
  AtTheFest,
  Freak,
  HomePageGallery,
  InDaClub,
  LiveOnStage,
  NavData,
  OnTheStreet,
} from '@/app/types/index'

// Create context with proper typing
const NavDataContext = createContext<NavData | null>(null)

export function NavDataProvider({
  data,
  children,
}: {
  data: NavData
  children: React.ReactNode
}) {
  return (
    <NavDataContext.Provider value={data}>{children}</NavDataContext.Provider>
  )
}

export function useNavData(): NavData {
  const context = useContext(NavDataContext)

  if (context === null) {
    throw new Error('useNavData must be used within a NavDataProvider')
  }

  return context
}

// Utility hook to get specific section data with proper typing
export function useSection<T extends keyof NavData>(
  sectionName: T
): NavData[T] | null {
  const navData = useNavData()
  return navData[sectionName] || null
}

// Specific hooks for each section type for better DX
export function useHomePageGallery(): HomePageGallery | null {
  const navData = useNavData()
  return navData.homePageGallery || null
}

export function useAboutUs(): AboutUs | null {
  const navData = useNavData()
  return navData.aboutUs || null
}

export function useFreaks(): Freak[] | null {
  const navData = useNavData()
  return navData.freaks || null
}

export function useInDaClub(): InDaClub | null {
  const navData = useNavData()
  return navData.inDaClub || null
}

export function useAtTheFest(): AtTheFest | null {
  const navData = useNavData()
  return navData.atTheFest || null
}

export function useOnTheStreet(): OnTheStreet | null {
  const navData = useNavData()
  return navData.onTheStreet || null
}

export function useLiveOnStage(): LiveOnStage[] | null {
  const navData = useNavData()
  return navData.liveOnStage || null
}
