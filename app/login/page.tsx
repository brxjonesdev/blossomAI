import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthForm from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className='w-full max-w-[600px] self-center'>
      <Tabs defaultValue='login'>
        <TabsList className='min-h-[60px] w-full'>
          <TabsTrigger value='login' className='min-h-[50px] w-full'>
            Login
          </TabsTrigger>
          <TabsTrigger value='signup' className='min-h-[50px] w-full'>
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value='login'
          className='min-h-[500px] rounded-md border-4 p-6'
        >
          <AuthForm mode={'login'} />
          <Link href='/home' className='border-2 border-blsm_accent'>
            Home
          </Link>
        </TabsContent>
        <TabsContent
          value='signup'
          className='min-h-[500px] rounded-md border-4 p-6'
        >
          <AuthForm mode={'signup'} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
