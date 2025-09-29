# UploadThing Setup Guide

This guide will help you set up image uploads for your crystal store admin panel.

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
npm install uploadthing @uploadthing/react
```

### Step 2: Create UploadThing Account

1. Go to [uploadthing.com](https://uploadthing.com)
2. Sign up for a free account
3. Create a new project
4. Get your API keys from the dashboard

### Step 3: Environment Variables

Add these to your `.env.local` file:

```env
UPLOADTHING_SECRET=your_secret_key_here
UPLOADTHING_APP_ID=your_app_id_here
NEXT_PUBLIC_UPLOADTHING_URL=https://api.uploadthing.com
```

### Step 4: Update Configuration

Replace the content in `src/lib/uploadthing-client.ts` with:

```typescript
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "./uploadthing";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
```

### Step 5: Create UploadThing Router

Create `src/lib/uploadthing.ts`:

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Add any authentication logic here
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
```

## 🔧 Alternative: Cloudinary Setup

If you prefer Cloudinary (easier setup):

### Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your cloud name and upload preset

### Step 2: Update Environment Variables

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Step 3: Update Upload Function

In `src/lib/uploadthing-client.ts`, uncomment the Cloudinary function and update with your credentials.

## 📝 Current Implementation

The current setup uses base64 data URLs for development. This works but has limitations:

- ✅ **Works immediately** - No setup required
- ✅ **Good for development** - Quick to test
- ❌ **Not production ready** - Large images slow down the app
- ❌ **No CDN** - Images load slowly

## 🚀 Production Recommendations

For production, use one of these services:

1. **UploadThing** - Best for Next.js apps
2. **Cloudinary** - Great image optimization
3. **AWS S3** - Most flexible
4. **Supabase Storage** - If using Supabase

## 🔄 Migration Steps

1. Choose your preferred service
2. Follow their setup guide
3. Update `src/lib/uploadthing-client.ts`
4. Test the upload functionality
5. Deploy with new environment variables

## 🛠️ Testing

1. Go to `/admin`
2. Click "Add Product"
3. Try uploading an image
4. Check if the image appears in the preview
5. Submit the form and verify the image is saved

## 📞 Support

If you need help:
1. Check the service documentation
2. Verify environment variables
3. Check browser console for errors
4. Ensure file size is under 4MB
