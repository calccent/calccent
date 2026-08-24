import UniversalCalculator from '@/components/UniversalCalculator';
import AdUnit from '@/components/AdUnit';
import { getAllTools } from '@/lib/tools';
import Link from 'next/link';

export default function Home() {
  const tools = getAllTools();

  return (
    <div>
      {/* HERO SECTION - Eye-catching header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Calculate Any Percentage
            <span className="block text-blue-200">In Seconds</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mt-4 max-w-2xl mx-auto">
            Free, fast, and accurate percentage calculator for discounts, tips, taxes, margins, and more.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">🧮 50+ Tools</span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">⚡ Instant Results</span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">🔒 No Sign-ups</span>
          </div>
        </div>
      </section>

      {/* MAIN CALCULATOR SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 -mt-8 relative z-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            🔢 Percentage Calculator
          </h2>
          <AdUnit />
          <UniversalCalculator />
          <AdUnit />
        </div>
      </section>

      {/* ALL 50 TOOLS GRID */}
      <section id="tools" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          📚 All 50 Calculators
          <span className="block text-sm font-normal text-gray-500 mt-1">Click any tool to start calculating</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/calculator/${tool.slug}`}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 text-center group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition">🧮</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">✨ Why Use CalcCent?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800">Lightning Fast</h3>
              <p className="text-gray-500 text-sm">Get your answer in under 1 second. No loading, no waiting.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800">Dead Accurate</h3>
              <p className="text-gray-500 text-sm">Every calculation is precise down to 2 decimal places.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl mb-3">🔓</div>
              <h3 className="font-bold text-gray-800">Completely Free</h3>
              <p className="text-gray-500 text-sm">No sign-ups, no hidden fees. Just pure utility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}