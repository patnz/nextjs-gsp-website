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
    // {
    //   label: 'About',
    //   items: [],
    //   defaultHref: '/',
    // },
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
      className="px-2 py-2 gap-2 "
      selectionMode="multiple"
      selectedKeys={openAccordions}
      // error here, but this is the only way i can get it to work
      // so that the menu closes when a link is clicked to navigate
      onSelectionChange={handleAccordionChange}
    >
      {navStructure.map((nav) => (
        <AccordionItem
          key={nav.label}
          aria-label={nav.label}
          title={
            <span className="w-full h-full transition-colors font-courierPrime bg-gsp-gold px-2  rounded-none text-gsp-black tracking-[-0.2rem] text-xl">
              {`${nav.label.toLowerCase()}_`}
            </span>
          }
          className="bg-gsp-gold px-4 mb-4 border-2 border-gsp-black"
        >
          <div className="flex flex-col gap-2 text-right">
            {nav.items.length > 0 ? (
              nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-full p-2 font-courierPrime bg-gsp-gold border-none rounded-none text-gsp-black hover:text-gsp-white tracking-[-0.2rem] text-xl"
                  onClick={handleLinkClick}
                >
                  {`_${item.label.replace(' ', '_').toLowerCase()}`}
                  {/* {`[${index}] ${item.label.replace(' ', '_').toLowerCase()}`} */}
                </Link>
              ))
            ) : (
              <Link
                href={nav.defaultHref}
                className="w-full p-2 font-courierPrime bg-gsp-gold border-none rounded-none text-gsp-black hover:text-gsp-white tracking-[-0.2rem] text-xl"
                onClick={handleLinkClick}
              >
                {`_go_to_${nav.label.replace(' ', '_').toLowerCase()}`}
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
        className="font-courierPrime font-extralight bg-gsp-gold  border-none rounded-none text-gsp-black tracking-[-0.25rem] text-xl hover:text-gsp-white"
        onClick={() => handleMenuToggle(nav.label)}
      >
        {`${nav.label.toLowerCase()}_`}
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
                className="font-courierPrime bg-gsp-gold rounded-none hover:text-gsp-white hover:bg-gsp-black border-gsp-black border-2 py-4 px-12 text-gsp-black tracking-[-0.25rem] text-xl"
                size="sm"
                key={`${item.href}-${index}`}
              >
                <Link href={item.href} onClick={handleLinkClick}>
                  {`${item.label.replace(' ', '_').toLowerCase()}_`}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
