'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
// UserMetadata | undefined
export default function SettingsBTN(user: any) {
  const router = useRouter();
  const userName = user?.user?.user_name;
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('error in logging out', error);
  };
  return (
    <Dialog>
      <DialogTrigger className='rounded-md border-2 p-2 font-cabin hover:border-blsm_accent md:w-full'>
        Settings
      </DialogTrigger>
      <DialogContent className='max-w-[420px]'>
        <DialogHeader>
          <DialogTitle className='text-left text-2xl font-bold '>
            User Settings
          </DialogTitle>
          <DialogDescription className='flex flex-col gap-3'>
            {/* Logout, LinkedGithub */}
            <div className='flex items-center justify-between'>
              <p className=''>
                Your Linked Github Account:{' '}
                <span className='italic text-blsm_accent'>@{userName}</span>
              </p>
            </div>
            <button
              onClick={() => {
                logout()
                  .then(() => router.push('/'))
                  .catch((err) => console.error(err));
              }}
              className='rounded-sm hover:text-blsm_accent '
            >
              Logout
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
