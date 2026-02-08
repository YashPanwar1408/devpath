import type { Resume } from '@/lib/schemas/resume.schema';

/**
 * Parse PDF file and extract structured resume data using AI
 * This sends the PDF to our Next.js API route which processes it server-side
 */
export async function parsePDFResume(file: File): Promise<Resume> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/parse-resume', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMsg = error.details || error.error || 'Failed to parse PDF';
      console.error('API Error:', error);
      throw new Error(errorMsg);
    }

    const { resume } = await response.json();
    return resume;
  } catch (error) {
    console.error('Error parsing PDF resume:', error);
    throw error;
  }
}

/**
 * Validate file type and size before upload
 */
export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Please upload a PDF file' };
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  return { valid: true };
}
