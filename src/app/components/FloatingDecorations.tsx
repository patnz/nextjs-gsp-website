import FloatingImages from './FloatingImages'

export default function FloatingDecorations() {
  const decorationImages = [
    '/images/gsp-logo-white.png',
    '/images/demon-white.png',
    '/images/birge-white.png',
    '/images/gsp-logo-white.png',
    '/images/demon-white.png',
    '/images/birge-white.png',
    '/images/gsp-logo-white.png',
    '/images/demon-white.png',
    '/images/birge-white.png',
  ]

  return (
    <FloatingImages
      images={decorationImages}
      maxImages={8}
      minSize={80} // Minimum size 80px
      maxSize={120} // Maximum size 120px
    />
  )
}
