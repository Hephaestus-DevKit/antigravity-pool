export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center p-20">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        <p className="text-sm text-slate-500">Loading admin panel...</p>
      </div>
    </div>
  );
}
