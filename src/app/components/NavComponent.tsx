'use client'

// components/Navigation/NavComponent.tsx
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import { ChevronDown } from 'lucide-react'
import { NavData } from '../sanity/types'
import Link from 'next/link'

interface NavComponentProps {
  data: NavData
}

export default function NavComponent({ data }: NavComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const router = useRouter()

  // Define navigation structure
  const navStructure = [
    {
      label: 'Shows',
      items: data.shows.map((show) => ({
        label: `${show.title} (${show.year})`,
        href: `/shows/${show.slug.current}`,
      })),
      // defaultHref: '/shows',
      defaultHref: '/',
    },
    {
      label: 'Projects',
      items: data.projects.map((project) => ({
        label: project.title,
        href: `/projects/${project.slug.current}`,
      })),
      // defaultHref: '/projects',
      defaultHref: '/',
    },
    {
      label: 'Team',
      items: data.teamMembers.map((member) => ({
        label: member.name,
        href: `/team/${member._id}`,
      })),
      // defaultHref: '/team',
      defaultHref: '/',
    },
    {
      label: 'Links',
      items: data.links.map((link) => ({
        label: link.title,
        href: link.url,
      })),
      // defaultHref: '/links',
      defaultHref: '/',
    },
    {
      label: 'Community',
      items: data.communityPosts.map((post) => ({
        label: post.title,
        href: `/community/${post.slug.current}`,
      })),
      // defaultHref: '/community',
      defaultHref: '/',
    },
    {
      label: 'About',
      items: [],
      // defaultHref: '/about',
      defaultHref: '/',
    },
  ]

  // Desktop navigation item renderer
  const renderDesktopNavItem = (nav: (typeof navStructure)[0]) => {
    if (nav.items.length === 0) {
      return (
        <NavbarMenuItem key={nav.label}>
          <Button
            className="font-orbitron text-md rounded-none border-gsp-gold/80 border-2 drop-shadow-md"
            size="sm"
            onClick={() => router.push(nav.defaultHref)}
          >
            {nav.label.toUpperCase()}
          </Button>
        </NavbarMenuItem>
      )
    }

    return (
      <NavbarMenuItem key={nav.label}>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="font-orbitron text-md rounded-none border-gsp-gold/80 border-2 drop-shadow-md"
              size="sm"
              // endContent={<ChevronDown className="h-4 w-4" />}
            >
              {nav.label.toUpperCase()}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label={`${nav.label} navigation`}
            onAction={(key) => router.push(key as string)}
            className="max-h-[400px] overflow-y-auto"
          >
            {nav.items.map((item) => (
              <DropdownItem key={item.href}>{item.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarMenuItem>
    )
  }

  // Mobile navigation item renderer
  const renderMobileNavItem = (nav: (typeof navStructure)[0]) => {
    if (nav.items.length === 0) {
      return (
        <NavbarMenuItem key={nav.label} className="text-gspGreen">
          <Button
            className="font-orbitron text-md py-6 drop-shadow-md animate-appearance-in w-full"
            size="md"
            onClick={() => {
              router.push(nav.defaultHref)
              setIsMenuOpen(false)
            }}
          >
            {nav.label.toUpperCase()}
          </Button>
        </NavbarMenuItem>
      )
    }

    return (
      <NavbarMenuItem key={nav.label} className="text-gspGreen">
        <Dropdown className="w-full">
          <DropdownTrigger className="w-full">
            <Button
              className="font-orbitron text-md py-6 drop-shadow-md animate-appearance-in w-full"
              size="md"
              // endContent={<ChevronDown className="h-4 w-4" />}
            >
              {nav.label.toUpperCase()}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label={`${nav.label} navigation`}
            onAction={(key) => {
              router.push(key as string)
              setIsMenuOpen(false)
            }}
            className="max-h-[400px] overflow-y-auto"
          >
            {nav.items.map((item) => (
              <DropdownItem key={item.href}>{item.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarMenuItem>
    )
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gsp-gold border-gsp-black"
    >
      <NavbarContent>
        <NavbarBrand className="flex justify-start">
          <Link href="/">
            <Image src="/gsp-logo.png" alt="GSP Logo" width={36} height={36} />
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden lg:flex gap-[1vw]" justify="center">
        {navStructure.map(renderDesktopNavItem)}
      </NavbarContent>

      {/* Mobile Navigation */}
      <NavbarMenu className="flex flex-col gap-4 overflow-y-scroll py-5">
        {navStructure.map(renderMobileNavItem)}
      </NavbarMenu>
    </Navbar>
  )
}
