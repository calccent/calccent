import Link from 'next/link';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">📬 Contact Us</h1>

        <div className="space-y-4 text-gray-600">
          <p>Have a question, suggestion, or need help? Reach out to us anytime.</p>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="font-semibold text-gray-700">📧 Email:</p>
            <a href="mailto:contact@calccent.com" className="text-blue-600 hover:underline text-lg">contact@calccent.com</a>
          </div>

          <p className="text-sm text-gray-400">We usually respond within 24 hours.</p>
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