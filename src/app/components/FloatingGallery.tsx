'use client'
import { useMemo } from 'react'

const FloatingGallery = () => {
  const images = [
    { file: '/beale.png', name: 'beale' },
    { file: '/birge.png', name: 'birge' },
    { file: '/fishlak.png', name: 'fishlak' },
    { file: '/mantis.png', name: 'mantis' },
    { file: '/train-gang.png', name: 'the gang' },
    { file: '/vandoor.png', name: 'vandoor' },
  ]

  // Arrays of Tailwind classes for random positioning and rotation
  const translates = [
    'translate-x-0',
    'translate-x-4',
    'translate-x-8',
    '-translate-x-4',
    '-translate-x-8',
    'translate-y-0',
    'translate-y-4',
    'translate-y-8',
    '-translate-y-4',
    '-translate-y-8',
  ]

  const rotates = ['rotate-0', 'rotate-3', 'rotate-6', '-rotate-3', '-rotate-6']

  // Generate random styles for each image once on component mount
  const imageStyles = useMemo(() => {
    return images.map((_, index) => ({
      translateClass: translates[Math.floor(Math.random() * translates.length)],
      rotateClass: rotates[Math.floor(Math.random() * rotates.length)],
      animationDuration: `${10 + index * 2}s`,
      animationDelay: `-${index * 2}s`,
    }))
  }, [])

  return (
    <div className="fixed h-full z-20 w-full overflow-hidden flex flex-row flex-wrap lg:py-16 p-4 justify-center items-center gap-4">
      {images.map((src, index) => (
        <div
          key={index}
          className={`relative transition-transform duration-1000 ease-in-out 
            ${imageStyles[index].translateClass} 
            ${imageStyles[index].rotateClass}
            hover:scale-110 hover:z-30`}
        >
          <img
            src={src.file}
            alt={`Image ${index + 1}`}
            className="w-24 lg:w-32 object-contain"
            title={`${src.name} says hello!`}
            style={{
              animation: `float ${imageStyles[index].animationDuration} infinite ease-in-out`,
              animationDelay: imageStyles[index].animationDelay,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default FloatingGallery
