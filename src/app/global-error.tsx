'use client';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error;
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body>
        <main className="min-h-screen bg-[#f6f7f9] flex items-center justify-center font-sans">
          <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-lg font-semibold text-red-800">Application Error</h1>
            <p className="mt-2 text-sm text-red-600">{error.message || 'A critical error occurred'}</p>
            <button
              onClick={unstable_retry}
              className="mt-4 min-h-10 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
