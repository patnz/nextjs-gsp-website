interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

interface CommunityPost {
  _id: string
  title: string
  slug: { current: string }
  publishedDate: string
  content: string
  featuredImage?: SanityImage
  author: TeamMember
}

interface ContactInfo {
  name: string
  email: string
  phoneNumber?: string
  location?: string
  socialMediaLinks?: string[]
}

interface Gallery {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  images: SanityImage[]
}

interface Link {
  _id: string
  title: string
  url: string
  image?: SanityImage
}

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  collaborators?: string[]
  imageGallery?: SanityImage[]
}

interface Show {
  _id: string
  title: string
  slug: { current: string }
  description: string
  year: number
  imageGallery?: SanityImage[]
  pressQuotes?: string[]
}

interface TeamMember {
  _id: string
  name: string
  role: string
  biography?: string
  photo?: SanityImage
}

interface NavData {
  shows: Show[]
  projects: Project[]
  teamMembers: TeamMember[]
  communityPosts: CommunityPost[]
  links: Link[]
}

export type {
  CommunityPost,
  ContactInfo,
  Gallery,
  Link,
  Project,
  Show,
  TeamMember,
  NavData,
}
