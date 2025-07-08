'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { NavData } from '@/app/types'
import { processNavData } from '@/app/utils/navUtils'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

interface NavComponentProps {
  data: NavData
}

export default function Navigation({ data }: NavComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = React.useState<
    string | null
  >(null)
  // const [isAnimating, setIsAnimating] = React.useState(false)

  const navStructure = processNavData(data)

  const handleDesktopMenuToggle = (label: string) => {
    if (isDesktopMenuOpen === label) {
      setIsDesktopMenuOpen(null)
    } else {
      setIsDesktopMenuOpen(label)
    }
  }

  const handleLinkClick = React.useCallback(() => {
    setIsMenuOpen(false)
    setIsDesktopMenuOpen(null)
  }, [])

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="fixed z-30 bg-opacity-50 backdrop-blur-md"
      >
        <NavbarContent>
          <NavbarBrand className="flex justify-start">
            <Link href="/" onClick={handleLinkClick}>
              <Image
                src="/images/gsp-logo.png"
                alt="GSP Logo"
                width={36}
                height={36}
              />
            </Link>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
          />
        </NavbarContent>

        <DesktopNav
          navData={navStructure.data}
          isDesktopMenuOpen={isDesktopMenuOpen}
          // isAnimating={isAnimating}
          handleDesktopMenuToggle={handleDesktopMenuToggle}
          handleLinkClick={handleLinkClick}
        />

        <MobileNav
          isMenuOpen={isMenuOpen}
          navData={navStructure.data}
          handleLinkClick={handleLinkClick}
        />
      </Navbar>
    </>
  )
}
