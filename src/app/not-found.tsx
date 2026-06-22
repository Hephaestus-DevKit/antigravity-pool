import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] flex items-center justify-center">
      <div className="max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-6xl font-bold text-slate-200">404</h1>
        <h2 className="mt-4 text-lg font-semibold text-slate-950">Page not found</h2>
        <p className="mt-2 text-sm text-slate-500">The requested page does not exist or has been moved.</p>
        <Link
          href="/"
          className="mt-6 inline-block min-h-10 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
