import { createClient } from 'next-sanity'
import * as Types from '@/app/types/index'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
})

// New document type fetchers
export async function getAllFreaks(): Promise<Types.Freak[]> {
  return client.fetch(`*[_type == "freak"] | order(name asc)`)
}

export async function getFreakBySlug(slug: string): Promise<Types.Freak> {
  return client.fetch(`*[_type == "freak" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllLiveOnStage(): Promise<Types.LiveOnStage[]> {
  return client.fetch(`*[_type == "liveOnStage"] | order(title asc)`)
}

export async function getLiveOnStageBySlug(
  slug: string
): Promise<Types.LiveOnStage> {
  return client.fetch(`*[_type == "liveOnStage" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllOnTheStreet(): Promise<Types.OnTheStreet> {
  return client.fetch(`*[_type == "onTheStreet"] | order(title asc)`)
}

export async function getOnTheStreetBySlug(
  slug: string
): Promise<Types.OnTheStreet> {
  return client.fetch(`*[_type == "onTheStreet" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllInDaClub(): Promise<Types.InDaClub> {
  return client.fetch(`*[_type == "inDaClub"] | order(title asc)`)
}

export async function getInDaClubBySlug(slug: string): Promise<Types.InDaClub> {
  return client.fetch(`*[_type == "inDaClub" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllAtTheFest(): Promise<Types.AtTheFest> {
  return client.fetch(`*[_type == "atTheFest"] | order(title asc)`)
}

export async function getAtTheFestBySlug(
  slug: string
): Promise<Types.AtTheFest> {
  return client.fetch(`*[_type == "atTheFest" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAboutUs(): Promise<Types.AboutUs> {
  return client.fetch(`*[_type == "aboutUs"][0]`)
}

export async function getHomePageGallery(): Promise<Types.HomePageGallery> {
  return client.fetch(`*[_type == "homePageGallery"][0]`)
}
