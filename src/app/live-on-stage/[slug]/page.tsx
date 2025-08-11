// app/live-on-stage/[slug]/page.tsx
import { client } from '@/app/sanity/client'
import SingletonGalleryPage from '@/app/components/SingletonGallery'

const SHOW_QUERY = `*[_type == "liveOnStage" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  images,
  videos
}`

export default async function LiveOnStagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const show = await client.fetch(SHOW_QUERY, await params, {
    next: { revalidate: 30 },
  })

  if (!show) {
    return (
      <div className="w-screen min-h-screen absolute top-0 left-0 flex flex-col items-center justify-center">
        <p>Show not found :(</p>
      </div>
    )
  }

  return <SingletonGalleryPage sectionType="liveOnStage" sectionData={show} />
}
