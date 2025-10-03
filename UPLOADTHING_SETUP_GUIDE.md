# UploadThing Setup Guide

## Environment Variables Required

Create a `.env` file in the root directory with the following variables:

```env
# UploadThing Configuration
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# Supabase Configuration (if not already set)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Setup Steps

1. **Create UploadThing Account**
   - Go to [uploadthing.com](https://uploadthing.com)
   - Sign up for an account
   - Create a new app

2. **Get API Keys**
   - Copy your `UPLOADTHING_SECRET` from the dashboard
   - Copy your `UPLOADTHING_APP_ID` from the dashboard

3. **Configure Environment Variables**
   - Add the keys to your `.env` file
   - Make sure to add `.env` to your `.gitignore` file

4. **Deploy API Routes**
   - The API routes are configured in `api/uploadthing/index.js` and `api/uploadthing/core.ts`
   - Make sure your deployment platform (Vercel) can access these routes

## How It Works

1. **Image Upload Flow**:
   - User selects an image in the admin form
   - Image is uploaded to UploadThing
   - UploadThing returns a public URL
   - URL is stored in Supabase database

2. **File Configuration**:
   - Maximum file size: 4MB
   - Allowed types: Images only
   - Maximum files per upload: 1

3. **Error Handling**:
   - Upload progress indicators
   - Error messages for failed uploads
   - Form validation prevents submission without image

4. **Technical Implementation**:
   - Uses `generateUploadButton` from `@uploadthing/react`
   - Properly typed with TypeScript
   - API routes configured for Vercel deployment

## Testing

1. Go to the admin dashboard
2. Navigate to "Add Product" tab
3. Try uploading an image
4. Check browser console for upload logs
5. Verify the image URL is stored in the database

## Troubleshooting

- **Upload fails**: Check UploadThing API keys and network connection
- **TypeScript errors**: Make sure all imports are correct
- **CORS issues**: Verify API route configuration
- **File too large**: Images must be under 4MB
- **"generateComponents" export error**: This has been fixed by using `generateUploadButton` instead
- **Module import errors**: Clear Vite cache with `rm -rf node_modules/.vite && npm run dev`
