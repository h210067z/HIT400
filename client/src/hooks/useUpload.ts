"use client";

import { useState, useCallback } from "react";
import { uploadFile, queryText } from "@/lib/api";
import type { QueryResponse, FileFormat } from "@/types/api";

type Status = "idle" | "uploading" | "querying" | "done" | "error";

interface UseUploadResult {
  status: Status;
  progressMessage: string;
  result: QueryResponse | null;
  error: string | null;
  run: (file: File) => Promise<void>;
  reset: () => void;
}

const ALLOWED: FileFormat[] = ["pdf", "docx", "pptx"];
const MAX_SIZE_BYTES = 20 * 1024 * 1024;

export function useUpload(): UseUploadResult {
  const [status, setStatus] = useState<Status>("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgressMessage("");
    setResult(null);
    setError(null);
  }, []);

  const run = useCallback(async (file: File) => {
    setError(null);
    setResult(null);

    const ext = file.name.split(".").pop()?.toLowerCase() as
      | FileFormat
      | undefined;
    if (!ext || !ALLOWED.includes(ext)) {
      setError("Only PDF, DOCX, and PPTX files are accepted.");
      setStatus("error");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError("File is larger than 20 MB.");
      setStatus("error");
      return;
    }

    try {
      setStatus("uploading");
      setProgressMessage("Uploading and extracting text…");
      const uploaded = await uploadFile(file);

      setStatus("querying");
      setProgressMessage("Comparing against archive…");
      const response = await queryText({
        file_name: uploaded.file_name,
        file_format: uploaded.file_format,
        text: uploaded.text,
      });

      setResult(response);
      setStatus("done");
      setProgressMessage("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setStatus("error");
      setProgressMessage("");
    }
  }, []);

  return { status, progressMessage, result, error, run, reset };
}
