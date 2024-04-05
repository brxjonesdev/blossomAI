import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { redirect } from 'next/navigation';
import RepoList from './repo-list';
import SettingsBTN from './settings-btn';

export default async function UserInfo() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );


  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) {
    // redirect('/');
    console.log('error in auth', authError);
  }

  const user = data?.user?.user_metadata;

  return (
    <div className='flex flex-col gap-2 rounded-md border-2 p-4 min-w-[400px]'>
      <div className='flex flex-wrap items-center justify-between gap-2  '>
        <div className='flex items-center gap-5'>
          <Avatar>
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>
              <p>{user?.full_name?.charAt(0).toUpperCase()}</p>
            </AvatarFallback>
          </Avatar>
          <p className='text-lg font-bold'>
            {user?.preferred_username
              ? user?.preferred_username
              : user?.full_name}
          </p>
        </div>
        <SettingsBTN user={user} />
      </div>
      <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
      <RepoList user={user} />
      <section className='flex flex-col gap-2'>
        <p className='text-center'>
          Made with ❤️ by{' '} brxjonesdev
        </p>
      </section>
    </div>
  );
}
