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
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-x-hidden flex flex-row flex-wrap lg:py-16 p-4 justify-center">
      <div className="absolute w-full text-center text-xl text-pink-500">
        testing testing testing testing testing
      </div>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          className="relative w-1/6 lg:w-1/4 object-contain z-10"
          style={{
            animation: ` ${10 + index * 2}s infinite ease-in-out`,
            animationDelay: `-${index * 2}s`,
          }}
        />
      ))}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          className="relative w-1/6 lg:w-1/4 object-contain z-10"
          style={{
            animation: ` ${10 + index * 2}s infinite ease-in-out`,
            animationDelay: `-${index * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingGallery
