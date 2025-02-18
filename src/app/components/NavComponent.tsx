'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  // NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  // Link,
  Button,
} from '@heroui/react'
// import DrawerComponent from './DrawerComponent'

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = [
    'Shows',
    'Projects',
    'Members',
    'Community',
    'About',
    'Links',
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      {/* <DrawerComponent></DrawerComponent> */}
      <NavbarContent>
        <NavbarBrand>
          <div className="w-full flex justify-start">
            <p className="font-bold text-inherit border-black">logo</p>
          </div>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button className="font-amaticSc text-[5vh]" size="sm">
              {item}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="flex flex-col gap-4 overflow-y-scroll py-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="">
            <Button
              className="font-amaticSc text-[8vh] py-6 drop-shadow-md animate-appearance-in w-full"
              size="md"
            >
              {item}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
