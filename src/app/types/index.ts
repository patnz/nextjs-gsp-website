interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

// New document types based on your schema files
export interface Freak {
  _id: string
  _type: 'freak'
  name: string

  bio?: string
  photo: SanityImage // Sanity image type
}

export interface LiveOnStage {
  _id?: string
  _type?: 'liveOnStage'
  title?: string
  slug?: {
    current: string
  }
  description?: string
  year?: number
  venue?: string
  images?: SanityImage[] // Sanity image array
  // videos?: any[] // Sanity video array
}

export interface OnTheStreet {
  _id: string
  _type: 'onTheStreet'
  title: string
  slug: {
    current: string
  }
  description?: string
  location?: string
  date?: string
  images?: SanityImage[] // Sanity image array
  // videos?: any[] // Sanity video array
}

export interface InDaClub {
  _id: string
  _type: 'inDaClub'
  title: string
  slug: {
    current: string
  }
  description?: string
  collaborators?: string[]
  date?: string
  images?: SanityImage[] // Sanity image array
  // videos?: any[] // Sanity video array
}

export interface AtTheFest {
  _id: string
  _type: 'atTheFest'
  title: string
  slug: {
    current: string
  }
  description?: string
  festival?: string
  year?: number
  location?: string
  images?: SanityImage[] // Sanity image array
  // videos?: any[] // Sanity video array
}

export interface AboutUs {
  _id: string
  _type: 'aboutUs'
  title: string
  text?: string // Rich text content
  images?: SanityImage[] // Sanity image array
  // teamPhoto?: any // Sanity image type
}

export interface HomePageGallery {
  _id: string
  _type: 'homePageGallery'
  title: string
  images: SanityImage[] // Sanity image array
  // videos?: any // Sanity image type
}

// Updated NavData interface
export interface NavData {
  freaks: Freak[]
  liveOnStage: LiveOnStage[]
  onTheStreet: OnTheStreet
  inDaClub: InDaClub
  atTheFest: AtTheFest
  aboutUs: AboutUs
  homePageGallery: HomePageGallery
}
