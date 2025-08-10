'use client'

import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Fix mobile viewport height issue
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }
    setVh()
    window.addEventListener('resize', setVh)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', setVh)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!section) {
    notFound()
  }

  const images = section.images || []
  const mediaItems = [
    ...images.map((img: SanityImageSource) => ({ type: 'image', data: img })),
  ]

  const viewportHeight =
    typeof window !== 'undefined' ? window.innerHeight : 800

  const maxScroll = mediaItems.length * viewportHeight
  const scrollProgress = Math.min(
    scrollY / Math.max(maxScroll - viewportHeight, 1),
    1
  )

  const horizontalTranslate = -scrollProgress * (mediaItems.length - 1) * 100

  return (
    <>
      {/* Scroll height based on number of items */}
      <div style={{ height: `${mediaItems.length * 100}vh` }} />

      {/* Gallery */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div
          className="flex h-[calc(var(--vh)*100)] transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${horizontalTranslate}vw)`,
            width: `${mediaItems.length * 100}vw`,
          }}
        >
          {mediaItems.length === 0 ? (
            <div className="h-[calc(var(--vh)*100)] w-screen flex items-center justify-center">
              <p className="text-2xl text-gsp-white/60">no media found</p>
            </div>
          ) : (
            mediaItems.map((item, index) => {
              const isFirst = index === 0

              if (item.type === 'image') {
                let imageUrl = null
                if (item.data.asset && item.data.asset._ref) {
                  imageUrl = urlFor(item.data)?.width(1920).url()
                } else if (
                  item.data._upload &&
                  item.data._upload.previewImage
                ) {
                  imageUrl = item.data._upload.previewImage
                }
                if (!imageUrl) return null

                return (
                  <div
                    key={`image-${index}`}
                    className={`h-[calc(var(--vh)*100)] flex-shrink-0 relative flex items-center ${
                      isFirst ? 'w-screen' : 'w-auto'
                    }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={item.data.alt || section.title || ''}
                      width={1920}
                      height={1080}
                      className={
                        isFirst
                          ? 'w-full h-full object-cover'
                          : 'h-full w-auto object-contain'
                      }
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
                    className={`h-[calc(var(--vh)*100)] flex-shrink-0 relative flex items-center ${
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
            })
          )}
        </div>
      </div>
    </>
  )
}
