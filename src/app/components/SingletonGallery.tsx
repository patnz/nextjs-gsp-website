'use client'

import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

// Query for singleton documents - fetch the single document of each type
const SINGLETON_QUERY = `*[_type == $type][0] {
  _id,
  _type,
  title,
  slug,
  description,
  images,
  videos,
  collaborators,
  date,
  location,
  festival,
  year,
  venue
}`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

interface SingletonGalleryPageProps {
  sectionType: 'inDaClub' | 'atTheFest' | 'onTheStreet' | 'liveOnStage'
  sectionData: SanityDocument
}

export default function SingletonGalleryPage({
  sectionType,
  sectionData: section,
}: SingletonGalleryPageProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!section) {
    notFound()
  }

  // Get images and videos
  const images = section.images || []
  const videos = section.videos || []

  // Combine into media array
  const mediaItems = [
    ...images.map((img: any) => ({ type: 'image', data: img })),
    ...videos.map((vid: any) => ({ type: 'video', data: vid })),
  ]

  // Calculate horizontal translation based on scroll
  const maxScroll =
    mediaItems.length *
    (typeof window !== 'undefined' ? window.innerHeight : 800)
  const scrollProgress = Math.min(
    scrollY /
      Math.max(
        maxScroll - (typeof window !== 'undefined' ? window.innerHeight : 800),
        1
      ),
    1
  )
  const horizontalTranslate = -scrollProgress * (mediaItems.length - 1) * 100

  return (
    <>
      {/* Create scrollable height based on number of items */}
      <div style={{ height: `${mediaItems.length * 100}vh` }} />

      {/* Fixed gallery that moves horizontally */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div
          className="flex h-screen transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${horizontalTranslate}vw)`,
            width: `${mediaItems.length * 100}vw`,
          }}
        >
          {mediaItems.length === 0 ? (
            <div className="h-screen w-screen flex items-center justify-center">
              <p className="text-2xl text-gsp-white/60">no media found</p>
            </div>
          ) : (
            mediaItems.map((item, index) => {
              if (item.type === 'image') {
                // Handle different image structures
                let imageUrl = null

                if (item.data.asset && item.data.asset._ref) {
                  // Standard Sanity image with asset reference
                  imageUrl = urlFor(item.data)?.width(1200).height(800).url()
                } else if (
                  item.data._upload &&
                  item.data._upload.previewImage
                ) {
                  // Image still uploading - use preview
                  imageUrl = item.data._upload.previewImage
                }

                if (!imageUrl) return null

                return (
                  <div
                    key={`image-${index}`}
                    className="h-screen flex-shrink-0 relative"
                  >
                    <Image
                      src={imageUrl}
                      alt={item.data.alt || section.title || ''}
                      width={1200}
                      height={800}
                      className="h-full w-auto object-cover"
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
                    className="h-screen flex-shrink-0 relative"
                  >
                    <video
                      className="h-full w-auto object-cover"
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
            })
          )}
        </div>

        {/* Scroll progress indicator */}
        {/* {mediaItems.length > 1 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
            <div className="flex items-center text-gsp-white/60">
              <div className="text-sm mr-3">scroll down</div>
              <div className="w-16 h-px bg-gsp-white/30 relative">
                <div
                  className="h-full bg-gsp-white/80 transition-all duration-75"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="text-sm ml-3">→</div>
            </div>
          </div>
        )} */}
      </div>
    </>
  )
}
