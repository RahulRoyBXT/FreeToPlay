import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <FaExclamationTriangle className="text-yellow-500 text-6xl" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for seems to have vanished into the digital void.
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200">
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}