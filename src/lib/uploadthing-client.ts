import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed.');
  }

  // Validate file size (4MB limit)
  if (file.size > 4 * 1024 * 1024) {
    throw new Error('File size exceeds 4MB limit.');
  }

  const fileExtension = file.name.split('.').pop() || 'jpg';
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `public/${fileName}`;

  try {
    // First, try to upload to Supabase Storage
    console.log('Attempting to upload to Supabase Storage...');
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.warn('Supabase Storage upload failed:', error);
      throw error;
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    if (!publicUrlData?.publicUrl) {
      throw new Error('Could not get public URL for the uploaded file.');
    }

    console.log('Successfully uploaded to Supabase Storage:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;

  } catch (supabaseError) {
    console.warn('Supabase Storage failed, falling back to base64:', supabaseError);
    
    // Fallback to base64 data URL if Supabase Storage fails
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            console.log('Using base64 fallback for image upload');
            resolve(result);
          } else {
            reject(new Error('Failed to read file as data URL.'));
          }
        };
        reader.onerror = (error) => {
          reject(new Error(`File reading error: ${error}`));
        };
        reader.readAsDataURL(file);
      });
    } catch (fallbackError) {
      console.error('Both Supabase Storage and base64 fallback failed:', fallbackError);
      throw new Error('File upload failed. Please try again or contact support.');
    }
  }
};