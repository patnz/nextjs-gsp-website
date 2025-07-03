interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

interface ContactInfo {
  name: string
  email: string
  phoneNumber?: string
  location?: string
  socialMediaLinks?: string[]
}

interface Gig {
  _id: string
  title: string
  slug: { current: string }
  description: string
  year: number
  mainImage: SanityImage
  imageGallery?: SanityImage[]
  pressQuotes?: string[]
}

interface NavData {
  gigs: Gig[]
}

export interface NavItem {
  label: string
  href: string
}

export interface ProcessedMobileNavItem {
  label: string
  items: NavItem[]
}

export interface ProcessedDesktopNavItem {
  label: string
  items: NavItem[]
}

export interface ProcessedNavData {
  mobileNavData: ProcessedMobileNavItem[]
  desktopNavData: ProcessedDesktopNavItem[]
}

export type { Gig, NavData }
