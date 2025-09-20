import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Better error handling with visible messages
if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is missing from .env file');
  console.error('Please add: VITE_SUPABASE_URL=https://your-project-ref.supabase.co');
  throw new Error("Missing VITE_SUPABASE_URL in .env file");
}

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing from .env file');
  console.error('Please add: VITE_SUPABASE_ANON_KEY=your-anon-key-here');
  throw new Error("Missing VITE_SUPABASE_ANON_KEY in .env file");
}

// Supabase configuration loaded successfully

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
