import FloatingImages from './FloatingImages'

export default function FloatingDecorations() {
  // Replace these with your actual image paths
  const decorationImages = [
    // '/gsp-logo-black.png',
    // '/demon-black.png',
    // '/birge-black.png',
    '/gsp-logo-white.png',
    '/demon-white.png',
    '/birge-white.png',
    '/gsp-logo-white.png',
    '/demon-white.png',
    '/birge-white.png',
    '/gsp-logo-white.png',
    '/demon-white.png',
    '/birge-white.png',
  ]

  return (
    <FloatingImages
      images={decorationImages}
      maxImages={8}
      minSize={80} // Minimum size around 180px
      maxSize={120} // Maximum size around 220px
    />
  )
}
