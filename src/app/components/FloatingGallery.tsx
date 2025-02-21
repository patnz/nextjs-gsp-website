'use client'

const FloatingGallery = () => {
  const images = [
    '/beale.png',
    '/birge.png',
    '/fishlak.png',
    '/mantis.png',
    '/train-gang.png',
    '/vandoor.png',
  ]

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          className="absolute h-1/4 object-contain"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 50 + 25}%`,
            animation: ` ${10 + index * 2}s infinite ease-in-out`,
            animationDelay: `-${index * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingGallery
