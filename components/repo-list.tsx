'use client';
import React from 'react';
import { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
function convertToSimpleDateTime(dateTimeString: Date) {
  const dateTime = new Date(dateTimeString);

  // Extracting date components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Adding 1 because months are zero-based
  const day = dateTime.getDate();

  // Extracting time components
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  // Constructing the simple date and time format
  const simpleDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return simpleDateTime;
}

export default function RepoList(userInfo: any) {
  const { user } = userInfo;

  const { toast } = useToast();
  const userName = user?.user_name;
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [repoUpdates, setRepoUpdates] = useState<any[]>([]);

  function handleNewRepo(newRepo: any) {
    toast({
      title: `New Repo Added: ${newRepo.repo_name}/${newRepo.owner}`,
      description: `We will now monitor ${newRepo.repo_name} for updates.`,
    });
  }

  const handleDatabaseChanges = (payload: any) => {
    console.log('Change received!', payload);
    // {
    //   "schema": "public",
    //   "table": "Repos",
    //   "commit_timestamp": "2024-04-05T07:23:50.034Z",
    //   "eventType": "INSERT",
    //   "new": {
    //     "created_at": "2024-04-05T07:23:50.032275+00:00",
    //     "id": 11,
    //     "owner": "Braxton-Jones",
    //     "repo_name": "fa"
    //   },
    //   "old": {},
    //   "errors": null
    // }
    if (payload.eventType === 'INSERT' && payload.table === 'Updates') {
      setRepoUpdates((prev) => [...prev, payload.new]);
    }
    if (payload.eventType === 'DELETE' && payload.table === 'Updates') {
      setRepoUpdates((prev) =>
        prev.filter((update) => update.id !== payload.old.id)
      );
    }
    if (payload.eventType === 'UPDATE' && payload.table === 'Updates') {
      setRepoUpdates((prev) =>
        prev.map((update) =>
          update.id === payload.new.id ? payload.new : update
        )
      );
    }
    if (payload.eventType === 'INSERT' && payload.table === 'Repos') {
      handleNewRepo(payload.new);
    }
  };
  const fetchUserUpdates = (userName: string) => {
    return supabase
      .from('Updates')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching repos:', error);
          return { data: null, error };
        }
        console.log('Repos:', data);
        return { data, error: null };
      });
  };
  useEffect(() => {
    if (user && userName) {
      fetchUserUpdates(userName).then(({ data, error }) => {
        if (!error) {
          setRepoUpdates(data);
        }
      });
    }
    supabase
      .channel('updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        handleDatabaseChanges
      )
      .subscribe();
  }, [supabase]);

  console.log('repoUpdates', repoUpdates);
  return (
    <Suspense fallback={<div>{`Loading repo info...`}</div>}>
      <div className=''>
        <div className='flex flex-col gap-2 font-montserrat text-lg'>
          <Accordion type='single' collapsible className=''>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
               {` ${' '}
                You have ${repoUpdates.length > 0
                  ? repoUpdates.length
                  : 'no'}${' '}
                recent repo changes.`}
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-2 font-cabin'>
                  <AnimatePresence>
                    {repoUpdates && repoUpdates.length > 0 ? (
                      repoUpdates.map((update, i) => {
                        switch (update.type) {
                          case 'pull_request':
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{
                                  duration: 0.5,
                                  staggerChildren: 1.5,
                                }}
                                className='flex flex-col flex-wrap items-center gap-2 rounded-md border-2 border-blsm_white px-3 py-4'
                              >
                                <div className='flex flex-col items-center'>
                                  <p>Repo: {update.parent_repo}</p>
                                  <p className='text-blsm_secondary'>
                                    {`Pull Request ${update.action} @${' '}`}
                                    {convertToSimpleDateTime(update.created_at)}
                                  </p>
                                </div>
                                <div className='flex justify-between'>
                                  <div className='flex gap-1'>
                                    <p>{update.title}</p>
                                    <p className='font-bold text-blsm_primary'>
                                      {`#${update.number}`}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className='italic'>{update.body}</p>
                                </div>
                              </motion.div>
                            );
                          case 'issue':
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{
                                  duration: 0.5,
                                  staggerChildren: 1.5,
                                }}
                                className='flex flex-col flex-wrap items-center gap-2 rounded-md border-2 border-blsm_white px-3 py-4'
                              >
                                <div className='flex flex-col items-center'>
                                  <p>Repo: {update.parent_repo}</p>
                                  <p className='text-blsm_secondary'>
                                    {`Issue {update.action} @${' '}`}
                                    {convertToSimpleDateTime(update.created_at)}
                                  </p>
                                </div>
                                <div className='flex justify-between'>
                                  <div className='flex gap-1'>
                                    <p>{update.title}</p>
                                    <p className='font-bold text-blsm_primary'>
                                      #{update.number}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className='italic'>{update.body}</p>
                                </div>
                              </motion.div>
                            );
                          case 'commit':
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{
                                  duration: 0.5,
                                  staggerChildren: 1.5,
                                }}
                                className='flex flex-col flex-wrap items-center gap-2 rounded-md border-2 border-blsm_white p-2'
                              >
                                <div className='flex flex-col items-center'>
                                  <p>Repo: {update.parent_repo}</p>
                                  <p className='text-blsm_secondary'>
                                    {`Commit made @${' '}`}
                                    {convertToSimpleDateTime(update.created_at)}
                                  </p>
                                </div>
                                <div className='flex justify-between'>
                                  <p className='italic'>
                                    {`Commit Message:${' '}`}
                                    <span className='text-blsm_accent'>
                                      {update.message}
                                    </span>
                                  </p>
                                </div>
                              </motion.div>
                            );
                          default:
                            return (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{
                                  duration: 0.5,
                                  staggerChildren: 1.5,
                                }}
                              >
                                {`Error : ${update.type} is not a valid update
                                type.`}
                              </motion.p>
                            );
                        }
                      })
                    ) : (
                      <p className='text-center font-cabin'>
                        There are no recent updates to display.
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Suspense>
  );
}
