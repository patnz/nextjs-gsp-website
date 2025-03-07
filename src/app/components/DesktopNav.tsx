'use client'

import React from 'react'
import { NavbarContent, NavbarMenuItem, Button } from '@heroui/react'
import Link from 'next/link'
import { ProcessedDesktopNavItem } from '@/app/types' // You'll need to update your types

interface DesktopNavProps {
  navData: ProcessedDesktopNavItem[]
  isDesktopMenuOpen: string | null
  isAnimating: boolean
  handleMenuToggle: (label: string) => void
  handleLinkClick: () => void
}

export default function DesktopNav({
  navData,
  isDesktopMenuOpen,
  isAnimating,
  handleMenuToggle,
  handleLinkClick,
}: DesktopNavProps) {
  const renderDesktopNavItem = (nav: ProcessedDesktopNavItem) => (
    <NavbarMenuItem key={nav.label}>
      <Button
        className="font-courierPrime font-extralight bg-transparent border-none rounded-none text-gsp-white tracking-[-0.25rem] text-xl border-gsp-white hover:text-gsp-black hover:bg-gsp-white"
        onClick={() => handleMenuToggle(nav.label)}
      >
        {`${nav.label}`}
      </Button>
    </NavbarMenuItem>
  )

  const currentMenuItems = isDesktopMenuOpen
    ? navData.find((nav) => nav.label === isDesktopMenuOpen)?.items || []
    : []

  return (
    <>
      <NavbarContent className="hidden lg:flex gap-[1vw]" justify="center">
        {navData.map(renderDesktopNavItem)}
      </NavbarContent>

      <div
        className={`
          hidden lg:block w-full fixed top-16 left-0 h-16
          transition-all duration-300 ease-in-out z-30 bg-transparent
          ${isDesktopMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex items-center absolute gap-4 left-0 top-0 h-full whitespace-nowrap animate-scroll"
            style={{
              animation: 'scroll 20s linear infinite',
            }}
          >
            {currentMenuItems.map((item, index) => (
              <Button
                className="font-courierPrime bg-gsp-white/100 rounded-none hover:bg-gsp-black/90 hover:bg-blend-difference hover:border-gsp-white border-gsp-black border-2 py-4 px-12 text-gsp-black hover:text-gsp-white tracking-[-0.25rem] text-xl"
                size="sm"
                key={`${item.href}-${index}`}
              >
                <Link href={item.href} onClick={handleLinkClick}>
                  {`${item.label}`}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
