# UploadThing Setup Guide

## 1. Create UploadThing Account
1. Go to [uploadthing.com](https://uploadthing.com)
2. Sign up for a free account
3. Create a new app

## 2. Get Your Credentials
1. In your UploadThing dashboard, go to "API Keys"
2. Copy your `UPLOADTHING_SECRET`
3. Copy your `UPLOADTHING_APP_ID`

## 3. Set Environment Variables
Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# UploadThing Configuration
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
```

## 4. Deploy to Vercel
1. Push your code to GitHub
2. Connect to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

## 5. Test the Upload
1. Run `npm run dev`
2. Go to your product form
3. Try uploading an image
4. Check if the image appears in the preview

## How It Works
1. User selects image → UploadThing handles upload
2. UploadThing returns public URL → Image preview shows
3. Form submission → Product + image URL saved to Supabase
4. Images display throughout app using UploadThing URLs
