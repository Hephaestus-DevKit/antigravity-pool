'use client';

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error;
  unstable_retry: () => void;
}) {
  return (
    <div className="flex items-center justify-center p-20">
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-800">Admin Error</h2>
        <p className="mt-2 text-sm text-red-600">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={unstable_retry}
          className="mt-4 min-h-10 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
