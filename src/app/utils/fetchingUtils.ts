import {
  getAllFreaks,
  getAllLiveOnStage,
  getAllOnTheStreet,
  getAllInDaClub,
  getAllAtTheFest,
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
    aboutUs,
    homePageGallery,
  ] = await Promise.all([
    getAllFreaks(),
    getAllLiveOnStage(),
    getAllOnTheStreet(),
    getAllInDaClub(),
    getAllAtTheFest(),
    getAboutUs(),
    getHomePageGallery(),
  ])

  return {
    freaks,
    liveOnStage,
    onTheStreet,
    inDaClub,
    atTheFest,
    aboutUs,
    homePageGallery,
  }
}
