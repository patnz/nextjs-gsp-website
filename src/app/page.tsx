'use client'

import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavData } from '@/app/types/index'
import { useNavData } from './utils/contextUtils'

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export default function HomePageGallery() {
  const navData: NavData = useNavData()
  const images = navData.homePageGallery?.images || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Autoplay functionality
  useEffect(() => {
    if (images.length <= 1) return

    const startAutoplay = () => {
      autoplayRef.current = setInterval(nextSlide, 4000) // Faster transitions
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }

    startAutoplay()

    return stopAutoplay
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (images.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Image
          src="/images/gsp-logo-white.png"
          className="absolute h-32 w-32"
          width={500}
          height={500}
          alt="Golden Scissor Puppets Logo"
        />
      </div>
    )
  }

  const currentImage = images[currentIndex]

  const getImageUrl = (img: SanityImageSource) => {
    if (img) {
      return urlFor(img)?.width(1920).quality(85).url()
    } else return null
  }

  return (
    <div className="fixed inset-0 bg-black">
      {/* Main slideshow */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            {(() => {
              const imageUrl = getImageUrl(currentImage)
              if (!imageUrl) return null

              return (
                <Image
                  src={imageUrl}
                  alt={currentImage.alt || navData.homePageGallery?.title || ''}
                  fill
                  className="object-cover"
                  priority={currentIndex < 3}
                  quality={85}
                />
              )
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>
    </div>
  )
}
