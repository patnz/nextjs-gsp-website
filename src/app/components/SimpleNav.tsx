'use client'

import React from 'react'
import Image from 'next/image'
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
    <div className="fixed top-4 left-4 z-40">
      <Link
        href="/"
        className="flex items-center justify-center p-3 bg-gsp-black/80 border-2 border-gsp-white/60 rounded-full hover:border-gsp-gold hover:scale-110 transition-all duration-300 backdrop-blur-sm"
        title="Back to Home"
      >
        <Image
          src="/images/gsp-logo.png"
          alt="GSP Logo - Back to Home"
          width={32}
          height={32}
          className="opacity-90"
        />
      </Link>
    </div>
  )
}
