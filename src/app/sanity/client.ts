import { createClient } from 'next-sanity'
import * as Types from './types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
})

// Community Posts
export async function getAllCommunityPosts(): Promise<Types.CommunityPost[]> {
  return client.fetch(`*[_type == "communityPost"] | order(publishedDate desc)`)
}

export async function getCommunityPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "communityPost" && slug.current == $slug][0]`,
    { slug }
  )
}

// Contact Info
export async function getContactInfo(): Promise<Types.ContactInfo> {
  return client.fetch(`*[_type == "contactInfo"][0]`)
}

// Galleries
export async function getAllGalleries(): Promise<Types.Gallery[]> {
  return client.fetch(`*[_type == "gallery"] | order(title asc)`)
}

export async function getGalleryBySlug(slug: string): Promise<Types.Gallery> {
  return client.fetch(`*[_type == "gallery" && slug.current == $slug][0]`, {
    slug,
  })
}

// Links
export async function getAllLinks(): Promise<Types.Link[]> {
  return client.fetch(`*[_type == "link"] | order(title asc)`)
}

// Projects
export async function getAllProjects(): Promise<Types.Project[]> {
  return client.fetch(`*[_type == "project"] | order(title asc)`)
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, {
    slug,
  })
}

// Shows
export async function getAllShows(): Promise<Types.Show[]> {
  return client.fetch(`*[_type == "show"] | order(year desc)`)
}

export async function getShowBySlug(slug: string) {
  return client.fetch(`*[_type == "show" && slug.current == $slug][0]`, {
    slug,
  })
}

// Team Members
export async function getAllTeamMembers(): Promise<Types.TeamMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(name asc)`)
}

export async function getTeamMemberById(id: string) {
  return client.fetch(`*[_type == "teamMember" && _id == $id][0]`, { id })
}

// Advanced Queries with References
export async function getCommunityPostWithAuthor(slug: string) {
  return client.fetch(
    `
    *[_type == "communityPost" && slug.current == $slug][0]{
      ...,
      author->{
        name,
        role,
        photo
      }
    }
  `,
    { slug }
  )
}

export async function getProjectsWithGalleryImages(
  limit = 10
): Promise<Types.Project[]> {
  return client.fetch(`
    *[_type == "project"][0...${limit}]{
      ...,
      "imageCount": count(imageGallery)
    } | order(title asc)
  `)
}

export async function getRecentShowsWithPress(
  limit = 5
): Promise<Types.Show[]> {
  return client.fetch(`
    *[_type == "show"][0...${limit}]{
      ...,
      "hasPress": count(pressQuotes) > 0
    } | order(year desc)
  `)
}
