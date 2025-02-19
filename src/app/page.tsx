// import Link from 'next/link'
// import { type SanityDocument } from 'next-sanity'

// import { client } from './sanity/client'

// const POSTS_QUERY = `*[
//   _type == "post"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`

// const options = { next: { revalidate: 30 } }

// export default async function IndexPage() {
//   const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

//   return (
//     <main className="container mx-auto min-h-screen max-w-3xl p-8">
//       <h1 className="text-4xl font-bold mb-8">Posts</h1>
//       <ul className="flex flex-col gap-y-4">
//         {posts.map((post) => (
//           <li className="hover:underline" key={post._id}>
//             <Link href={`/post/${post.slug.current}`}>
//               <h2 className="text-xl font-semibold">{post.title}</h2>
//               <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   )
// }
import { Button } from '@heroui/button'

export default function HomePage() {
  return (
    <div>
      <main className="bg-gsp-black flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <Button className="text-[10vw] text-center font-bold mb-4 font-amaticSc h-[10vw] px-12 py-24 border-8 rounded-none border-gsp-gold/80">
          Click me
        </Button>
      </main>
    </div>
  )
}
