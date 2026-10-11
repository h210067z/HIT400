// HIT 400 Project Archive and Duplication Detection System
// API Contract — v0.1.0

export type Verdict = "ALREADY_DONE" | "RELATED" | "FRESH";
export type Role = "student" | "lecturer" | "admin";
export type Saturation = "saturated" | "moderate" | "sparse";
export type FileFormat = "pdf" | "docx" | "pptx";

export interface Project {
  id: string;
  title: string;
  student_name: string;
  registration_number: string;
  year: number;
  supervisor: string;
  file_format: FileFormat;
  cluster_id: number | null;
  keywords: string[];
}

export interface Match {
  project: Project;
  similarity: number;
  overlapping_sections: string[];
  future_work: string;
  limitations: string;
}

export interface Recommendation {
  match_id: string;
  text: string;
  based_on: string[];
}

export interface Cluster {
  cluster_id: number;
  label: string;
  size: number;
  saturation: Saturation;
  keywords: string[];
}

export interface GapReport {
  nearest_clusters: Cluster[];
  suggested_directions: string[];
}

export interface QueryRequest {
  file_name: string;
  file_format: FileFormat;
  text: string;
}

export interface QueryResponse {
  verdict: Verdict;
  query_id: string;
  matches: Match[];
  recommendations: Recommendation[];
  gap_report: GapReport | null;
  processing_ms: number;
}

export interface UploadResponse {
  file_id: string;
  file_name: string;
  file_format: FileFormat;
  text: string;
  char_count: number;
}

export interface ArchiveAddRequest {
  title: string;
  student_name: string;
  registration_number: string;
  year: number;
  supervisor: string;
  file_id: string;
}

export interface ArchiveAddResponse {
  project: Project;
  already_existed: boolean;
}

export interface ArchiveQueryResponse {
  projects: Project[];
  total: number;
  page: number;
  page_size: number;
}

export interface ClusterRunResponse {
  clusters: Cluster[];
  total_projects: number;
  run_at: string;
}

export interface TopicMapResponse {
  clusters: Cluster[];
  points: Array<{
    project_id: string;
    x: number;
    y: number;
    cluster_id: number | null;
  }>;
}

export interface ApiError {
  error: string;
  message: string;
  detail?: string;
}
