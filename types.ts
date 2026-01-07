export interface GenerationRequest {
  imageUrl: string;
  prompt: string;
  negativePrompt?: string;
}

export enum JobStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  TIMED_OUT = 'TIMED_OUT'
}

export interface GenerationResponse {
  jobId: string;
  status: JobStatus;
  outputUrl?: string;
  error?: string;
}

export interface RunPodResponse {
  id: string;
  status: string;
  output?: {
    image?: string; // URL or Base64
    message?: string;
  };
  error?: string;
}