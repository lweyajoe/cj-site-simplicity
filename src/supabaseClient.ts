import { createClient, AuthError, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://saqsjqjwrdhztwwhahjv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcXNqcWp3cmRoenR3d2hhaGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMzUwMTksImV4cCI6MjA0NzgxMTAxOX0.WR1dUtC6A9BXgC3KVMeT-WhBR6T_cQHmiGfBbe_4ni0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) console.error('Error signing in with Google:', error.message);
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) console.error('Error signing in:', error.message);
  else console.log('Signed in user:', data.user);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
}

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user };
}