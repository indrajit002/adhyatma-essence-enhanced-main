# Supabase Storage Setup for Product Images

This guide will help you set up Supabase Storage for product image uploads.

## Step 1: Create Storage Bucket

1. Go to your **Supabase Dashboard**
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure the bucket:
   - **Name**: `product-images`
   - **Public**: ✅ **Yes** (so images can be accessed publicly)
   - **File size limit**: `4 MB`
   - **Allowed MIME types**: `image/*`

## Step 2: Set Up RLS Policies

1. Go to **Storage** > **Policies**
2. Click **"New Policy"** for the `product-images` bucket
3. Create these policies:

### Policy 1: Allow public read access
```sql
CREATE POLICY "Public read access for product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');
```

### Policy 2: Allow authenticated users to upload
```sql
CREATE POLICY "Authenticated users can upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
```

### Policy 3: Allow admins to manage images
```sql
CREATE POLICY "Admins can manage product images" ON storage.objects
FOR ALL USING (
  bucket_id = 'product-images' 
  AND is_admin(auth.uid())
);
```

## Step 3: Test the Setup

1. Go to your admin dashboard
2. Try uploading a product image
3. Check the browser console for upload logs
4. Verify the image appears in your Supabase Storage bucket

## Troubleshooting

### If you see "Bucket not found" error:
- Make sure the bucket name is exactly `product-images`
- Check that the bucket is set to public

### If you see "Permission denied" error:
- Verify the RLS policies are created correctly
- Make sure you're logged in as an authenticated user

### If uploads fail completely:
- The system will automatically fall back to base64 encoding
- Images will still work, but they'll be stored as data URLs in the database
- This is a temporary solution until storage is properly configured

## Alternative: Use Base64 Only

If you prefer to skip Supabase Storage setup for now, the system will automatically use base64 encoding as a fallback. This means:

- ✅ Images will work immediately
- ✅ No additional setup required
- ⚠️ Images are stored in the database (larger database size)
- ⚠️ Slower page loads with many images

## Production Recommendations

For production, consider using:
- **Supabase Storage** (recommended)
- **Cloudinary** (alternative)
- **AWS S3** (enterprise option)

The current setup supports all these options with minimal code changes.
