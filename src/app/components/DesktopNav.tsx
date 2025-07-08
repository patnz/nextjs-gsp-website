'use client'

import React from 'react'
import { NavbarContent, NavbarMenuItem, Button } from '@heroui/react'
import Link from 'next/link'
import { ProcessedNavItem } from '@/app/types'

interface DesktopNavProps {
  navData: ProcessedNavItem[]
  isDesktopMenuOpen: string | null
  handleDesktopMenuToggle: (label: string) => void
  handleLinkClick: () => void
}

export default function DesktopNav({
  navData,
  isDesktopMenuOpen,
  handleDesktopMenuToggle,
  handleLinkClick,
}: DesktopNavProps) {
  const currentMenuItems = isDesktopMenuOpen
    ? navData.find((nav) => nav.label === isDesktopMenuOpen)?.items || []
    : []

  const renderDesktopNavItem = (nav: ProcessedNavItem) => (
    <NavbarMenuItem key={nav.label} className="relative">
      <Button
        className="font-courierPrime font-extralight bg-transparent border-none rounded-none text-gsp-white tracking-[-0.25rem] text-xl hover:bottom-[2px]"
        onClick={() => handleDesktopMenuToggle(nav.label)}
      >
        {nav.label}
      </Button>
    </NavbarMenuItem>
  )

  console.log(navData)

  return (
    <>
      <nav className="flex flex-col  items-center">
        <NavbarContent className="hidden lg:flex gap-[1vw]" justify="center">
          {navData.map(renderDesktopNavItem)}
        </NavbarContent>

        {isDesktopMenuOpen && (
          <div className="hidden lg:flex flex-col min-w-[500px] fixed top-16 z-30 gap-2 py-2">
            {currentMenuItems.map((item) => (
              <Button
                key={item.href}
                className="font-courierPrime bg-gsp-white hover:bg-gsp-black hover:text-gsp-white border-none rounded-none text-gsp-black tracking-[-0.25rem] text-xl px-6 py-4 border-b border-gsp-black w-full"
                size="sm"
              >
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="hover:no-underline w-full  text-right"
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
