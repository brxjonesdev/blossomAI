'use client';
import React from 'react';
import { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createBrowserClient } from '@supabase/ssr';
import { useState, useEffect } from 'react';
import { redirect } from 'next/dist/server/api-utils';

export default function UserInfo({ userInfo }: any) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = userInfo;
  const user = data?.user?.user_metadata;

  const [repoUpdates, setRepoUpdates] = useState<any[]>([]);

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
  
  const handleDatabaseChanges = (payload) => {
    console.log('Change received!', payload);
    if(payload.eventType === 'INSERT'){
      setRepoUpdates((prev) => [...prev, payload.new]);
    }
    if(payload.eventType === 'DELETE'){
      setRepoUpdates((prev) => prev.filter((update) => update.id !== payload.old.id));
    }
    if(payload.eventType === 'UPDATE'){
      setRepoUpdates((prev) => prev.map((update) => update.id === payload.new.id ? payload.new : update));
    }
  }
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
  
    if (user && user.user_name) {
      fetchUserUpdates(user.user_name).then(({ data, error }) => {
        if (!error) {
          setRepoUpdates(data);
        }
      });
    }
    supabase.channel('updates').on('postgres_changes', {
      event: "*", schema: "public"
    },handleDatabaseChanges).subscribe();
  }, [userInfo, supabase]);

 
  return (
    <div className='flex flex-col gap-2 rounded-md border-2 p-4'>
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
                    <span className='italic text-blsm_accent'>
                      @{user?.user_name}
                    </span>
                  </p>
                </div>
                <button 
                onClick={()=> {
                  const { error } = supabase.auth.signOut();
                  router.push('/');
                  if (error) {
                    console.error('Error logging out:', error.message);
                    return;
                  }
                }}
                className='rounded-sm hover:text-blsm_accent '>
                  Logout
                </button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />

      <Suspense fallback={<div>Loading repo info...</div>}>
        <div className='hidden md:block'>
          <p className='mb-2 text-xl font-bold'>
            You have {repoUpdates.length} recent repo changes.
          </p>
          <div className='flex flex-col gap-2 font-cabin text-sm'>
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
                            <p className='text-center italic'>{update.body}</p>
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
                            <p className='text-center italic'>{update.body}</p>
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
                          className='flex flex-col flex-wrap items-center gap-2 rounded-md border-2 border-blsm_white px-3 py-4'
                        >
                          <div className='flex flex-col items-center'>
                            <p>Repo: {update.parent_repo}</p>
                            <p className='text-blsm_secondary'>
                              {convertToSimpleDateTime(update.created_at)}
                            </p>
                          </div>
                          <div className='flex justify-between'>
                            <p className='text-center italic'>
                              {update.message}
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
                          Error : {update.type} is not a valid update type.
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
          <div className='mt-3 flex items-center justify-center'>
            <Link
              href='/home/blsmAI'
              className='w-full rounded-sm border-2  p-2 text-center hover:border-blsm_primary hover:bg-blsm_primary hover:text-blsm_black font-cabin'
            >
              Make Post{' '}
            </Link>
          </div>
        </div>

        <Accordion type='single' collapsible className='md:hidden'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              {' '}
              You have {repoUpdates.length > 0 ? repoUpdates.length : 'no'}{' '}
              recent repo changes.
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
                              className='flex flex-col flex-wrap items-center gap-2 rounded-md border-2 border-blsm_white px-3 py-4'
                            >
                              <div className='flex flex-col items-center'>
                                <p>Repo: {update.parent_repo}</p>
                                <p className='text-blsm_secondary'>
                                  {convertToSimpleDateTime(update.created_at)}
                                </p>
                              </div>
                              <div className='flex justify-between'>
                                <p className='italic'>{update.message}</p>
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
                              Error : {update.type} is not a valid update type.
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
              <motion.div
                className='mt-3 flex items-center justify-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link
                  href='/home/blsmAI'
                  className='w-full rounded-sm border-2 border-blsm_accent p-2 text-center hover:bg-blsm_primary'
                >
                  Make Post{' '}
                </Link>
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Suspense>
    </div>
  );
}
