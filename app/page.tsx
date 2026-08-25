import UniversalCalculator from '@/components/UniversalCalculator';
import AdUnit from '@/components/AdUnit';
import { getAllTools } from '@/lib/tools';
import Link from 'next/link';
import Hero from '@/components/Hero';

export default function Home() {
  const tools = getAllTools();

  // ✅ FIXED: Category icons properly mapped
  const getIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Shopping': '🛍️',
      'Finance': '💰',
      'Math': '📐',
      'Tax': '🧾',
      'Business': '📊',
      'Education': '📚',
      'Health': '💪',
      'Real Estate': '🏠',
      'Life': '⏰',
      'Cooking': '🍳',
    };
    return icons[category] || '🧮';
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Main Calculator Section */}
      <section className="relative z-20 max-w-4xl mx-auto px-4 -mt-8 md:-mt-12 pb-8 md:pb-12">
        <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8 border border-gray-100 animate-fadeInUp delay-200">
          <UniversalCalculator />
        </div>
        <div className="mt-6">
          <AdUnit />
        </div>
      </section>

      {/* All Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">
            All <span className="gradient-text">50 Calculators</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Explore our complete collection of percentage and financial calculators
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {tools.map((tool, index) => (
            <Link
              key={tool.slug}
              href={`/calculator/${tool.slug}`}
              className="tool-card rounded-2xl p-4 text-center transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <span className="card-icon">{getIcon(tool.category)}</span>
              <h3 className="card-title">{tool.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Callout */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 md:py-20 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Join millions of students, business owners, and finance enthusiasts who use CalcCent daily.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text">50+</div>
              <div className="text-sm text-gray-500 mt-1">Calculators</div>
            </div>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text">⚡</div>
              <div className="text-sm text-gray-500 mt-1">Instant Results</div>
            </div>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text">🔓</div>
              <div className="text-sm text-gray-500 mt-1">100% Free</div>
            </div>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text">📱</div>
              <div className="text-sm text-gray-500 mt-1">Works Everywhere</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}