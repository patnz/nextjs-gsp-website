// import { type SanityDocument } from 'next-sanity'
// import imageUrlBuilder from '@sanity/image-url'
// import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
// import { client } from '@/app/sanity/client'
// import Link from 'next/link'
// import Image from 'next/image'

// const TEAM_QUERY = `*[_type == "teamMember"] | order(name asc) {
//   _id,
//   name,
//   role,
//   photo,
//   biography
// }`

// const { projectId, dataset } = client.config()
// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null

// const options = { next: { revalidate: 30 } }

export default async function TeamPage() {
  // const teamMembers = await client.fetch<SanityDocument[]>(
  //   TEAM_QUERY,
  //   {},
  //   options
  // )

  return <main className="container mx-auto min-h-screen max-w-6xl p-8"></main>
}
