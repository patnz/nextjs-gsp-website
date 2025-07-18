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

  const mainImage = show.mainImage ? urlFor(show.mainImage)?.url() : null

  return (
    <>
      <main className=" container mx-auto min-h-screen max-w-3xl flex flex-col items-center gap-4 lg:px-32 font-courierPrime z-30">
        <div className=" w-full flex text-2xl md:text-4xl my-8 text-center  justify-center px-4">
          <h1 className="flex gap-2 w-fit border-b-2 pb-4 border-gsp-white/60 px-6 pt-2 animate-appearance-in ">
            <span className="text-2xl md:text-4xl -rotate-1 font-extrabold">
              {`${show.title.toLowerCase()}`}
            </span>
            <span className="text-base md:text-xl rotate-3">{show.year}</span>
          </h1>
        </div>
        {mainImage && (
          <Image
            src={mainImage}
            alt={show.title}
            className="w-full max-w-[600px] object-contain border-gsp-white/80 "
            width="550"
            height="310"
          />
        )}
        <div className="prose max-w-none my-4 p-3 text-justify text-white">
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
        )}
        {/* Image gallery section */}
        {show.imageGallery && show.imageGallery.length > 1 && (
          <div className="">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {show.imageGallery.map(
                (image: SanityImageSource, index: number) => (
                  <div key={index} className="border-2 border-gsp-white/80">
                    <Image
                      src={urlFor(image)?.width(320).height(240).url() || ''}
                      alt={`Show image ${index}`}
                      className=" w-full h-64 object-cover"
                      width={320}
                      height={240}
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
