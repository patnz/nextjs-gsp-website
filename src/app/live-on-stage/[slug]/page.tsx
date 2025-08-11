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

interface LiveOnStagePageProps {
  params: { slug: string }
}

export default async function LiveOnStagePage({
  params,
}: LiveOnStagePageProps) {
  const show = await client.fetch(
    SHOW_QUERY,
    { slug: params.slug },
    { next: { revalidate: 30 } }
  )

  if (!show) {
    // Optional: Handle case where no show is found
    return (
      <div className="w-screen min-h-screen absolute top-0 left-0 flex flex-col items-center justify-center">
        <p>Show not found :(</p>
      </div>
    )
  }

  return <SingletonGalleryPage sectionType="liveOnStage" sectionData={show} />
}
