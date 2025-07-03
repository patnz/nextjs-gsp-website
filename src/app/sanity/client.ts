import { createClient } from 'next-sanity'
import * as Types from '@/app/types/index'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
})

export async function getAllGigs(): Promise<Types.Gig[]> {
  return client.fetch(`*[_type == "show"] | order(year desc)`)
}

export async function getGigBySlug(slug: string) {
  return client.fetch(`*[_type == "gig" && slug.current == $slug][0]`, {
    slug,
  })
}
