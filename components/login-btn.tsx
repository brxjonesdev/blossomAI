"use client"
import React from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from "@/components/ui/button"


export default function GithubAuthBtn() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  
    async function signInWithGithub() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: "http://localhost:3000/home",
        // redirectTo: "https://blossom-ai-rose.vercel.app/home",
        },
      });
      console.log(data, error);
    }
  
    return (
      <Button
        onClick={() => {
          signInWithGithub();
        }}
        className='bg-blsm_accent text-white font-black py-2 px-4 rounded-md my-2 font-montserrat hover:bg-blsm_primary'>
        Sign in with GitHub
      </Button>
    )
}