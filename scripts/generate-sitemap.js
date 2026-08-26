const fs = require('fs');
const path = require('path');

// Your tool slugs - import from your tools.json
const tools = [
  'discount', 'tip', 'percentage-increase', 'percentage-decrease', 
  'sales-tax', 'vat', 'profit-margin', 'markup', 'gross-profit', 
  'net-profit', 'roi', 'commission', 'compound-interest', 'grade', 
  'gpa', 'weighted-grade', 'final-grade', 'bmi', 'bmr', 
  'conversion-rate', 'percentage-difference', 'stock-change', 
  'sales-growth', 'revenue-growth', 'yoy-growth', 'mom-growth', 
  'price-increase', 'price-decrease', 'loan-interest', 'calorie-burn', 
  'fraction-to-percent', 'percent-to-fraction', 'percent-error', 
  'average-percentage', 'cap-rate', 'ltv', 'debt-to-income', 
  'margin-vs-markup', 'gst', 'hst', 'pst', 'cagr', 'price-elasticity', 
  'time-percentage', 'abv', 'currency-converter', 'shipping-cost', 
  'property-tax', 'income-tax', 'margin-call', 'dcf', 'employee-turnover', 
  'stock-split', 'food-cost', 'inventory-turnover', 'rent-vs-buy', 
  'expense-ratio', 'electricity-cost', 'profit-sharing', 'defect-rate'
];

const baseUrl = 'https://calccent.com';
const today = new Date().toISOString().split('T')[0];

// Generate XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

// Add all tool pages
tools.forEach(tool => {
  xml += `
  <url>
    <loc>${baseUrl}/calculator/${tool}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

xml += `
</urlset>`;

// Write to public folder
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log('✅ Sitemap generated successfully!');