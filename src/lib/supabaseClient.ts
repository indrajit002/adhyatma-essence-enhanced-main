import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://omkxduypxjpfwiwxsbrf.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ta3hkdXlweGpwZndpd3hzYnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNzQ3OTksImV4cCI6MjA3Mzc1MDc5OX0.2nTdy8VlM-W4J12VQ7cqcyLK-mGqaFni9V9bfTfCirI";


if (!supabaseUrl) {
  throw new Error("Missing VITE_SUPABASE_URL in .env file");
}

if (!supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_ANON_KEY in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

