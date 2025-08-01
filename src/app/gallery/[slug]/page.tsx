import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const GALLERY_QUERY = `*[_type == "gallery" && slug.current == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const gallery = await client.fetch<SanityDocument>(
    GALLERY_QUERY,
    await params,
    options
  )

  // Handle the case where gallery doesn't exist
  if (!gallery) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/galleries" className="hover:underline">
          ← back to galleries
        </Link>
        <h1 className="text-4xl mb-8">{`gallery not found :(`}</h1>
      </main>
    )
  }

  return (
    <main className="container mx-auto min-h-screen max-w-5xl flex flex-col gap-4  p-4">
      <div className="w-full flex text-2xl md:text-4xl my-8 text-center justify-center">
        <h1 className="w-fit border-b-2 border-gsp-white/80 px-6 pt-2 animate-appearance-in">
          {gallery.title.toLowerCase()}
        </h1>
      </div>

      {gallery.description && (
        <div className="prose max-w-none mb-8 mx-auto text-center max-w-2xl">
          {typeof gallery.description === 'string' ? (
            <p>{gallery.description.toLowerCase()}</p>
          ) : (
            Array.isArray(gallery.description) && (
              <PortableText value={gallery.description} />
            )
          )}
        </div>
      )}

      {/* Gallery grid */}
      {gallery.images && gallery.images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.images.map(
            (image: SanityImageSource & { alt?: string }, index: number) => {
              const imageUrl = urlFor(image)?.width(640).height(480).url() || ''
              const alt = image.alt || `Gallery image ${index + 1}`

              return (
                <div
                  key={index}
                  className="border-2 border-gsp-white/80 overflow-hidden"
                >
                  <Image
                    src={imageUrl}
                    alt={alt}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                    width={640}
                    height={480}
                  />
                </div>
              )
            }
          )}
        </div>
      ) : (
        <p className="text-center text-gsp-white/60 my-8">
          No images in this gallery yet.
        </p>
      )}
    </main>
  )
}
