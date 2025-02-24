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
import { NavData } from '../sanity/types'

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

  const navStructure = [
    {
      label: 'Shows',
      items: data.shows.map((show) => ({
        label: `${show.title} (${show.year})`,
        href: `/shows/${show.slug.current}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'Projects',
      items: data.projects.map((project) => ({
        label: project.title,
        href: `/projects/${project.slug.current}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'Team',
      items: data.teamMembers.map((member) => ({
        label: member.name,
        href: `/team/${member._id}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'Links',
      items: data.links.map((link) => ({
        label: link.title,
        href: link.url,
      })),
      defaultHref: '/',
    },
    {
      label: 'Community',
      items: data.communityPosts.map((post) => ({
        label: post.title,
        href: `/community/${post.slug.current}`,
      })),
      defaultHref: '/',
    },
    {
      label: 'About',
      items: [],
      defaultHref: '/',
    },
  ]

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

  const handleAccordionChange = (keys: Set<string>) => {
    setOpenAccordions(keys)
  }

  const renderMobileNavContent = () => (
    <Accordion
      className="px-2 py-2 gap-2"
      selectionMode="multiple"
      selectedKeys={openAccordions}
      onSelectionChange={handleAccordionChange}
    >
      {navStructure.map((nav) => (
        <AccordionItem
          key={nav.label}
          aria-label={nav.label}
          title={
            <span className="font-courierPrime bg-gsp-black text-gsp-gold px-2 p-1 drop-shadow-xl tracking-[-0.2rem] text-xl">
              {nav.label.toLowerCase()}
              {` >`}
            </span>
          }
          className="bg-gsp-gold mb-2 px-4"
        >
          <div className="flex flex-col gap-2 text-right">
            {nav.items.length > 0 ? (
              nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-full hover:bg-gsp-white/20 transition-colors p-4 font-courierPrime"
                  onClick={handleLinkClick}
                >
                  {item.label.toLocaleUpperCase()}
                </Link>
              ))
            ) : (
              <Link
                href={nav.defaultHref}
                className="w-full hover:bg-gsp-white/20 transition-colors p-4 font-courierPrime"
                onClick={handleLinkClick}
              >
                Go to {nav.label}
              </Link>
            )}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )

  const renderDesktopNavItem = (nav: (typeof navStructure)[0]) => (
    <NavbarMenuItem key={nav.label}>
      <Button
        className="font-courierPrime bg-gsp-gold text-xl tracking-wider border-none rounded-none drop-shadow-lg shadow-inner"
        size="sm"
        onClick={() => handleMenuToggle(nav.label)}
      >
        {nav.label.toUpperCase()}
      </Button>
    </NavbarMenuItem>
  )

  const currentMenuItems = isDesktopMenuOpen
    ? navStructure.find((nav) => nav.label === isDesktopMenuOpen)?.items || []
    : []

  const duplicatedItems = [
    ...currentMenuItems,
    ...currentMenuItems,
    ...currentMenuItems,
    ...currentMenuItems,
    ...currentMenuItems,
    ...currentMenuItems,
  ]

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-gsp-gold border-gsp-white"
      >
        <NavbarContent>
          <NavbarBrand className="flex justify-start">
            <Link href="/" onClick={handleLinkClick}>
              <Image
                src="/gsp-logo.png"
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
          {navStructure.map(renderDesktopNavItem)}
        </NavbarContent>

        <NavbarMenu className="pt-6 px-2">
          {renderMobileNavContent()}
        </NavbarMenu>
      </Navbar>

      <div
        className={`
          hidden lg:block w-full bg-gsp-gold/50 fixed top-16 left-0 h-16
          transition-all duration-300 ease-in-out
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
            {duplicatedItems.map((item, index) => (
              <Button
                className="font-courierPrime bg-gsp-gold border-none rounded-none drop-shadow-lg shadow-inner"
                size="sm"
                key={`${item.href}-${index}`}
              >
                <Link
                  href={item.href}
                  className="px-8 py-4 hover:bg-gsp-white/20 transition-colors flex-shrink-0"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
