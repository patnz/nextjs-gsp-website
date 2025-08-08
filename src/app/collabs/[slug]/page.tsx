import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'
// import { div } from 'framer-motion/client'

const COLLABS_QUERY = `*[_type == "collab" && slug.current == $slug][0]`

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
  const collab = await client.fetch<SanityDocument>(
    COLLABS_QUERY,
    await params,
    options
  )

  // Handle the case where collab doesn't exist
  if (!collab) {
    return (
      <main className=" container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/" className=" hover:underline">
          ← back to shows
        </Link>
        <h1 className=" text-8xl mb-8">{`collab not found :(`}</h1>
      </main>
    )
  }

  const mainImage = collab.mainImage ? urlFor(collab.mainImage)?.url() : null

  return (
    <>
      <main className="relative container mx-auto min-h-screen max-w-3xl flex flex-col items-center gap-4 lg:px-32 z-30 text-2xl">
        {mainImage && (
          <>
            <Image
              src={mainImage}
              alt={collab.title}
              className="w-full max-w-[400px] aspect-[4/6] object-contain border-gsp-white rounded-sm  border-2 z-50"
              width="550"
              height="310"
            />
          </>
        )}

        <h1 className="text-5xl md:text-6xl leading-10  text-center w-full pt-8 mt-8 -skew-x-8">
          {collab.title}
        </h1>

        <div className="text-3xl max-w-none my-4 p-3 text-justify text-gsp-white">
          {typeof collab.description === 'string' ? (
            <p>{collab.description.toLowerCase()}</p>
          ) : (
            Array.isArray(collab.description) && (
              <PortableText value={collab.description} />
            )
          )}
        </div>

        <h2 className="w-4/5 grid grid-cols-3 gap-4 mb-8 animate-flicker-slowest text-gsp-gold">
          {collab.collaborators.map((collaborator: string, index: number) => {
            return (
              <>
                {index > 0 ? (
                  <div className="flex justify-center text-center w-full items-center">
                    +
                  </div>
                ) : (
                  ''
                )}
                <div className="flex justify-center text-center w-full items-center leading-4">
                  {collaborator}{' '}
                </div>
              </>
            )
          })}
        </h2>

        {/* Press quotes section */}

        {collab.pressQuotes && collab.pressQuotes.length > 0 && (
          <div className=" flex flex-col gap-8 text-center mb-8">
            {collab.pressQuotes.map((quote: string, index: number) => (
              <blockquote
                key={index}
                className="bg-gsp-white/20 p-2 mx-4 sm:mx-12 border-gsp-white italic text-center rounded-sm border-y-8 border-dotted"
              >
                {quote.toLowerCase()}
              </blockquote>
            ))}
          </div>
        )}
        {/* Image gallery section */}
        {collab.imageGallery && collab.imageGallery.length > 1 && (
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collab.imageGallery.map(
                (image: SanityImageSource, index: number) => (
                  <div key={index} className="border-2 border-gsp-white/80">
                    <Image
                      src={urlFor(image)?.width(800).height(500).url() || ''}
                      alt={`collab image ${index}`}
                      className=" w-full h-64 object-cover"
                      width={800}
                      height={800}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {/* <Link href="/" className=" hover:underline">
        ← back to shows
      </Link> */}
      </main>
    </>
  )
}
