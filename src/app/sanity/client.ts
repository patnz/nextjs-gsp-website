import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '1k6nr05x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
