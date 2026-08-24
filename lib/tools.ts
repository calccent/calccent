import toolsData from '@/data/tools.json';

export interface Tool {
  slug: string;
  name: string;
  category: string;
  description: string;
  title: string;
  metaDescription: string;
  formula: string;
  faqs: { q: string; a: string }[];
}

export function getAllTools(): Tool[] {
  return toolsData;
}

export function getAllSlugs(): string[] {
  return toolsData.map(tool => tool.slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return toolsData.find(tool => tool.slug === slug);
}