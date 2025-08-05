import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const project = await client.fetch<SanityDocument>(
    PROJECT_QUERY,
    await params,
    options
  )

  // Handle the case where project doesn't exist
  if (!project) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/projects" className="hover:underline">
          ← back to projects
        </Link>
        <h1 className="text-4xl mb-8">{`project not found :(`}</h1>
      </main>
    )
  }

  // Get the first image from the gallery if it exists
  const projectImageUrl =
    project.imageGallery && project.imageGallery.length > 0
      ? urlFor(project.imageGallery[0])?.width(800).height(500).url()
      : null

  return (
    <>
      <main className="container mx-auto min-h-screen max-w-3xl flex flex-col gap-4 text-2xl">
        <div className="w-full flex text-2xl md:text-4xl my-8 text-center justify-center px-4">
          <h1 className="flex animate-appearance-intext-6xl md:text-6xl p-2 text-gsp-white -skew-x-12 items-center justify-center">
            <span className="text-5xl md:text-6xl">
              {`${project.title.toLowerCase()}`}
            </span>
          </h1>
        </div>
        {projectImageUrl && (
          <Image
            src={projectImageUrl}
            alt={project.title}
            className="w-full object-cover max-w-[600px] mx-auto"
            width="800"
            height="500"
          />
        )}
        <div className="prose max-w-none my-4 p-3 text-justify">
          {typeof project.description === 'string' ? (
            <p>{project.description.toLowerCase()}</p>
          ) : (
            Array.isArray(project.description) && (
              <PortableText value={project.description} />
            )
          )}
        </div>

        {/* Collaborators section */}
        {project.collaborators && project.collaborators.length > 0 && (
          <div className="my-4">
            <h2 className="mb-2 border-b border-gsp-white/40 pb-1">
              Collaborators
            </h2>
            <div className="flex flex-wrap gap-6 mt-4">
              {project.collaborators.map(
                (collaborator: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gsp-white/10 rounded-md text-3xl"
                  >
                    {collaborator.toLowerCase()}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Image gallery section */}
        {project.imageGallery && project.imageGallery.length > 1 && (
          <div className="mt-8">
            <h2 className="text-xl mb-4 border-b border-gsp-white/40 pb-1">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Skip first image as it's already displayed at the top */}
              {project.imageGallery
                .slice(1)
                .map((image: SanityImageSource, index: number) => (
                  <div key={index} className="border-2 border-gsp-white/80">
                    <Image
                      src={urlFor(image)?.width(800).height(800).url() || ''}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-64 object-cover"
                      width={800}
                      height={800}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
