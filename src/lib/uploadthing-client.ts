import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../api/uploadthing";

// UploadThing components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// UploadThing API client using direct UploadThing API
export const uploadFile = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Validate file type
  if (!file.type?.startsWith('image/')) {
    throw new Error('Only image files are allowed.');
  }

  // Validate file size (4MB limit)
  if (file.size > 4 * 1024 * 1024) {
    throw new Error('File size exceeds 4MB limit.');
  }

  try {
    console.log('Attempting to upload to UploadThing...');
    
    // Get UploadThing credentials from environment
    const uploadThingSecret = import.meta.env.VITE_UPLOADTHING_SECRET;
    const uploadThingAppId = import.meta.env.VITE_UPLOADTHING_APP_ID;
    
    if (!uploadThingSecret || !uploadThingAppId) {
      throw new Error('UploadThing credentials not configured. Please set VITE_UPLOADTHING_SECRET and VITE_UPLOADTHING_APP_ID in your environment variables.');
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appId', uploadThingAppId);

    // Upload to UploadThing
    const response = await fetch('https://api.uploadthing.com/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${uploadThingSecret}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`UploadThing upload failed: ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.url) {
      throw new Error('No URL returned from UploadThing');
    }

    console.log('Successfully uploaded to UploadThing:', data.url);
    return data.url;

  } catch (uploadThingError) {
    console.warn('UploadThing upload failed, falling back to base64:', uploadThingError);
    
    // Fallback to base64 encoding
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          console.log('Using base64 fallback for image upload');
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
};