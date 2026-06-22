'use client';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error;
  unstable_retry: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#f6f7f9] flex items-center justify-center">
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
        <p className="mt-2 text-sm text-red-600">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={unstable_retry}
          className="mt-4 min-h-10 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
