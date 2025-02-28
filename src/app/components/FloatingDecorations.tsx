import FloatingImages from './FloatingImages'

export default function FloatingDecorations() {
  const decorationImages = [
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
      minSize={80} // Minimum size around 80px
      maxSize={120} // Maximum size around 120px
    />
  )
}
