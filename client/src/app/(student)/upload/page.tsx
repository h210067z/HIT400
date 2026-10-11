"use client";

import { useState } from "react";
import FileDropzone from "@/components/upload/FileDropzone";
import UploadProgress from "@/components/upload/UploadProgress";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useUpload } from "@/hooks/useUpload";

export default function UploadPage() {
  const { status, progressMessage, result, error, run, reset } = useUpload();
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    setFileName(file.name);
    run(file);
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Check your proposal
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload your final-year project proposal and the system will check
          whether it duplicates, relates to, or is distinct from past work.
        </p>
      </div>

      {status === "idle" && (
        <FileDropzone onFile={handleFile} />
      )}

      {(status === "uploading" || status === "querying") && (
        <>
          {fileName && (
            <p className="text-sm text-slate-600">
              Uploading <span className="font-medium">{fileName}</span>
            </p>
          )}
          <UploadProgress message={progressMessage} />
        </>
      )}

      {status === "error" && (
        <Card className="border-red-300 bg-red-50">
          <p className="text-sm font-semibold text-red-800">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={reset}>
              Try again
            </Button>
          </div>
        </Card>
      )}

      {status === "done" && result && (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-900">Result</h2>
            <Badge variant={result.verdict}>{result.verdict}</Badge>
          </div>

          <p className="text-sm text-slate-700">
            Processing time: {result.processing_ms} ms
          </p>

          {result.matches.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-800">
                Matched projects:
              </p>
              <ul className="mt-2 space-y-2">
                {result.matches.map((m) => (
                  <li
                    key={m.project.id}
                    className="rounded-lg border border-slate-200 p-3"
                  >
                    <p className="text-sm font-medium text-slate-900">
                      {m.project.title}
                    </p>
                    <p className="text-xs text-slate-600">
                      {m.project.student_name} · {m.project.year} ·{" "}
                      {(m.similarity * 100).toFixed(1)}% similar
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-800">
                Recommendations:
              </p>
              <ul className="mt-2 space-y-2">
                {result.recommendations.map((r, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                  >
                    {r.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.gap_report && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-800">
                Gap report:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {result.gap_report.suggested_directions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5">
            <Button variant="secondary" onClick={reset}>
              Check another proposal
            </Button>
          </div>
        </Card>
      )}
    </main>
  );
}
