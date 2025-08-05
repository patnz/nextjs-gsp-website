import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const TEAM_QUERY = `*[_type == "teamMember"] | order(name asc) {
  _id,
  name,
  role,
  photo,
  biography
}`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function TeamPage() {
  const teamMembers = await client.fetch<SanityDocument[]>(
    TEAM_QUERY,
    {},
    options
  )

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8">
      <div className="flex flex-col items-center gap-8">
        <div className="w-full flex justify-center my-8">
          <h1 className="flex gap-2 w-fit border-b-2 pb-4 border-gsp-white/60 px-6 pt-2 animate-appearance-in text-4xl md:text-6xl">
            <span className="-rotate-1">team</span>
          </h1>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center text-2xl text-gsp-white/60">
            no team members found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {teamMembers.map((member) => {
              const photoUrl = member.photo
                ? urlFor(member.photo)?.width(300).height(400).url()
                : null

              const biography =
                typeof member.biography === 'string'
                  ? member.biography
                  : Array.isArray(member.biography) &&
                      member.biography[0]?.children?.[0]?.text
                    ? member.biography[0].children[0].text
                    : ''

              return (
                <Link
                  key={member._id}
                  href={`/team/${member._id}`}
                  className="group block"
                >
                  <article className="flex flex-col gap-4 p-4 border border-gsp-white/20 hover:border-gsp-white/60 transition-colors duration-200">
                    {photoUrl ? (
                      <div className="aspect-[3/4] overflow-hidden">
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          width={300}
                          height={400}
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] bg-gsp-white/10 flex items-center justify-center">
                        <span className="text-4xl text-gsp-white/40">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg md:text-xl font-medium group-hover:underline">
                        {member.name.toLowerCase()}
                      </h2>

                      {member.role && (
                        <div className="bg-gsp-white/10 px-3 py-1 rounded w-fit text-sm">
                          {member.role.toLowerCase()}
                        </div>
                      )}

                      {biography && (
                        <p className="text-sm text-gsp-white/80 line-clamp-3">
                          {biography.toLowerCase()}
                        </p>
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
