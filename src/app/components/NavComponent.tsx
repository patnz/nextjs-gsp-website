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

// import 'gsp-logo'
import Image from 'next/image'
import DropdownComponent from './Dropdown'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = [
    'Shows',
    // 'Projects',
    // 'Members',
    // 'Community',
    // 'About',
    // 'Links',
  ]

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className=" bg-gsp-gold border-gsp-black"
    >
      {/* <DrawerComponent></DrawerComponent> */}
      <NavbarContent>
        <NavbarBrand className="flex justify-start">
          {/* <p className="font-bold text-inherit border-black">logo</p> */}
          <Image src="/gsp-logo.png" alt="GSP Logo" width={36} height={36} />
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarContent className="hidden lg:flex gap-[1vw]" justify="center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button
              className="font-orbitron text-md rounded-none border-gsp-gold/80 border-2 drop-shadow-md"
              size="sm"
            >
              {item.toUpperCase()}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="flex flex-col gap-4 overflow-y-scroll py-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="text-gspGreen">
            <Button
              className="font-orbitron text-md py-6 drop-shadow-md animate-appearance-in w-full"
              size="md"
            >
              {item.toUpperCase()}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <DropdownComponent />
    </Navbar>
  )
}
