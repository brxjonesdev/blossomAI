'use client';
import React from 'react';
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
import BLSMAI from '@/components/blsm-ai';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';

type RepoUpdate = {
  action: string | null;
  body: string | null;
  created_at: string;
  id: number;
  message: string | null;
  number: string | null;
  parent_repo: number | null;
  sender: string | null;
  title: string | null;
  type: string | null;
};

type ReposFromDB =
  | {
      id: number;
      repo_name: string;
      Updates: RepoUpdate[];
    }[]
  | null;

export default function RepoSelect(repo: { reposfromDB: ReposFromDB }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [reposfromDB, setReposfromDB] = useState<ReposFromDB>(repo.reposfromDB);
  console.log('reposfromDB', reposfromDB);
  const handleSelectUpdates = (payload: any) => {
    console.log('Change received on AI!', payload);

    if (payload.eventType === 'INSERT') {
      setReposfromDB((prev) => {
        if (prev) {
          const updatedRepos = prev.map((repo) => {
            if (repo.id === payload.new.parent_repo) {
              return {
                ...repo,
                Updates: [payload.new, ...repo.Updates],
              };
            }
            return repo;
          });
          return updatedRepos;
        }
        return prev;
      });
    }
  };
  useEffect(() => {
    supabase
      .channel('reposelect')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        handleSelectUpdates
      )
      .subscribe();
  }, [supabase]);

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
      (update) => update.type === 'push'
    ).length;
    totalRepos++;
  });
  return (
    <>
      <div className='flex flex-col items-center'>
        {reposfromDB?.length !== 0 ? (
          <>
            <h1 className='max-w-[600px] text-center font-montserrat text-xl font-black md:text-3xl'>
              You have{' '}
              <span className='text-blsm_primary'>
                {totalPullRequests} pull request
                {totalPullRequests > 1 ? 's' : ''}
              </span>
              ,{' '}
              <span className='text-blsm_secondary'>
                {totalIssues} issue{totalIssues > 1 ? 's' : ''}
              </span>
              , &{' '}
              <span className='text-blsm_accent'>
                {totalCommits} commit{totalCommits > 1 ? 's' : ''}
              </span>{' '}
              across {totalRepos} repositor{totalRepos === 1 ? 'y' : 'ies'}.
            </h1>
            <p className='text-center font-cabin'>
              Select which repository you would like to view updates for.
            </p>
          </>
        ) : (
          <>
            <h1 className='text-center font-montserrat text-xl font-black md:text-3xl '>
              You have no repositories linked.
            </h1>
            <p className='text-center font-cabin text-blsm_accent'>
              Link your GitHub repositories to get started.
            </p>
          </>
        )}
      </div>
      <section className='flex h-full w-full flex-wrap gap-4 md:grid md:grid-cols-3'>
        {reposfromDB?.map((repo, i) => (
          <HoverCard key={i}>
            <HoverCardTrigger className='h-fit w-full'>
              <Dialog>
                <DialogTrigger className='h-full w-full'>
                  <div className='flex h-full flex-wrap items-center justify-between rounded-md border-2 p-3 py-7 hover:border-blsm_accent'>
                    <div className='w-full'>
                      <h2 className='text-lg font-bold'>{repo.repo_name}</h2>
                      <p>
                        Last updated{' : '}{' '}
                        <span className='text-sm'>
                          {repo.Updates[0]?.created_at.slice(0, 10)}
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
                    <DialogTitle className='flex items-center justify-between font-montserrat font-black'>
                      <div className='flex flex-col gap-1'>
                        <p>{repo.repo_name}</p>
                        <p className='font-cabin font-normal'>
                          Last updated{' : '}{' '}
                          <span className='font-cabin text-sm'>
                            {repo.Updates[0]?.created_at.slice(0, 10)}
                          </span>
                        </p>
                      </div>
                      <div className='mt-3 flex justify-end gap-3'>
                        <Button className='w-full bg-blsm_secondary px-10 hover:bg-blsm_secondary hover:brightness-75 md:w-fit'>
                          Update
                        </Button>
                        <Button className='w-full border-2 border-red-400 bg-transparent px-4 text-white hover:bg-red-300 md:w-fit'>
                          Delete
                        </Button>
                      </div>
                    </DialogTitle>
                    <DialogDescription className='font-cabin text-blsm_accent'>
                      {repo.Updates.length} updates
                    </DialogDescription>
                  </DialogHeader>
                  <div className='border-b-1 border-t-2 border-blsm_accent' />
                  <DialogDescription>
                    {repo.Updates.length > 0 ? (
                      <BLSMAI
                        repoName={repo.repo_name}
                        updates={repo.Updates}
                      />
                    ) : (
                      <p className='text-center font-cabin text-blsm_accent'>
                        No updates available for this repository.
                      </p>
                    )}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </HoverCardTrigger>
            <HoverCardContent className=' hidden w-full md:block'>
              <p className='w-full text-center text-sm font-black'>Updates</p>
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
    </>
  );
}
