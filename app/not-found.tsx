import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-300">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-2">Oops! Page Not Found</h2>
        <p className="text-gray-500 mt-2">The calculator or page you're looking for doesn't exist.</p>
        <Link href="/" className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg">
          🏠 Return to Homepage
        </Link>
      </div>
    </div>
  );
}