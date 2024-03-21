import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthForm from '@/components/auth-form';

export default function LoginPage() {
  return (
   <div className='w-[600px] self-center'>
    <Tabs defaultValue='login'>
      <TabsList className='w-full min-h-[60px]'>
        <TabsTrigger value='login' className='w-full min-h-[50px]'>Login</TabsTrigger>
        <TabsTrigger value='signup' className='w-full min-h-[50px]'>Signup</TabsTrigger>
      </TabsList>
      <TabsContent value='login' className='border-4 rounded-md min-h-[500px] p-6'>
       <AuthForm mode={"login"}/>
        <Link href="/home" className='border-2 border-blsm_accent'>Home</Link>   
      </TabsContent>
      <TabsContent value='signup' className='border-4 rounded-md min-h-[500px] p-6'>
      <AuthForm mode={"signup"}/>
      </TabsContent>
    </Tabs>
 </div>
  );
}
