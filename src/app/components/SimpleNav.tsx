'use client'

import React from 'react'
// import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SimpleNavigation() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Don't show navigation on homepage (grid nav will be there instead)
  if (isHomePage) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 z-40 flex justify-end items-end w-full">
      <Link
        href="/"
        className="flex items-center justify-center px-2 m-2 md:my-4 md:mx-8 hover:scale-110 transition-all duration-300 hover:no-underline"
        title="Back to Home"
      >
        {/* <Image
          src="/images/gsp-logo.png"
          alt="GSP Logo - Back to Home"
          width={32}
          height={32}
          className="opacity-90"
        /> */}

        <span className="text-gsp-white text-4xl md:text-6xl font-bold hover:no-underline">
          x
        </span>
      </Link>
    </div>
  )
}
