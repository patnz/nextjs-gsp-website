import { PortableText, type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const TEAM_MEMBER_QUERY = `*[_type == "teamMember" && _id == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const teamMember = await client.fetch<SanityDocument>(
    TEAM_MEMBER_QUERY,
    await params,
    options
  )

  // Handle the case where team member doesn't exist
  if (!teamMember) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/team" className="hover:underline">
          ← back to team
        </Link>
        <h1 className="text-4xl mb-8">{`team member not found :(`}</h1>
      </main>
    )
  }

  // Get photo URL if it exists
  const photoUrl = teamMember.photo
    ? urlFor(teamMember.photo)?.width(400).height(500).url()
    : null

  return (
    <main className="container mx-auto min-h-screen max-w-3xl flex flex-col gap-8 font-courierPrime p-4">
      <div className="w-full flex text-2xl md:text-4xl my-8 text-center justify-center">
        <h1 className="w-fit border-b-2 border-gsp-white/80 px-6 pt-2 animate-appearance-in">
          {teamMember.name.toLowerCase()}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {photoUrl && (
          <div className="md:w-1/3">
            <div className="border-2 border-gsp-white/80 overflow-hidden">
              <Image
                src={photoUrl}
                alt={teamMember.name}
                className="w-full object-cover"
                width={400}
                height={500}
              />
            </div>
          </div>
        )}

        <div
          className={`flex flex-col gap-4 ${photoUrl ? 'md:w-2/3' : 'w-full'}`}
        >
          <div className="bg-gsp-white/10 px-4 py-2 rounded w-fit">
            <h2 className="text-xl">{teamMember.role.toLowerCase()}</h2>
          </div>

          {teamMember.biography && (
            <div className="prose max-w-none text-justify">
              {typeof teamMember.biography === 'string' ? (
                <p>{teamMember.biography.toLowerCase()}</p>
              ) : (
                Array.isArray(teamMember.biography) && (
                  <PortableText value={teamMember.biography} />
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* You could add related projects or shows by this team member here */}

      <div className="mt-8">
        <Link href="/team" className="hover:underline text-lg">
          ← back to team
        </Link>
      </div>
    </main>
  )
}
