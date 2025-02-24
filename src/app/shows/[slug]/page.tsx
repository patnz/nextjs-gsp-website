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
      <main className=" container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/" className=" hover:underline">
          ← back to shows
        </Link>
        <h1 className=" text-4xl mb-8">{`show not found :(`}</h1>
      </main>
    )
  }

  // Get the first image from the gallery if it exists
  const showImageUrl =
    show.imageGallery && show.imageGallery.length > 0
      ? urlFor(show.imageGallery[0])?.width(550).height(310).url()
      : null

  return (
    <main className=" container mx-auto min-h-screen max-w-3xl flex flex-col gap-4 font-courierPrime">
      <div className="w-full flex text-2xl md:text-4xl my-8 text-center  justify-center px-4">
        <h1 className="w-fit bg-gsp-white/30 border-2 border-gsp-white/80 px-6 pt-2">
          {`${show.title.toLowerCase()}`}
          <span className="text-base md:text-xl"> {show.year}</span>
        </h1>
      </div>
      {showImageUrl && (
        <Image
          src={showImageUrl}
          alt={show.title}
          className=" aspect-video w-full border-black border-4 mb-8"
          width="550"
          height="310"
        />
      )}
      <div className=" prose max-w-none my-6 p-3 mb-8 text-justify">
        {typeof show.description === 'string' ? (
          <p>{show.description.toLowerCase()}</p>
        ) : (
          Array.isArray(show.description) && (
            <PortableText value={show.description} />
          )
        )}
      </div>

      {/* Press quotes section */}
      {show.pressQuotes && show.pressQuotes.length > 0 && (
        <div className="">
          <div className="w-full flex text-xl my-8 text-center justify-start px-0 md:px-4">
            <h2 className="w-fit bg-gsp-white/30  drop-shadow-xl px-2 pt-1">
              things people said...
            </h2>
          </div>
          <div className=" flex flex-col gap-4 text-justify">
            {show.pressQuotes.map((quote: string, index: number) => (
              <blockquote
                key={index}
                className=" border-l-4 border-gray-200 pl-4 italic"
              >
                {quote.toLowerCase()}
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* Image gallery section */}
      {show.imageGallery && show.imageGallery.length > 1 && (
        <div className=" mt-8">
          <div className="w-full flex text-xl my-8 text-center justify-start px-0 md:px-4">
            <h2 className="w-fit bg-gsp-white/30  drop-shadow-xl px-2 pt-1">
              things people saw...
            </h2>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Skip first image as it's already displayed at the top */}
            {show.imageGallery
              .slice(1)
              .map((image: SanityImageSource, index: number) => (
                <div key={index} className=" bg-gray-100 p-2 rounded">
                  <Image
                    src={urlFor(image)?.width(320).height(240).url() || ''}
                    alt={`Show image ${index + 1}`}
                    className=" w-full h-64 object-cover"
                    width={320}
                    height={240}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <Link href="/" className=" hover:underline">
        ← back to shows
      </Link>
    </main>
  )
}
