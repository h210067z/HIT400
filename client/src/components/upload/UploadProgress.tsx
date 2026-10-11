interface UploadProgressProps {
  message: string;
}

export default function UploadProgress({ message }: UploadProgressProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      <div>
        <p className="text-sm font-semibold text-blue-900">Working…</p>
        <p className="text-xs text-blue-700">{message}</p>
      </div>
    </div>
  );
}
