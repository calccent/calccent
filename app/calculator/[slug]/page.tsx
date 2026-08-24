import { getAllSlugs, getToolBySlug } from '@/lib/tools';
import UniversalCalculator from '@/components/UniversalCalculator';
import AdUnit from '@/components/AdUnit';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Not Found' };
  return {
    title: tool.title,
    description: tool.metaDescription,
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return notFound();

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-3xl mx-auto">
      
      <div className="text-sm text-gray-400 mb-4">
        <a href="/" className="hover:text-blue-500">Home</a> / 
        <span className="text-gray-700">{tool.name}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">{tool.name}</h1>
      <p className="text-gray-500 mt-1">{tool.description}</p>
      
      <div className="my-4">
        <AdUnit />
      </div>

      <div className="my-6">
        <UniversalCalculator />
      </div>

      <div className="my-6">
        <AdUnit />
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl mt-8 border border-gray-200">
        <h2 className="text-xl font-bold mb-2">📖 How it works</h2>
        <p className="text-gray-700">{tool.formula}</p>
        
        <h3 className="font-bold mt-4">❓ Frequently Asked Questions</h3>
        {tool.faqs.map((faq: any, idx: number) => (
          <div key={idx} className="mt-2 border-b border-gray-200 pb-2">
            <p className="font-semibold">Q: {faq.q}</p>
            <p className="text-gray-600">A: {faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}