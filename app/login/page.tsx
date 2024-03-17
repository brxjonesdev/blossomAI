import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthForm from '@/components/auth-form';

const supabase = createClient();




export default function LoginPage() {
  return (
    <main>
      <section>
        <Tabs defaultValue='login' className='border-2 border-purple-500 mx-5'>
          <TabsList className='w-full'>
            <TabsTrigger value='login' className='w-full'>Login</TabsTrigger>
            <TabsTrigger value='signup' className='w-full'>Signup</TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <p>
                Login here.
            </p>
            <Link href="/home" className='border-2 border-blsm_accent'>Home</Link>   
          </TabsContent>
          <TabsContent value='signup'>
            <p>
                Signup here.
            </p>
            <AuthForm githubLogin={async ()=> {
              'use server'
              signInWithGithub();
            }}/>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
