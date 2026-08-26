import { getAllSlugs } from '@/lib/tools';

export default async function sitemap() {
  const baseUrl = 'https://calccent.com'; // CHANGE TO YOUR DOMAIN
  const slugs = getAllSlugs();
  const toolPages = slugs.map((slug) => ({
    url: `${baseUrl}/calculator/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...toolPages,
  ];
}