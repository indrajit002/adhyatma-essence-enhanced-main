# UploadThing Setup - Simple Guide

## 🚀 Quick Setup

### Step 1: Get UploadThing API Keys

1. **Go to [UploadThing Dashboard](https://uploadthing.com/dashboard)**
2. **Sign up/Login** with your account
3. **Create a new app** or select existing one
4. **Copy your API keys:**
   - `UPLOADTHING_SECRET` (Server-side)
   - `UPLOADTHING_APP_ID` (Client-side)

### Step 2: Add Environment Variables

Create/update your `.env` file:

```env
# UploadThing API Keys
UPLOADTHING_SECRET=your_secret_key_here
UPLOADTHING_APP_ID=your_app_id_here

# Your existing Supabase keys
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Update API Server

The API server is already configured to work with UploadThing. It will:
- ✅ **Handle file uploads** - UploadThing manages the actual file storage
- ✅ **Return file URLs** - UploadThing provides the public URLs
- ✅ **Save to Supabase** - URLs are saved to your products table

## 🔧 How It Works

1. **User selects image** → UploadThing handles the upload
2. **UploadThing stores file** → Returns public URL
3. **Form saves product** → URL saved to Supabase products table
4. **Image accessible** → Works across all devices and sessions

## 🧪 Test the Setup

1. **Start development servers:**
   ```bash
   # Terminal 1: Start API server
   npm run dev:api
   
   # Terminal 2: Start Vite dev server
   npm run dev
   ```

2. **Test upload:**
   - Go to `http://localhost:8080/admin`
   - Click "Add Product"
   - Upload an image using UploadThing
   - Check console logs for upload progress
   - Submit the form

## 📋 Expected Flow

1. **Image upload** → UploadThing processes file
2. **URL returned** → `https://utfs.io/f/...` format
3. **Product saved** → URL stored in Supabase
4. **Image displays** → Works everywhere

## 🔍 Debugging

**Check console logs for:**
- `🚀 UploadThing upload starting` - Upload begins
- `✅ UploadThing upload complete` - Upload successful
- `🔗 UploadThing URL` - File URL received
- `❌ UploadThing upload error` - Upload failed

## 🎯 Benefits

- ✅ **No Supabase Storage setup** - UploadThing handles everything
- ✅ **Automatic CDN** - Fast image delivery
- ✅ **File optimization** - Automatic image processing
- ✅ **Reliable storage** - Enterprise-grade infrastructure
- ✅ **Easy integration** - Just add API keys

## 🚨 Troubleshooting

### If upload fails:
- **Check API keys** - Make sure they're correct in `.env`
- **Check console** - Look for error messages
- **Check network** - Ensure internet connection
- **Check file size** - Must be under 4MB

### If form doesn't submit:
- **Wait for upload** - Don't submit while uploading
- **Check URL format** - Should be `https://utfs.io/f/...`
- **Check console** - Look for validation errors

## 📝 Notes

- **Development mode** - Uses mock UploadThing for testing
- **Production mode** - Uses real UploadThing service
- **File persistence** - Images stored permanently
- **No local storage** - All files go to UploadThing
