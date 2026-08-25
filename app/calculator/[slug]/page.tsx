import { getAllSlugs, getToolBySlug } from '@/lib/tools';
import UniversalCalculator from '@/components/UniversalCalculator';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: tool.title,
    description: tool.metaDescription,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <span>›</span>
        <Link href="/#tools" className="hover:text-blue-600 transition">Tools</Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{tool.name}</span>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">{tool.name}</h1>
        <p className="text-gray-600 mt-1">{tool.description}</p>
      </div>

      <AdUnit />

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 my-6">
        {/* ✅ PASS THE TOOL SLUG AS THE MODE */}
        <UniversalCalculator 
          initialMode={slug as any}
        />
      </div>

      <AdUnit />

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📖 How It Works</h2>
        <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-100 font-mono text-sm">
          {tool.formula}
        </p>

        <h3 className="font-bold text-gray-800 mt-6 mb-3">❓ Frequently Asked Questions</h3>
        <div className="space-y-3">
          {tool.faqs.map((faq: any, idx: number) => (
            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="font-semibold text-gray-800">Q: {faq.q}</p>
              <p className="text-gray-600 mt-1">A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition font-medium">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}