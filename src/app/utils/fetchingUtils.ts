import {
  getAllShows,
  getAllProjects,
  getAllTeamMembers,
  getAllCommunityPosts,
  getAllLinks,
} from '@/app/sanity/client'
import { NavData } from '../types'

export default async function fetchDocuments(): Promise<NavData> {
  const [shows, projects, teamMembers, communityPosts, links] =
    await Promise.all([
      getAllShows(),
      getAllProjects(),
      getAllTeamMembers(),
      getAllCommunityPosts(),
      getAllLinks(),
    ])

  return { shows, projects, teamMembers, communityPosts, links }
}
