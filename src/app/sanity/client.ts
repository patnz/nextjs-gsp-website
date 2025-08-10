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

export async function getAllOnTheStreet(): Promise<Types.OnTheStreet[]> {
  return client.fetch(`*[_type == "onTheStreet"] | order(title asc)`)
}

export async function getOnTheStreetBySlug(
  slug: string
): Promise<Types.OnTheStreet> {
  return client.fetch(`*[_type == "onTheStreet" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllInDaClub(): Promise<Types.InDaClub[]> {
  return client.fetch(`*[_type == "inDaClub"] | order(title asc)`)
}

export async function getInDaClubBySlug(slug: string): Promise<Types.InDaClub> {
  return client.fetch(`*[_type == "inDaClub" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllAtTheFest(): Promise<Types.AtTheFest[]> {
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

// Legacy fetchers (keeping for backward compatibility if needed)
export async function getAllCommunityPosts(): Promise<Types.CommunityPost[]> {
  return client.fetch(`*[_type == "communityPost"] | order(publishedDate desc)`)
}

export async function getCommunityPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "communityPost" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function getContactInfo(): Promise<Types.ContactInfo> {
  return client.fetch(`*[_type == "contactInfo"][0]`)
}

export async function getAllGalleries(): Promise<Types.Gallery[]> {
  return client.fetch(`*[_type == "gallery"] | order(title asc)`)
}

export async function getGalleryBySlug(slug: string): Promise<Types.Gallery> {
  return client.fetch(`*[_type == "gallery" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllLinks(): Promise<Types.Link[]> {
  return client.fetch(`*[_type == "link"] | order(title asc)`)
}

export async function getAllProjects(): Promise<Types.Project[]> {
  return client.fetch(`*[_type == "project"] | order(title asc)`)
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllShows(): Promise<Types.Show[]> {
  return client.fetch(`*[_type == "show"] | order(year desc)`)
}

export async function getShowBySlug(slug: string) {
  return client.fetch(`*[_type == "show" && slug.current == $slug][0]`, {
    slug,
  })
}

export async function getAllTeamMembers(): Promise<Types.TeamMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(name asc)`)
}

export async function getTeamMemberById(id: string) {
  return client.fetch(`*[_type == "teamMember" && _id == $id][0]`, { id })
}
