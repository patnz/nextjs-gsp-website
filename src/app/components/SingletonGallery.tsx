'use client'

import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

interface SingletonGalleryPageProps {
  sectionType: 'inDaClub' | 'atTheFest' | 'onTheStreet' | 'liveOnStage'
  sectionData: SanityDocument
}

export default function SingletonGalleryPage({
  sectionData: section,
}: SingletonGalleryPageProps) {
  const images = section.images || []
  const mediaItems = [
    ...images.map((img: SanityImageSource) => ({ type: 'image', data: img })),
  ]

  const galleryRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  )
  const momentumRef = useRef<{
    velocity: number
    animationId: number | null
    lastTime: number
  }>({ velocity: 0, animationId: null, lastTime: 0 })

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (!galleryRef.current) return

      const gallery = galleryRef.current
      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth

      // Convert vertical scroll to horizontal scroll
      const scrollAmount = e.deltaY * 2 // Adjust multiplier for sensitivity
      const currentScrollLeft = gallery.scrollLeft
      const newScrollLeft = Math.max(
        0,
        Math.min(maxScrollLeft, currentScrollLeft + scrollAmount)
      )

      gallery.scrollLeft = newScrollLeft
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || !galleryRef.current) return

      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const currentTime = Date.now()
      const timeDelta = currentTime - touchStartRef.current.time

      // Only handle if vertical movement is dominant
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        e.preventDefault()

        const gallery = galleryRef.current
        const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth

        // Convert vertical touch movement to horizontal scroll
        const scrollAmount = -deltaY * 2
        const currentScrollLeft = gallery.scrollLeft
        const newScrollLeft = Math.max(
          0,
          Math.min(maxScrollLeft, currentScrollLeft + scrollAmount)
        )

        gallery.scrollLeft = newScrollLeft

        // Calculate velocity for momentum (pixels per ms)
        if (timeDelta > 0) {
          momentumRef.current.velocity = scrollAmount / timeDelta
        }

        // Update touch start position for continuous movement
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: currentTime,
        }
      }
    }

    const applyMomentum = () => {
      if (!galleryRef.current || Math.abs(momentumRef.current.velocity) < 0.1) {
        momentumRef.current.animationId = null
        return
      }

      const gallery = galleryRef.current
      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth
      const currentScrollLeft = gallery.scrollLeft

      // Apply velocity with decay
      const scrollAmount = momentumRef.current.velocity * 16 // 16ms per frame
      const newScrollLeft = Math.max(
        0,
        Math.min(maxScrollLeft, currentScrollLeft + scrollAmount)
      )

      gallery.scrollLeft = newScrollLeft

      // Apply friction (decay velocity)
      momentumRef.current.velocity *= 0.95

      // Continue animation
      momentumRef.current.animationId = requestAnimationFrame(applyMomentum)
    }

    const handleTouchEnd = () => {
      // Cancel any existing momentum animation
      if (momentumRef.current.animationId) {
        cancelAnimationFrame(momentumRef.current.animationId)
      }

      // Start momentum animation if there's significant velocity
      if (Math.abs(momentumRef.current.velocity) > 0.5) {
        momentumRef.current.animationId = requestAnimationFrame(applyMomentum)
      }

      touchStartRef.current = null
    }

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)

      // Clean up any running momentum animation
      if (momentumRef.current.animationId) {
        cancelAnimationFrame(momentumRef.current.animationId)
      }
    }
  }, [])

  if (mediaItems.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-gsp-white/60">no media found</p>
      </div>
    )
  }

  return (
    <>
      {/* Gallery */}
      <div className="fixed inset-0">
        <div
          ref={galleryRef}
          className="flex h-full w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            scrollBehavior: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {mediaItems.map((item, index) => {
            const isFirst = index === 0

            if (item.type === 'image') {
              let imageUrl = null
              if (item.data.asset && item.data.asset._ref) {
                imageUrl = urlFor(item.data)?.width(1920).url()
              } else if (item.data._upload && item.data._upload.previewImage) {
                imageUrl = item.data._upload.previewImage
              }
              if (!imageUrl) return null

              return (
                <div
                  key={`image-${index}`}
                  className={`flex-shrink-0 relative ${
                    isFirst ? 'w-full' : 'w-auto'
                  }`}
                >
                  <Image
                    src={imageUrl}
                    alt={item.data.alt || section.title || ''}
                    width={1920}
                    height={1080}
                    className={`${
                      isFirst
                        ? 'w-full h-full object-cover'
                        : 'h-full w-auto object-contain'
                    }`}
                    priority={index < 3}
                    quality={90}
                  />
                </div>
              )
            }

            if (item.type === 'video') {
              const videoUrl = item.data.asset?.url || item.data.url
              if (!videoUrl) return null

              return (
                <div
                  key={`video-${index}`}
                  className={`flex-shrink-0 relative flex items-center ${
                    isFirst ? 'w-screen' : 'w-auto'
                  }`}
                >
                  <video
                    className={
                      isFirst
                        ? 'w-full h-full object-cover'
                        : 'h-full w-auto object-contain'
                    }
                    controls
                    muted
                    playsInline
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
