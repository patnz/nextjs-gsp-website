import {
  getAllFreaks,
  getAllLiveOnStage,
  getAllOnTheStreet,
  getAllInDaClub,
  getAllAtTheFest,
  getAllLinks,
  getAboutUs,
  getHomePageGallery,
} from '@/app/sanity/client'
import { NavData } from '../types'

export default async function fetchDocuments(): Promise<NavData> {
  const [
    freaks,
    liveOnStage,
    onTheStreet,
    inDaClub,
    atTheFest,
    links,
    aboutUs,
    homePageGallery,
  ] = await Promise.all([
    getAllFreaks(),
    getAllLiveOnStage(),
    getAllOnTheStreet(),
    getAllInDaClub(),
    getAllAtTheFest(),
    getAllLinks(),
    getAboutUs(),
    getHomePageGallery(),
  ])

  return {
    freaks,
    liveOnStage,
    onTheStreet,
    inDaClub,
    atTheFest,
    links,
    aboutUs,
    homePageGallery,
  }
}
