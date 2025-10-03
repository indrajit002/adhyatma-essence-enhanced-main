# Quick Supabase Storage Setup

## 🚀 One-Click Setup

### Step 1: Create Storage Bucket

1. **Go to your Supabase Dashboard**
2. **Navigate to Storage** (left sidebar)
3. **Click "New bucket"**
4. **Configure:**
   - **Name**: `product-images`
   - **Public**: ✅ **Yes**
   - **File size limit**: `4 MB`
   - **Allowed MIME types**: `image/*`

### Step 2: Set Up RLS Policies

1. **Go to Storage > Policies**
2. **Click "New Policy"** for `product-images` bucket
3. **Copy and paste these policies:**

```sql
-- Policy 1: Public read access
CREATE POLICY "Public read access for product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Policy 2: Authenticated users can upload
CREATE POLICY "Authenticated users can upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Admins can manage images
CREATE POLICY "Admins can manage product images" ON storage.objects
FOR ALL USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
```

## ✅ Test the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Go to admin dashboard:** `http://localhost:8080/admin`

3. **Try uploading an image:**
   - Click "Add Product"
   - Upload an image
   - Check browser console for upload logs
   - Submit the form

4. **Verify in Supabase:**
   - Go to Storage > product-images
   - You should see your uploaded image

## 🔧 Troubleshooting

### If upload fails:
- **Check console logs** - Look for error messages
- **Verify bucket exists** - Name must be exactly `product-images`
- **Check policies** - Make sure all 3 policies are created
- **Verify authentication** - Make sure you're logged in

### If you see "Bucket not found":
- The bucket name must be exactly `product-images`
- Make sure the bucket is set to **Public**

### If you see "Permission denied":
- Check that all 3 RLS policies are created
- Make sure you're logged in as an authenticated user

## 📝 What This Does

- ✅ **Images upload to Supabase Storage** - Real cloud storage
- ✅ **Public URLs generated** - Images accessible from anywhere
- ✅ **Automatic fallback** - If upload fails, keeps preview URL
- ✅ **Background upload** - Shows preview immediately, uploads in background
- ✅ **Form validation** - Ensures image is uploaded before submission

## 🎯 Result

After setup, when you upload an image:
1. **Preview shows immediately** (blob URL)
2. **Image uploads to Supabase** in background
3. **URL updates to public Supabase URL** when upload completes
4. **Product saves with real image URL** in database
5. **Image persists** and works across all devices/sessions
