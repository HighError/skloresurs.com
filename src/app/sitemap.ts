import type { MetadataRoute } from 'next';

import { env } from '@/env.mjs';

// Define the base URL
const { NEXT_PUBLIC_BASE_URL } = env;

// Define the list of pages
const pages = [
  '/components',
  '/delivery',
  '/news',
  '/projects',
  '/reportings',
  '/seminars',
  '/vacancies',
  '/catalog',
  '/productions',
];

/**
 * Generates the sitemap for the website.
 * @returns The sitemap as an array of MetadataRoute objects.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Generate the Ukrainian pages for the sitemap
  const ukrainianPages: MetadataRoute.Sitemap = pages.map((page) => ({
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.7,
    url: `${NEXT_PUBLIC_BASE_URL}${page}`,
  }));

  // Generate the English pages for the sitemap
  const englishPages: MetadataRoute.Sitemap = pages.map((page) => ({
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.7,
    url: `${NEXT_PUBLIC_BASE_URL}/en${page}`,
  }));

  // Combine the sitemap pages and return the final sitemap
  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 1,
      url: `${NEXT_PUBLIC_BASE_URL}`,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 1,
      url: `${NEXT_PUBLIC_BASE_URL}/en`,
    },
    ...ukrainianPages,
    ...englishPages,
  ];
}
