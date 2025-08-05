'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavData } from '@/app/types'
import { processNavData } from '@/app/utils/navUtils'

interface NavComponentProps {
  data: NavData
}

export default function Navigation({ data }: NavComponentProps) {
  const navStructure = processNavData(data)

  console.log('Navigation data:', navStructure)

  return (
    <>
      {/* <div className="fixed z-40 w-full h-16 flex">
        <Link
          href="/"
          // onClick={handleLinkClick}
          className="flex items-center justify-center px-4"
        >
          <Image
            src="/images/gsp-logo.png"
            alt="GSP Logo"
            width={36}
            height={36}
          />
        </Link>
      </div> */}
      <div className="fixed z-30 w-full h-screen flex flex-col items-center justify-center opacity-0 animate-fade-in duration-100">
        <div className="grid grid-cols-3 grid-rows-3 w-screen lg:w-2/3 h-full md:h-4/5 px-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <Link
              className="text-4xl md:text-6xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full -skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
              onClick={() => {
                console.log('clicked shows')
              }}
              href="/shows"
            >
              <span>shows</span>
            </Link>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {/* empty grid item */}
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
            <Link
              className="text-3xl md:text-5xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
              onClick={() => {
                console.log('clicked projects')
              }}
              href="/projects"
            >
              <span>projects</span>
            </Link>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {/* empty grid item */}
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {/* empty grid item */}
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {/* empty grid item */}
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
            <Link
              className="text-4xl md:text-6xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
              onClick={() => {
                console.log('clicked collabs')
              }}
              href="/collabs"
            >
              <span>collabs</span>
            </Link>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {/* empty grid item */}
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
            <Link
              className="text-4xl md:text-6xl font-extrabold p-2 bg-gsp-black/70 border-y-4 md:border-y-8 border-gsp-white border-dotted text-gsp-white rounded-full -skew-x-12 w-16 h-16 md:w-28 md:h-24 flex items-center justify-center hover:scale-110 active:scale-[60] transition-all hover:border-gsp-gold duration-300 hover:no-underline"
              onClick={() => {
                console.log('clicked freaks')
              }}
              href="/freaks"
            >
              <span>freaks</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
