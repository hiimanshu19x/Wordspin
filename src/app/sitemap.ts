import { SITE_URL } from '@/lib/constants';
import { SAMPLE_PROMPTS } from '@/lib/prompts';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/spin', '/explore', '/daily', '/saved'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const dynamicRoutes = SAMPLE_PROMPTS.map((prompt) => ({
    url: `${SITE_URL}/prompt/${prompt.id}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
