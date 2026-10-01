import { MetadataRoute } from 'next'
import { rooms } from '@/content/rooms'

export default function sitemap(): MetadataRoute.Sitemap {
  const roomEntries = rooms.map(r => ({
    url: `https://hotelratnawalijodhpur.com/rooms/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://hotelratnawalijodhpur.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...roomEntries
  ]
}
