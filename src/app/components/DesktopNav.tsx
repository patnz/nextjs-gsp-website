'use client'

import React, { useRef, useEffect, useState } from 'react'
import { NavbarContent, NavbarMenuItem, Button } from '@heroui/react'
import Link from 'next/link'
import { ProcessedDesktopNavItem } from '@/app/types'
import {
  calculateScrollDimensions,
  shouldAnimate,
} from '@/app/utils/scrollUtils'

interface DesktopNavProps {
  navData: ProcessedDesktopNavItem[]
  isDesktopMenuOpen: string | null
  isAnimating: boolean
  handleDesktopMenuToggle: (label: string) => void
  handleLinkClick: () => void
}

export default function DesktopNav({
  navData,
  isDesktopMenuOpen,
  isAnimating,
  handleDesktopMenuToggle,
  handleLinkClick,
}: DesktopNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollDimensions, setScrollDimensions] = useState({
    contentWidth: 0,
    containerWidth: 0,
    animationDuration: 20,
  })

  const currentMenuItems = isDesktopMenuOpen
    ? navData.find((nav) => nav.label === isDesktopMenuOpen)?.items || []
    : []

  // Use the utility function to calculate dimensions
  useEffect(() => {
    if (!isDesktopMenuOpen || !scrollRef.current) return

    const updateDimensions = () => {
      const dimensions = calculateScrollDimensions(scrollRef.current)
      setScrollDimensions(dimensions)
    }

    updateDimensions()

    // Recalculate on window resize
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [isDesktopMenuOpen, currentMenuItems])

  const renderDesktopNavItem = (nav: ProcessedDesktopNavItem) => (
    <NavbarMenuItem key={nav.label}>
      <Button
        className="font-courierPrime font-extralight bg-transparent border-none rounded-none text-gsp-white tracking-[-0.25rem] text-xl hover:bottom-[2px]"
        onClick={() => handleDesktopMenuToggle(nav.label)}
      >
        {`${nav.label}`}
      </Button>
    </NavbarMenuItem>
  )

  // Duplicate items to ensure continuous scrolling
  const duplicatedItems = [...currentMenuItems, ...currentMenuItems]

  // Determine if animation should be applied
  const applyAnimation = shouldAnimate(
    scrollDimensions.contentWidth,
    scrollDimensions.containerWidth
  )

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
            ref={scrollRef}
            className="flex items-center absolute gap-4 left-0 top-0 h-full whitespace-nowrap"
            style={{
              animation: applyAnimation
                ? `scroll ${scrollDimensions.animationDuration}s linear infinite`
                : 'none',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          >
            {duplicatedItems.map((item, index) => (
              <Button
                className="font-courierPrime bg-gsp-white/100 rounded-none hover:bg-gsp-black/90 hover:border-gsp-white border-gsp-black border-2 py-4 px-12 text-gsp-black hover:text-gsp-white tracking-[-0.25rem] text-xl will-change-transform"
                size="sm"
                key={`${item.href}-${index}`}
              >
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="hover:no-underline"
                >
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
