"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface FileDropzoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED = ".pdf,.docx,.pptx";

export default function FileDropzone({
  onFile,
  disabled = false,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    // Reset the input so selecting the same file again still fires onChange.
    e.target.value = "";
  }

  function openPicker() {
    if (!disabled) inputRef.current?.click();
  }

  return (
    <div
      onClick={openPicker}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
          : dragging
          ? "border-blue-500 bg-blue-50"
          : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      <div className="mb-3 text-4xl text-blue-600">↑</div>
      <p className="text-base font-semibold text-slate-800">
        Drop your proposal here
      </p>
      <p className="mt-1 text-sm text-slate-500">
        or click to browse
      </p>
      <p className="mt-4 text-xs text-slate-400">
        PDF, DOCX, or PPTX · up to 20 MB
      </p>
    </div>
  );
}
