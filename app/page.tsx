import UniversalCalculator from '@/components/UniversalCalculator';
import AdUnit from '@/components/AdUnit';
import { getAllTools } from '@/lib/tools';

export default function Home() {
  const tools = getAllTools();

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          CalcCent <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-gray-500 text-lg mt-2">Calculate any percentage in seconds.</p>
      </div>
      
      <AdUnit />

      <UniversalCalculator />

      <AdUnit />

      {/* ALL 50 TOOLS LISTED */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 All 50 Calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <a 
              key={tool.slug} 
              href={`/calculator/${tool.slug}`}
              className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition hover:border-blue-300 text-center text-sm font-medium text-gray-700"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-20 text-center text-sm text-gray-400 border-t pt-8">
        <div className="flex gap-4 justify-center mb-4">
          <a href="/about" className="hover:text-gray-600">About</a>
          <a href="/privacy" className="hover:text-gray-600">Privacy</a>
          <a href="/contact" className="hover:text-gray-600">Contact</a>
        </div>
        <p>© 2025 CalcCent. Built for speed and utility.</p>
      </footer>
    </main>
  );
}