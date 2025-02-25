import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const POST_QUERY = `*[_type == "communityPost" && slug.current == $slug][0]{
  ...,
  author->
}`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function CommunityPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  )

  // Handle the case where post doesn't exist
  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/community" className="hover:underline">
          ← back to community posts
        </Link>
        <h1 className="text-4xl mb-8">{`post not found :(`}</h1>
      </main>
    )
  }

  // Format date
  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  // Get the featured image if it exists
  const featuredImageUrl = post.featuredImage
    ? urlFor(post.featuredImage)?.width(800).height(400).url()
    : null

  return (
    <main className="container mx-auto min-h-screen max-w-3xl flex flex-col gap-4 font-courierPrime">
      <div className="w-full flex flex-col text-2xl md:text-4xl my-8 text-center items-center px-4">
        <h1 className="w-fit border-b-2 border-gsp-white/80 px-6 pt-2 animate-appearance-in">
          {post.title.toLowerCase()}
        </h1>
        <div className="mt-4 text-base flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <time className="text-gsp-white/70">{formattedDate}</time>
          {post.author && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">|</span>
              <span>by {post.author.name.toLowerCase()}</span>
              {post.author.photo && (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={
                      urlFor(post.author.photo)?.width(50).height(50).url() ||
                      ''
                    }
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {featuredImageUrl && (
        <div className="w-full mb-6">
          <Image
            src={featuredImageUrl}
            alt={post.title}
            className="w-full object-cover max-h-[400px]"
            width={800}
            height={400}
          />
        </div>
      )}

      <article className="prose max-w-none my-6 p-3 text-justify">
        {typeof post.content === 'string' ? (
          <p>{post.content.toLowerCase()}</p>
        ) : (
          Array.isArray(post.content) && <PortableText value={post.content} />
        )}
      </article>

      {post.author && post.author.role && (
        <div className="mt-8 p-4 border border-gsp-white/30 rounded">
          <div className="flex gap-4 items-center">
            {post.author.photo && (
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image
                  src={
                    urlFor(post.author.photo)?.width(100).height(100).url() ||
                    ''
                  }
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div>
              <h3 className="text-xl">{post.author.name.toLowerCase()}</h3>
              <p className="text-gsp-white/70 text-sm">
                {post.author.role.toLowerCase()}
              </p>
              {post.author.biography && (
                <p className="mt-2 text-sm">
                  {post.author.biography.toLowerCase()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="my-8">
        <Link href="/community" className="hover:underline text-lg">
          ← back to community posts
        </Link>
      </div>
    </main>
  )
}
