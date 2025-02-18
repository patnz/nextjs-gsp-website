import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const SHOW_QUERY = `*[_type == "show" && slug.current == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function ShowPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const show = await client.fetch<SanityDocument>(
    SHOW_QUERY,
    await params,
    options
  )

  // Handle the case where show doesn't exist
  if (!show) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/" className="hover:underline">
          ← Back to shows
        </Link>
        <h1 className="text-4xl font-bold mb-8">Show not found</h1>
      </main>
    )
  }

  // Get the first image from the gallery if it exists
  const showImageUrl =
    show.imageGallery && show.imageGallery.length > 0
      ? urlFor(show.imageGallery[0])?.width(550).height(310).url()
      : null

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to shows
      </Link>
      {showImageUrl && (
        <Image
          src={showImageUrl}
          alt={show.title}
          className="aspect-video rounded-xl w-full"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
      <p className="text-xl mb-8">{show.year}</p>
      <div className="prose max-w-none">
        {typeof show.description === 'string' ? (
          <p>{show.description}</p>
        ) : (
          Array.isArray(show.description) && (
            <PortableText value={show.description} />
          )
        )}
      </div>

      {/* Press quotes section */}
      {show.pressQuotes && show.pressQuotes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Press Quotes</h2>
          <div className="flex flex-col gap-4">
            {show.pressQuotes.map((quote: string, index: number) => (
              <blockquote
                key={index}
                className="border-l-4 border-gray-200 pl-4 italic"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* Image gallery section */}
      {show.imageGallery && show.imageGallery.length > 1 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Skip first image as it's already displayed at the top */}
            {show.imageGallery.slice(1).map((image: any, index: number) => (
              <div key={index} className="bg-gray-100 p-2 rounded">
                <img
                  src={urlFor(image)?.width(320).height(240).url() || ''}
                  alt={`Show image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
