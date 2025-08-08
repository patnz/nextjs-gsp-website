import { type SanityDocument } from 'next-sanity'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const COLLABS_QUERY = `*[_type == "collab"] | order(_createdAt desc) {
  mainImage,
  _id,
  title,
  hook,
  description,
  partners,
  slug,
  tags,
  images,
  altText
}`
const { projectId, dataset } = client.config()

const options = { next: { revalidate: 30 } }
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export default async function CollabsPage() {
  const collabs = await client.fetch<SanityDocument[]>(
    COLLABS_QUERY,
    {},
    options
  )
  return (
    <main className="container mx-auto min-h-screen max-w-6xl flex flex-col items-center gap-8">
      <div className="w-full flex justify-center mb-8">
        <h1 className="relative animate-appearance-in text-6xl md:text-6xl font-extrabold p-2 text-gsp-white -skew-x-12 flex items-center justify-center">
          <span className="absolute -skew-x-12 scale-110 animate-flicker-slowest text-gsp-white/30">
            collabs
          </span>
          <span className="-skew-x-12 animate-appearance-in">collabs</span>
        </h1>
      </div>

      {collabs.length === 0 ? (
        <div className="text-center text-2xl text-gsp-white/60">
          no collabs found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full ">
          {collabs.map((collab) => {
            const mainImage = collab.mainImage
              ? urlFor(collab.mainImage)?.url()
              : null
            // const description =
            //   typeof collab.description === 'string'
            //     ? collab.description
            //     : Array.isArray(collab.description) &&
            //         collab.description[0]?.children?.[0]?.text
            //       ? collab.description[0].children[0].text
            //       : ''

            return (
              <Link
                key={collab._id}
                href={`/collabs/${collab.slug.current}`}
                className="group block group-hover:scale-105 z-10"
              >
                <article className="relative flex flex-col justify-center items-center gap-4  group-hover:scale-105 transition-all duration-200 ">
                  <div className="absolute z-30 w-[102%] h-[102%] aspect-[4/5] object-cover bg-gsp-white/10 animate-appearance-in duration-100"></div>
                  {mainImage && (
                    <Image
                      src={mainImage}
                      alt={collab.title}
                      className="z-40 w-full h-auto aspect-[3/4] object-cover border-2 border-gsp-white/80 "
                      width={400}
                      height={225}
                    />
                  )}
                </article>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
