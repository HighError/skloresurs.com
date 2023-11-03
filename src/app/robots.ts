import type { MetadataRoute } from 'next';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
