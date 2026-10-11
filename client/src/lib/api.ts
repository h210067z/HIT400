import type {
  QueryRequest,
  QueryResponse,
  UploadResponse,
  ArchiveQueryResponse,
  ArchiveAddRequest,
  ArchiveAddResponse,
  ClusterRunResponse,
  TopicMapResponse,
  ApiError,
} from "@/types/api";

const API_BASE = "/api/mock";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let err: ApiError;
    try {
      err = await res.json();
    } catch {
      err = {
        error: "UNKNOWN",
        message: `Request failed with status ${res.status}`,
      };
    }
    throw new Error(err.message);
  }
  return res.json() as Promise<T>;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: form,
  });

  return handle<UploadResponse>(res);
}

export async function queryText(
  payload: QueryRequest
): Promise<QueryResponse> {
  const res = await fetch(`${API_BASE}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handle<QueryResponse>(res);
}

export async function listArchive(): Promise<ArchiveQueryResponse> {
  const res = await fetch(`${API_BASE}/archive`, {
    method: "GET",
  });

  return handle<ArchiveQueryResponse>(res);
}

export async function addToArchive(
  payload: ArchiveAddRequest
): Promise<ArchiveAddResponse> {
  throw new Error("addToArchive is not yet implemented");
}

export async function runClustering(): Promise<ClusterRunResponse> {
  throw new Error("runClustering is not yet implemented");
}

export async function getTopicMap(): Promise<TopicMapResponse> {
  throw new Error("getTopicMap is not yet implemented");
}
