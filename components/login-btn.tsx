"use client"
import React from 'react'
import github from '@/public/github-mark.svg'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'

export default function GithubAuthBtn() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
    async function handleGithubAuth() {
        console.log('login with github')
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: 'http://localhost:3000/auth/callback' }
          })
            if (error) {
                console.log('Error:', error)
                return
            }
            console.log('Data:', data)
          
    }
  return (
    <button 
    className="bg-blsm_black text-blsm_accent rounded-md py-2 flex items-center justify-center gap-2 font-cabin px-6 self-center font-black hover:bg-blsm_text"
    onClick={
        () => {
            handleGithubAuth()
        }
     }
    >
    <Image
     src={github}
     alt='github logo'
     width={24}
     height={24}
    
    /> Login with GitHub
 </button>
  )
}
