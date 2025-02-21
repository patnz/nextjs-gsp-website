import FloatingGallery from './components/FloatingGallery'

export default function HomePage() {
  return (
    <div>
      <main className="bg-gsp-green/90 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <FloatingGallery />
      </main>
    </div>
  )
}
