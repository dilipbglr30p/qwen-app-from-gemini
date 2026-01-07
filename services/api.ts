import { GenerationRequest, GenerationResponse, JobStatus } from '../types';

// Points to the FastAPI backend generated in backend/main.py
const API_BASE_URL = 'http://localhost:8000';

export const generateImage = async (request: GenerationRequest): Promise<GenerationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to start generation:", error);
    // For demo purposes in the web preview, we simulate a mock response if the backend isn't running
    console.warn("Falling back to MOCK mode since backend is unreachable in this environment.");
    return mockGenerationProcess();
  }
};

export const checkStatus = async (jobId: string): Promise<GenerationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/status/${jobId}`);
    if (!response.ok) {
      throw new Error(`Status Check Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to check status:", error);
    return {
      jobId,
      status: JobStatus.FAILED,
      error: "Could not reach backend"
    };
  }
};

// Mock function for demonstration when Python backend is not active
const mockGenerationProcess = (): Promise<GenerationResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jobId: "mock-job-" + Math.random().toString(36).substring(7),
        status: JobStatus.IN_PROGRESS
      });
    }, 1000);
  });
};