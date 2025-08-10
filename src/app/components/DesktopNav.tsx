'use client'

import React from 'react'
import Link from 'next/link'
import { NavData } from '@/app/types'
import Image from 'next/image'

interface DesktopNavProps {
  navData: NavData
}

export default function DesktopNav({ navData }: DesktopNavProps) {
  // const [showDropdown, setShowDropdown] = useState(false)

  console.log('navdata', navData)

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-screen bg-blend-exclusion">
        <div className="w-full h-16 flex items-center justify-evenly ">
          <div className="flex items-center justify-evenly w-full px-6">
            {/* Left Navigation Items */}
            {navData.inDaClub && (
              <Link
                href="/in-da-club"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold hidden md:block "
              >
                in da club
              </Link>
            )}

            {navData.atTheFest && (
              <Link
                href="/at-the-fest"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold"
              >
                at the fest
              </Link>
            )}

            {/* Center Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-gsp-gold font-bold text-2xl tracking-wider">
                <Image
                  src="/images/gsp-logo-white.png"
                  className="h-8 w-8"
                  width={100}
                  height={100}
                  alt="gsp logo"
                />
              </div>
            </Link>

            {/* Right Navigation Items */}
            {navData.onTheStreet && (
              <Link
                href="/on-the-street"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold"
              >
                on the street
              </Link>
            )}

            {/* Live on Stage - Simple Link for now since it's a single document */}
            {navData.liveOnStage && (
              <Link
                href="/live-on-stage"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold hidden md:block "
              >
                live on stage
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sideways Navigation Links */}
      <div className="md:hidden fixed top-1/2 left-0 z-50 -rotate-90">
        {/* Left Sideways Link */}

        {navData.inDaClub && (
          <Link
            href="/"
            className="text-gsp-white duration-300 hover:bg-gsp-green border-gsp-green transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold hover:saturate-200"
          >
            in da club
          </Link>
        )}
      </div>

      <div className="md:hidden fixed top-1/2 right-0 z-50 rotate-90">
        {/* Left Sideways Link */}
        {/* Right Sideways Link */}
        {navData.liveOnStage && (
          <Link
            // to do fix href
            href="/"
            className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold hover:bg-gsp-green hover:border-4 border-gsp-green"
          >
            live on stage
          </Link>
        )}
      </div>
      {/* Bottom Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 w-screen ">
        <div className="w-full h-16 flex items-center justify-evenly">
          <div className="flex items-center justify-evenly w-full px-6">
            {navData.freaks && navData.freaks.length > 0 && (
              <>
                <Link
                  href="/freaks"
                  className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-lg tracking-wider hover:no-underline hover:text-gsp-gold block"
                >
                  meet the freaks
                </Link>
              </>
            )}

            <Link
              href="/contact"
              className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-lg tracking-wider hover:no-underline hover:text-gsp-gold hidden md:block"
            >
              contact the freaks
            </Link>
            <Link
              href="/contact"
              className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-lg tracking-wider hover:no-underline hover:text-gsp-gold block md:hidden"
            >
              contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
