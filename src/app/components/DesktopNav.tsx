'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { LiveOnStage, NavData } from '@/app/types'
import Image from 'next/image'

interface DesktopNavProps {
  navData: NavData
}

export default function DesktopNav({ navData }: DesktopNavProps) {
  const [sideLinkTop, setSideLinkTop] = useState<number | null>(null)
  const [showsMenuToggle, setShowsMenuToggle] = useState<boolean | null>(false)

  const handleShowsMenuToggle = () => {
    if (showsMenuToggle) {
      console.log('toggling off')
      setShowsMenuToggle(false)
    } else {
      console.log('toggling on')
      setShowsMenuToggle(true)
    }
  }

  useEffect(() => {
    console.log('window innner height->', window.innerHeight)
    setSideLinkTop(window.innerHeight / 2)
  }, [])

  return (
    <div className="text-gsp-white text-xl xs:text-2xl lg:text-3xl font-extrabold">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-screen bg-blend-exclusion">
        <div className="w-full h-16 flex items-center justify-evenly ">
          <div className="flex items-center justify-evenly w-full px-6">
            {/* Left Navigation Items */}
            {navData.inDaClub && (
              <div className="group hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200 hidden md:block">
                <>
                  <Link
                    href="/in-da-club"
                    className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500 z-40"
                  >
                    in da club
                  </Link>
                  <p className=" hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow group-hover:drop-shadow-2xl ml-[1px] mt-[1px] z-30 duration-100">
                    in da club
                  </p>
                </>
              </div>
            )}

            {navData.atTheFest && (
              <div className="group hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200">
                <>
                  <Link
                    href="/at-the-fest"
                    className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500 z-40"
                  >
                    at the fest
                  </Link>
                  <p className=" hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow group-hover:drop-shadow-2xl ml-[1px] mt-[1px] z-30 duration-100">
                    at the fest
                  </p>
                </>
              </div>
            )}

            {/* Center Logo */}

            <div className="hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200">
              <>
                <Link
                  href="/"
                  className="relative flex group items-center hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500"
                >
                  <Image
                    src="/images/gsp-logo-white.png"
                    className="absolute h-8 w-8"
                    width={100}
                    height={100}
                    alt="gsp logo"
                  />
                  <Image
                    src="/images/gsp-logo-white.png"
                    className=" h-8 w-8 group-hover:bg-gsp-gold rounded-full group-hover:animate-slow-spin "
                    width={100}
                    height={100}
                    alt="gsp logo"
                  />
                </Link>
              </>
            </div>

            {/* Right Navigation Items */}
            {navData.onTheStreet && (
              <div className="group hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200 hidden md:block">
                <>
                  <Link
                    href="/on-the-street"
                    className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500 z-40"
                  >
                    on the street
                  </Link>
                  <p className=" hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow ml-[1px] mt-[1px] z-30 duration-100">
                    on the street
                  </p>
                </>
              </div>
            )}

            {navData.liveOnStage && (
              <>
                <div className="relative group  saturate-200">
                  <button
                    onClick={handleShowsMenuToggle}
                    className="hover:scale-110 duration-200 absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all z-40"
                  >
                    live on stage
                  </button>
                  <p className="group-hover:scale-110 hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow ml-[1px] mt-[1px] z-30 duration-100">
                    live on stage
                  </p>

                  {showsMenuToggle && (
                    <div className="absolute left-0 flex flex-col items-center w-full gap-2 mt-2">
                      {navData.liveOnStage &&
                        navData.liveOnStage.map((show: LiveOnStage) => {
                          return (
                            <Link
                              key={show._id}
                              href={`/shows/${show.title}`}
                              className="hover:scale-105 duration-300 transition-all hover:no-underline hover:text-gsp-gold"
                            >
                              {show.title}
                            </Link>
                          )
                        })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sideways Navigation Links */}
      {sideLinkTop !== null && (
        <>
          <div
            className="md:hidden fixed left-0 z-50 -rotate-90 hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200"
            style={{ top: sideLinkTop }}
          >
            {navData.inDaClub && (
              <>
                <Link
                  href="/in-da-club"
                  className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500"
                >
                  in da club
                </Link>
                <p className=" hover:no-underline text-gsp-black  ml-[1px] mt-[1px]">
                  in da club
                </p>
              </>
            )}
          </div>

          <div
            className="md:hidden fixed right-0 z-50 rotate-90"
            style={{ top: sideLinkTop }}
          >
            {navData.onTheStreet && (
              <Link
                href="/on-the-street"
                className="hover:scale-105 duration-300 transition-all hover:no-underline hover:text-gsp-gold"
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
                <div className="group hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200">
                  <>
                    <Link
                      href="/freaks"
                      className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500 z-40"
                    >
                      meet the freaks
                    </Link>
                    <p className=" hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow group-hover:drop-shadow-2xl ml-[1px] mt-[1px] z-30 duration-100">
                      meet the freaks
                    </p>
                  </>
                </div>
              </>
            )}

            {/* contact on large device */}
            <div className="group hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200 hidden md:block">
              <>
                <Link
                  href="/contact"
                  className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500 z-40"
                >
                  contact the freaks
                </Link>
                <p className=" hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow group-hover:drop-shadow-2xl ml-[1px] mt-[1px] z-30 duration-100">
                  contact the freaks
                </p>
              </>
            </div>

            {/* contact on small device */}
            <div className="group hover:scale-110 duration-200 transition-all hover:no-underline hover:text-gsp-gold saturate-200 block md:hidden">
              <>
                <Link
                  href="/contact"
                  className="absolute hover:no-underline text-gsp-white hover:text-gsp-gold transition-all duration-500 z-40"
                >
                  contact
                </Link>
                <p className=" hover:no-underline text-gsp-black group-hover:text-gsp-white group-hover:animate-flicker-slow group-hover:drop-shadow-2xl ml-[1px] mt-[1px] z-30 duration-100">
                  contact
                </p>
              </>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
