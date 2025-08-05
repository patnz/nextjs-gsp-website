import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  imageGallery,
  collaborators
}`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function ProjectsPage() {
  const projects = await client.fetch<SanityDocument[]>(
    PROJECTS_QUERY,
    {},
    options
  )

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8">
      <div className="flex flex-col items-center gap-8">
        <div className="w-full flex justify-center my-8">
          <h1 className="flex gap-2 w-fit border-b-2 pb-4 border-gsp-white/60 px-6 pt-2 animate-appearance-in text-4xl md:text-6xl">
            <span className="-rotate-1">projects</span>
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-2xl text-gsp-white/60">
            no projects found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {projects.map((project) => {
              // Get the first image from gallery
              const projectImageUrl =
                project.imageGallery && project.imageGallery.length > 0
                  ? urlFor(project.imageGallery[0])
                      ?.width(400)
                      .height(225)
                      .url()
                  : null

              const description =
                typeof project.description === 'string'
                  ? project.description
                  : Array.isArray(project.description) &&
                      project.description[0]?.children?.[0]?.text
                    ? project.description[0].children[0].text
                    : ''

              return (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="group block"
                >
                  <article className="flex flex-col gap-4 p-4 border border-gsp-white/20 hover:border-gsp-white/60 transition-colors duration-200">
                    {projectImageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={projectImageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          width={400}
                          height={225}
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl md:text-2xl font-medium group-hover:underline">
                        {project.title.toLowerCase()}
                      </h2>

                      {description && (
                        <p className="text-sm text-gsp-white/80 line-clamp-3">
                          {description.toLowerCase()}
                        </p>
                      )}

                      {project.collaborators &&
                        project.collaborators.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.collaborators
                              .slice(0, 3)
                              .map((collaborator: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gsp-white/10 rounded-sm text-xs"
                                >
                                  {collaborator.toLowerCase()}
                                </span>
                              ))}
                            {project.collaborators.length > 3 && (
                              <span className="px-2 py-1 bg-gsp-white/10 rounded-sm text-xs">
                                +{project.collaborators.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                    </div>
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
