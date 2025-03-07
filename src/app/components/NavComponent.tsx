'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
  Accordion,
  AccordionItem,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { NavData } from '@/app/types'
import { processNavData } from '@/app/utils/navUtils'

interface NavComponentProps {
  data: NavData
}

export default function NavComponent({ data }: NavComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = React.useState<
    string | null
  >(null)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [openAccordions, setOpenAccordions] = React.useState<Set<string>>(
    new Set([])
  )

  // Todo: truncate long nav links with '...' - at the moment they're overflowing
  // Filter out nav sections with no items
  const navStructure = processNavData(data)

  const handleMenuToggle = (label: string) => {
    setIsAnimating(true)
    if (isDesktopMenuOpen === label) {
      setIsDesktopMenuOpen(null)
    } else {
      setIsDesktopMenuOpen(label)
    }
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleLinkClick = React.useCallback(() => {
    setIsMenuOpen(false)
    setIsDesktopMenuOpen(null)
    setOpenAccordions(new Set([]))
  }, [])

  const handleAccordionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys instanceof Set) {
      setOpenAccordions(keys as Set<string>)
    }
  }

  const renderMobileNavContent = () => (
    <Accordion
      className="px-2 py-2 gap-2 "
      selectionMode="multiple"
      selectedKeys={openAccordions}
      onSelectionChange={handleAccordionChange}
    >
      {navStructure.mobileNavData.map((nav) => (
        <AccordionItem
          key={nav.label}
          aria-label={nav.label}
          title={
            <span className="w-full h-full transition-colors font-courierPrime  px-2  rounded-none text-gsp-black tracking-[-0.2rem] text-xl">
              {nav.label}
            </span>
          }
          className=" px-4 mb-4 border-2 border-x-[3px] border-gsp-white bg-gsp-white/80"
        >
          <div className="flex flex-col gap-2 text-right">
            {nav.items.length > 0 ? (
              nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-full p-2 font-courierPrime border-none rounded-none text-gsp-black hover:text-gsp-white tracking-[-0.2rem] text-xl"
                  onClick={handleLinkClick}
                >
                  {nav.label}
                </Link>
              ))
            ) : (
              <Link
                href={nav.defaultHref}
                className="w-full p-2 font-courierPrime  border-none rounded-none text-gsp-black hover:text-gsp-white tracking-[-0.2rem] text-xl"
                onClick={handleLinkClick}
              >
                {`_go_to_${nav.label}`}
              </Link>
            )}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )

  const renderDesktopNavItem = (
    nav: (typeof navStructure.desktopNavData)[0]
  ) => (
    <NavbarMenuItem key={nav.label}>
      <Button
        className="font-courierPrime font-extralight bg-transparent  border-none rounded-none text-gsp-white tracking-[-0.25rem] text-xl border-gsp-white hover:text-gsp-black hover:bg-gsp-white"
        onClick={() => handleMenuToggle(nav.label)}
      >
        {`${nav.label}`}
      </Button>
    </NavbarMenuItem>
  )

  const currentMenuItems = isDesktopMenuOpen
    ? navStructure.desktopNavData.find((nav) => nav.label === isDesktopMenuOpen)
        ?.items || []
    : []

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="fixed z-30 backdrop-blur-sm"
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

        <NavbarContent className="hidden lg:flex gap-[1vw]" justify="center">
          {navStructure.desktopNavData.map(renderDesktopNavItem)}
        </NavbarContent>

        <NavbarMenu className="pt-6 px-2 backdrop-blur-sm backdrop-invert">
          {renderMobileNavContent()}
        </NavbarMenu>
      </Navbar>

      <div
        className={`
          hidden lg:block w-full fixed top-16 left-0 h-16
          transition-all duration-300 ease-in-out z-30 backdrop-blur-sm backdrop-brightness-150
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
                className="font-courierPrime bg-gsp-white/50 rounded-none hover:bg-gsp-black/90 hover:bg-blend-difference hover:border-gsp-white border-gsp-black border-2 py-4 px-12 text-gsp-black hover:text-gsp-white tracking-[-0.25rem] text-xl"
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
