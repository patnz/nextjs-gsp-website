import { client } from '@/app/sanity/client'
import SingletonGalleryPage from '../components/SingletonGallery'

const SINGLETON_QUERY = `*[_type == "onTheStreet"][0] {
  _id,
  _type,
  title,
  images,
  videos
}`

// Usage in your page files:
// app/in-da-club/page.tsx
export default async function OnTheStreetPage() {
  const section = await client.fetch(
    SINGLETON_QUERY,
    {},
    { next: { revalidate: 30 } }
  )

  return (
    <SingletonGalleryPage sectionType="onTheStreet" sectionData={section} />
  )
}
