export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://calccent.com/sitemap.xml', // ← CHANGE TO YOUR REAL DOMAIN
  };
}
