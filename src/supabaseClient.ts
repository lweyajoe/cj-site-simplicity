import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://saqsjqjwrdhztwwhahjv.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcXNqcWp3cmRoenR3d2hhaGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMzUwMTksImV4cCI6MjA0NzgxMTAxOX0.WR1dUtC6A9BXgC3KVMeT-WhBR6T_cQHmiGfBbe_4ni0'; // Replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
