/**
 * PDF Resume Parser API Route
 * Proxies PDF upload to backend for processing with Gemini AI
 */

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded file from form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('Uploading PDF to backend:', file.name, file.size);

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create FormData for backend (using form-data package for Node.js)
    const FormData = (await import('form-data')).default;
    const backendFormData = new FormData();
    backendFormData.append('file', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // Forward to backend API
    const response = await fetch(`${BACKEND_URL}/api/extract-pdf-text`, {
      method: 'POST',
      body: backendFormData as unknown as BodyInit,
      headers: backendFormData.getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend PDF extraction error:', errorData);
      return NextResponse.json(
        { 
          error: 'Failed to extract text from PDF',
          details: errorData.error || 'Backend service unavailable'
        },
        { status: response.status }
      );
    }

    const { text } = await response.json();
    console.log('PDF text extracted, length:', text?.length || 0);

    if (!text || !text.trim()) {
      return NextResponse.json(
        { 
          error: 'Could not extract readable text from PDF',
          details: 'The PDF appears to contain no selectable text. Try exporting it again as a text-based PDF.',
        },
        { status: 400 }
      );
    }

    // Parse the extracted text using backend AI service
    const parseResponse = await fetch(`${BACKEND_URL}/api/parse-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!parseResponse.ok) {
      const errorData = await parseResponse.json().catch(() => ({}));
      console.error('Backend resume parsing error:', errorData);
      return NextResponse.json(
        { 
          error: 'Failed to parse resume',
          details: errorData.error || 'AI parsing failed'
        },
        { status: parseResponse.status }
      );
    }

    const resume = await parseResponse.json();
    console.log('Resume parsed successfully');

    return NextResponse.json({
      success: true,
      resume,
    });

  } catch (error: unknown) {
    console.error('PDF Parse Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown',
      name: error instanceof Error ? error.name : 'Unknown',
    });
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to parse resume',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
