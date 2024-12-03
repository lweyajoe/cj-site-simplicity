import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://saqsjqjwrdhztwwhahjv.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcXNqcWp3cmRoenR3d2hhaGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMzUwMTksImV4cCI6MjA0NzgxMTAxOX0.WR1dUtC6A9BXgC3KVMeT-WhBR6T_cQHmiGfBbe_4ni0'; // Replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { supabase } from './supabaseClient';

async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) console.error('Error signing in with Google:', error.message);
}

async function signInWithEmail(email: string, password: string) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) console.error('Error signing in:', error.message);
  else console.log('Signed in user:', user);
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
}

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function useAuthState() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  return { user };
}

