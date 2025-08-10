'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { NavData } from '@/app/types'
import Image from 'next/image'

interface DesktopNavProps {
  navData: NavData
}

export default function DesktopNav({ navData }: DesktopNavProps) {
  const [sideLinkTop, setSideLinkTop] = useState<number | null>(null)

  useEffect(() => {
    console.log('window innner height->', window.innerHeight)
    setSideLinkTop(window.innerHeight / 2)
  }, [])

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
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold hidden md:block"
              >
                on the street
              </Link>
            )}

            {navData.liveOnStage && (
              <Link
                href="/live-on-stage"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold"
              >
                live on stage
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sideways Navigation Links */}
      {sideLinkTop !== null && (
        <>
          <div
            className="md:hidden fixed left-0 z-50 -rotate-90 "
            style={{ top: sideLinkTop }}
          >
            {navData.inDaClub && (
              <Link
                href="/in-da-club"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold"
              >
                in da club
              </Link>
            )}
          </div>

          <div
            className="md:hidden fixed right-0 z-50 rotate-90"
            style={{ top: sideLinkTop }}
          >
            {navData.onTheStreet && (
              <Link
                href="/on-the-street"
                className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-xl tracking-wider hover:no-underline hover:text-gsp-gold"
              >
                on the street
              </Link>
            )}
          </div>
        </>
      )}

      {/* Bottom Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 w-screen ">
        <div className="w-full h-16 flex items-center justify-evenly">
          <div className="flex items-center justify-evenly w-full px-6">
            {navData.freaks && navData.freaks.length > 0 && (
              <>
                <Link
                  href="/"
                  className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-lg tracking-wider hover:no-underline hover:text-gsp-gold block"
                >
                  meet the freaks
                </Link>
              </>
            )}

            <Link
              href="/"
              className="text-gsp-white hover:scale-105 duration-300 transition-all font-extrabold text-lg tracking-wider hover:no-underline hover:text-gsp-gold hidden md:block"
            >
              contact the freaks
            </Link>
            <Link
              href="/"
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
