# How to Make Someone an Admin

This guide shows you how to set up admin access for your crystal store.

## 🚀 Quick Setup (5 minutes)

### Step 1: Set Up Admin System in Database

1. **Go to Supabase Dashboard**
   - Open your Supabase project
   - Click on **SQL Editor** in the left sidebar

2. **Run the Admin Setup SQL**
   - Copy and paste this entire code block:

```sql
-- Add admin column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin-only policies for product management
CREATE POLICY "Only admins can insert products" ON public.products
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update products" ON public.products
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete products" ON public.products
  FOR DELETE USING (is_admin(auth.uid()));

-- Allow everyone to read products
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);
```

3. **Click "Run"** to execute the SQL

### Step 2: Find the User ID

1. **Go to Authentication > Users**
   - In your Supabase Dashboard
   - Find the user you want to make admin
   - Copy their **User ID** (looks like: `12345678-1234-1234-1234-123456789abc`)

### Step 3: Make User an Admin

1. **Go back to SQL Editor**
2. **Run this SQL** (replace `USER_ID_HERE` with the actual User ID):

```sql
-- Make user an admin (replace USER_ID_HERE with actual ID)
UPDATE public.profiles 
SET is_admin = true 
WHERE id = 'USER_ID_HERE';
```

3. **Click "Run"**

### Step 4: Test Admin Access

1. **Sign in** to your app with the admin account
2. **Go to:** `http://localhost:5173/admin`
3. **You should see** the admin dashboard with:
   - Shield icon
   - "Welcome back, [Name]"
   - Tabs for Products, Add Product, Statistics, Settings

## ✅ Success!

If you can see the admin dashboard, you're all set! The user now has admin access.

## 🔧 Troubleshooting

### "Access Denied" Error
- **Problem:** User is not set as admin in database
- **Solution:** Re-run Step 3 with the correct User ID

### "Page Not Found" Error
- **Problem:** User is not signed in
- **Solution:** Sign in first, then go to `/admin`

### Database Errors
- **Problem:** SQL didn't run properly
- **Solution:** Check your Supabase connection and re-run Step 1

### Can't Find User ID
- **Problem:** User hasn't signed up yet
- **Solution:** Have them sign up first, then find their ID in Authentication > Users

## 📝 Notes

- **Only admins** can access `/admin` page
- **All customers** can browse products normally
- **Admin powers:** Add, edit, delete products; view statistics
- **Security:** Database-level protection ensures only admins can manage products

## 🆘 Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your Supabase project is connected
3. Make sure the user has signed up and confirmed their email
4. Double-check the User ID is correct (no extra spaces or characters)
