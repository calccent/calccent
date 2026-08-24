import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">🧮 About CalcCent</h1>

        <div className="space-y-4 text-gray-600">
          <p>CalcCent is a free online utility designed to help you calculate percentages in seconds. Whether you need to calculate a discount, tip, tax, margin, or any other percentage, we provide fast, accurate, and easy-to-use tools.</p>

          <p>Our mission is to make math simple for everyone—no sign-ups, no clutter, just answers.</p>

          <p>We serve millions of calculations every month, helping students, shoppers, business owners, and finance enthusiasts worldwide.</p>
        </div>

        {/* ✅ BACK TO HOME BUTTON */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href="/" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg">
            <span className="mr-2">🏠</span> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}