import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow any internal Next.js paths that should never be indexed
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://hotelratnawalijodhpur.com/sitemap.xml',
  };
}
