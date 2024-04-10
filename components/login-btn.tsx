'use client';
import React from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';

export default function GithubAuthBtn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `https://blossom-ai-rose.vercel.app/auth/callback`,
      },
    });

    console.log(data, error);
  }

  return (
    <Button
      onClick={() => {
        console.log('clicked');
        signInWithGithub();
      }}
      className='my-2 rounded-md bg-blsm_accent px-4 py-2 font-montserrat font-black text-white hover:bg-blsm_primary'
    >
      Sign in with GitHub
    </Button>
  );
}
