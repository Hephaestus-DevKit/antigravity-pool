export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-950" />
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </main>
  );
}
