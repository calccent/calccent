import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">🔒 Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-6"><strong>Last Updated:</strong> June 2025</p>

        <div className="space-y-4 text-gray-600">
          <p>We do not collect, store, or share any personal information. All calculations are performed locally in your browser.</p>

          <p>We use Google AdSense to display ads. AdSense may place cookies to serve personalized ads based on your previous visits to our website or other websites. You can opt out of personalized ads by visiting Google's Ad Settings.</p>

          <p>If you have any questions, please contact us at <a href="mailto:contact@calccent.com" className="text-blue-600 hover:underline">contact@calccent.com</a>.</p>
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