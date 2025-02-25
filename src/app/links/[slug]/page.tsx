import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const LINK_QUERY = `*[_type == "link" && _id == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function LinkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const linkItem = await client.fetch<SanityDocument>(
    LINK_QUERY,
    await params,
    options
  )

  // Handle the case where link doesn't exist
  if (!linkItem) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/links" className="hover:underline">
          ← back to links
        </Link>
        <h1 className="text-4xl mb-8">{`link not found :(`}</h1>
      </main>
    )
  }

  // Get image URL if it exists
  const imageUrl = linkItem.image
    ? urlFor(linkItem.image)?.width(800).height(400).url()
    : null

  return (
    <main className="container mx-auto min-h-screen max-w-3xl flex flex-col gap-4 font-courierPrime p-4">
      <div className="w-full flex text-2xl md:text-4xl my-8 text-center justify-center">
        <h1 className="w-fit border-b-2 border-gsp-white/80 px-6 pt-2 animate-appearance-in">
          {linkItem.title.toLowerCase()}
        </h1>
      </div>

      {imageUrl && (
        <div className="w-full mb-6 border-2 border-gsp-white/80 overflow-hidden">
          <Image
            src={imageUrl}
            alt={linkItem.title}
            className="w-full object-cover"
            width={800}
            height={400}
          />
        </div>
      )}

      <div className="flex justify-center my-8">
        <a
          href={linkItem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gsp-white/20 hover:bg-gsp-white/30 transition-colors duration-300 border border-gsp-white/60 rounded"
        >
          Visit {linkItem.title.toLowerCase()}
        </a>
      </div>
    </main>
  )
}
