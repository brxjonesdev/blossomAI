import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Database } from '../../../types/supabase';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Link from 'next/link';
import BLSMAI from '@/components/blsm-ai';

export default async function Content() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
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
    redirect('/');
  }

  const { data: reposfromDB, error } = await supabase
    .from('Repos')
    .select('repo_name, Updates(*)')
    .eq('owner', 'Braxton-Jones');

  let totalPullRequests = 0;
  let totalIssues = 0;
  let totalCommits = 0;
  let totalRepos = 0;
  reposfromDB?.forEach((repo) => {
    totalPullRequests += repo.Updates.filter(
      (update) => update.type === 'pull_request'
    ).length;
    totalIssues += repo.Updates.filter(
      (update) => update.type === 'issue'
    ).length;
    totalCommits += repo.Updates.filter(
      (update) => update.type === 'commit'
    ).length;
    totalRepos++;
  });

  return (
    <section className='flex grow flex-col items-center gap-6 rounded-md border-2 p-4 pt-8 font-montserrat'>
      <div className='flex flex-col items-center'>
        <h1 className='max-w-[600px] text-center font-montserrat text-xl font-black md:text-3xl'>
          You have{' '}
          <span className='text-blsm_primary'>
            {totalPullRequests} pull request{totalPullRequests > 1 ? 's' : ''}
          </span>
          ,{' '}
          <span className='text-blsm_secondary'>
            {totalIssues} issue{totalIssues > 1 ? 's' : ''}
          </span>
          , &{' '}
          <span className='text-blsm_accent'>
            {totalCommits} commmit{totalCommits > 1 ? 's' : ''}
          </span>{' '}
          across {totalRepos} repositor{totalRepos > 1 ? 'ies' : 'y'}.
        </h1>
        <p className='text-center font-cabin'>
          Select which repository you would like to view updates for.
        </p>
      </div>
      <section className='flex flex-wrap gap-4 md:grid md:grid-cols-3 '>
        {reposfromDB?.map((repo, i) => (
          <HoverCard key={i}>
            <HoverCardTrigger className='w-full'>
              <Dialog>
                <DialogTrigger className='h-full w-full'>
                  <div className='flex h-full flex-wrap items-center justify-between rounded-md border-2 p-3 py-7 hover:border-blsm_accent'>
                    <div className='w-full'>
                      <h2 className='text-lg font-bold'>{repo.repo_name}</h2>
                      <p>
                        Last updated{' : '}{' '}
                        <span className='text-sm'>
                          {repo.Updates[0].created_at.slice(0, 10)}
                        </span>
                      </p>
                      <span className='text-sm text-gray-500'>
                        {repo.Updates.length} updates
                      </span>
                    </div>
                    <div className='w-full md:hidden'>
                      <ul className='flex flex-col gap-2'>
                        {repo.Updates.map((update, i) => (
                          <li key={i} className='flex flex-col gap-1'>
                            <h3 className='text-sm font-bold'>{update.type}</h3>
                            <p className='text-xs'>{update.message}</p>
                            <p className='text-xs'>{update.body}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='w-full max-w-4xl px-8 py-10'>
                  <DialogHeader>
                    <DialogTitle className='font-montserrat font-black'>
                      {repo.repo_name}
                    </DialogTitle>
                    <DialogDescription className='font-cabin text-blsm_accent'>
                      {repo.Updates.length} updates
                    </DialogDescription>
                  </DialogHeader>
                  <div className='border-b-1 border-t-2 border-blsm_accent' />
                  <DialogDescription>
                    <BLSMAI repoName={repo.repo_name} updates={repo.Updates} />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </HoverCardTrigger>
            <HoverCardContent className=' hidden w-full md:block'>
              <p className='text-center text-sm font-black'>Updates</p>
              <ul className='flex flex-col gap-2'>
                {repo.Updates.map((update, i) => (
                  <li key={i} className='flex flex-col gap-1'>
                    <h3 className='font-montserrat text-sm font-bold'>
                      {update.type}
                    </h3>
                    <p className='font-cabin text-xs'>{update.message}</p>
                    <p className='font-cabin text-xs'>{update.body}</p>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        ))}
      </section>
    </section>
  );
}
