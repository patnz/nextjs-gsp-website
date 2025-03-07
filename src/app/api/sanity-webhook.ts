import type { NextApiRequest, NextApiResponse } from 'next'
import {
  CommunityPost,
  Gallery,
  Link,
  Project,
  Show,
  TeamMember,
} from '@/app/types'

type SanityWebhookPayload<T> = {
  action: 'create' | 'update' | 'delete'
  document: T & { _id: string; _type: string; slug?: { current: string } }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const body = req.body as SanityWebhookPayload<
    CommunityPost | Gallery | Link | Project | Show | TeamMember
  >

  // Security: Validate webhook secret
  const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET
  const signature = req.headers['sanity-webhook-signature']

  if (SANITY_WEBHOOK_SECRET && signature !== SANITY_WEBHOOK_SECRET) {
    return res.status(403).json({ message: 'Invalid signature' })
  }

  try {
    const { action, document } = body

    if (!document.slug?.current) {
      console.warn('No slug found for document:', document._id)
      return res.status(200).json({ message: 'No slug to revalidate' })
    }

    const slug = document.slug.current

    // Define paths to revalidate based on document type
    const revalidatePaths: Record<string, string> = {
      communityPost: `/community/${slug}`,
      gallery: `/gallery/${slug}`,
      link: `/links/${slug}`,
      project: `/projects/${slug}`,
      show: `/shows/${slug}`,
      teamMember: `/team/${slug}`,
    }

    const path = revalidatePaths[document._type]

    if (path) {
      await res.revalidate(path)
    }

    return res.status(200).json({ message: `Webhook processed for ${action}` })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
