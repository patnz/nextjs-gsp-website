import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const SHOWS_QUERY = `*[_type == "show"] | order(year desc, title asc) {
  _id,
  title,
  slug,
  year,
  mainImage,
  description
}`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function ShowsPage() {
  const shows = await client.fetch<SanityDocument[]>(SHOWS_QUERY, {}, options)

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8">
      <div className="flex flex-col items-center gap-8">
        <div className="w-full flex justify-center my-8">
          <h1 className="animate-appearance-in text-6xl md:text-6xl font-extrabold p-2 text-gsp-white rounded-full -skew-x-12 w-16 h-16 md:w-28 md:h-28 flex items-center justify-center rotate-90">
            <span className="-skew-x-12">shows</span>
          </h1>
        </div>

        {shows.length === 0 ? (
          <div className="text-center text-2xl text-gsp-white/60">
            no shows found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {shows.map((show) => {
              const mainImage = show.mainImage
                ? urlFor(show.mainImage)?.url()
                : null
              // const description =
              //   typeof show.description === 'string'
              //     ? show.description
              //     : Array.isArray(show.description) &&
              //         show.description[0]?.children?.[0]?.text
              //       ? show.description[0].children[0].text
              //       : ''

              return (
                <Link
                  key={show._id}
                  href={`/shows/${show.slug.current}`}
                  className="group block group-hover:scale-105"
                >
                  <article className="flex flex-col gap-4 border-4 group-hover:scale-105 transition-all duration-200">
                    {mainImage && (
                      <Image
                        src={mainImage}
                        alt={show.title}
                        className="w-full h-auto aspect-[3/4] object-cover"
                        width={400}
                        height={225}
                      />
                    )}

                    {/* <div className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-2">
                        <h2 className="text-xl md:text-2xl font-medium group-hover:underline">
                          {show.title.toLowerCase()}
                        </h2>
                        {show.year && (
                          <span className="text-sm text-gsp-white/60">
                            {show.year}
                          </span>
                        )}
                      </div>

                      {description && (
                        <p className="text-sm text-gsp-white/80 line-clamp-3">
                          {description.toLowerCase()}
                        </p>
                      )}
                    </div> */}
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
