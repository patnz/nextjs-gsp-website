'use client'

import React from 'react'
import { NavbarMenu, Accordion, AccordionItem } from '@heroui/react'
import Link from 'next/link'
import { ProcessedMobileNavItem } from '@/app/types'
interface MobileNavProps {
  isMenuOpen: boolean
  navData: ProcessedMobileNavItem[]
  handleLinkClick: () => void
}

export default function MobileNav({
  navData,
  handleLinkClick,
}: MobileNavProps) {
  const [openAccordions, setOpenAccordions] = React.useState<Set<string>>(
    new Set([])
  )

  const handleAccordionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys instanceof Set) {
      setOpenAccordions(keys as Set<string>)
    }
  }

  return (
    <NavbarMenu className="pt-6 px-2 bg-black/30 backdrop-blur-md">
      <Accordion
        className="px-2 py-2 gap-2"
        selectionMode="multiple"
        selectedKeys={openAccordions}
        onSelectionChange={handleAccordionChange}
      >
        {navData.map((nav) => (
          <AccordionItem
            key={nav.label}
            aria-label={nav.label}
            title={
              <span className="w-full h-full transition-colors font-courierPrime px-2 rounded-none text-gsp-black tracking-[-0.2rem] text-xl">
                {nav.label}
              </span>
            }
            className="px-4 mb-4 border-2 border-x-[3px] border-gsp-white bg-gsp-white/80"
          >
            <div className="flex flex-col items-end gap-2 text-right">
              {nav.items.map((item) => (
                <React.Fragment key={item.href}>
                  <div className="w-full border-b-2 border-dashed border-gsp-black/50"></div>
                  <Link
                    href={item.href}
                    className="w-full p-2 font-courierPrime border-none rounded-none text-gsp-black hover:text-gsp-white hover:no-underline duration-200 tracking-[-0.2rem] text-xl"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </NavbarMenu>
  )
}
