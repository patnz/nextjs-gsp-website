'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface FloatingImage {
  id: number
  src: string
  alt: string
  x: number
  y: number
  size: number
  xSpeed: number
  ySpeed: number
  visible: boolean
}

interface FloatingImagesProps {
  images: string[]
  maxImages?: number
  minSize?: number
  maxSize?: number
}

export default function FloatingImages({
  images,
  maxImages = 5,
  minSize = 150,
  maxSize = 250,
}: FloatingImagesProps) {
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Set up dimensions on mount
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial dimensions
    updateDimensions()

    // Update dimensions on resize
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Initialize floating images
  useEffect(() => {
    if (dimensions.width === 0 || images.length === 0) return

    const initialImages: FloatingImage[] = Array.from(
      { length: Math.min(maxImages, images.length) },
      (_, i) => {
        const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize // Random size between minSize and maxSize
        return {
          id: i,
          src: images[i % images.length],
          alt: `Floating decoration ${i + 1}`,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size,
          xSpeed: (Math.random() - 0.5) * 0.5, // Slower speed for larger images
          ySpeed: (Math.random() - 0.5) * 0.5,
          visible: true,
        }
      }
    )

    setFloatingImages(initialImages)
  }, [dimensions, images, maxImages, minSize, maxSize])

  // Animation loop
  useEffect(() => {
    if (floatingImages.length === 0 || dimensions.width === 0) return

    const animationFrame = requestAnimationFrame(() => {
      setFloatingImages((prevImages) => {
        return prevImages.map((img) => {
          let { x, y, xSpeed, ySpeed, visible, size } = img

          // Move the image
          x += xSpeed
          y += ySpeed

          // Check if image is outside the viewport
          const isOutside =
            x < -size ||
            x > dimensions.width + size ||
            y < -size ||
            y > dimensions.height + size

          // If image is outside and visible, make it invisible
          if (isOutside && visible) {
            visible = false
          }

          // If image is outside and invisible, reposition it to re-enter from a random edge
          if (isOutside && !visible) {
            // Randomly decide which edge to enter from
            const edge = Math.floor(Math.random() * 4)

            if (edge === 0) {
              // Top
              x = Math.random() * dimensions.width
              y = -size
              ySpeed = Math.abs(ySpeed)
            } else if (edge === 1) {
              // Right
              x = dimensions.width + size
              y = Math.random() * dimensions.height
              xSpeed = -Math.abs(xSpeed)
            } else if (edge === 2) {
              // Bottom
              x = Math.random() * dimensions.width
              y = dimensions.height + size
              ySpeed = -Math.abs(ySpeed)
            } else {
              // Left
              x = -size
              y = Math.random() * dimensions.height
              xSpeed = Math.abs(xSpeed)
            }

            visible = true
          }

          return { ...img, x, y, xSpeed, ySpeed, visible }
        })
      })
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [floatingImages, dimensions])

  // Handle image click
  const handleClick = (id: number) => {
    setFloatingImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, visible: false } : img
      )
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 opacity-0 animate-fade-in-floating mix-blend-overlay">
      <AnimatePresence>
        {floatingImages.map(
          (img) =>
            img.visible && (
              <motion.div
                key={img.id}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  left: img.x,
                  top: img.y,
                  width: img.size,
                  height: img.size,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }} // Slightly transparent
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleClick(img.id)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.size}
                  height={img.size}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  )
}
