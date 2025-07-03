import { getAllGigs } from '@/app/sanity/client'
import { NavData } from '../types'

export default async function fetchDocuments(): Promise<NavData> {
  const [gigs] = await Promise.all([getAllGigs()])

  return { gigs }
}
