'use client';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './theme-changer';
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

export default function Notifications() {
  const repoUpdates: string[] = [
    'Repo 1: Updated README.md',
    'Repo 2: Updated index.js',
    'Repo 3: Updated styles.css',
  ];

  return (
    <div className='flex flex-col gap-2 rounded-md border-2 p-4 '>
      <div className='flex flex-wrap items-center justify-between gap-2  '>
        <div className='flex items-center gap-2  '>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>BX</AvatarFallback>
          </Avatar>
          <p className='text-lg font-bold'>Rory Mercury</p>
          
        </div>
        <Dialog>
            <DialogTrigger>Settings</DialogTrigger>
            <DialogContent className='max-w-[420px]'>
              <DialogHeader>
                <DialogTitle className='text-left text-2xl font-bold '>User Settings</DialogTitle>
                <DialogDescription className='flex gap-3 flex-col'>
                  {/* Logout, LinkedGithub */}
                    <div className='flex items-center justify-between'>
                    <p className=''>
                      Your Linked Github Account: <span className='text-blsm_accent italic'>@rorymercury</span>
                    </p>
                    <button className='bg-blsm_accent rounded-sm p-0.5 hover:px-1 transition-all ease-in-out hover:rounded-md'>Unlink?</button>
                    </div>
                    <button className='bg-blsm_accent rounded-sm p-2 hover:bg-blsm_primary border-4 border-blsm_accent'>Logout</button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      </div>
      <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
      <div className='hidden md:block'>
        <p className='mb-2 text-xl font-bold'>
          You have 4 recent repo changes.
        </p>
        <div className='flex flex-col gap-2'>
          <AnimatePresence>
            {repoUpdates.map((update, i) => (
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
                {update}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
        <div className='mt-3 flex items-center justify-center'>
          <Link
            href='/home'
            className='w-full rounded-sm border-2 border-blsm_accent p-2 text-center hover:bg-blsm_primary'
          >
            Make Post{' '}
          </Link>
        </div>
      </div>

      <Accordion type='single' collapsible className='md:hidden'>
        <AccordionItem value='item-1'>
          <AccordionTrigger> You have 4 recent repo changes.</AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-2'>
              <AnimatePresence>
                {repoUpdates.map((update, i) => (
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
                    {update}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>
            <motion.div
              className='mt-3 flex items-center justify-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                href='/home'
                className='w-full rounded-sm border-2 border-blsm_accent p-2 text-center hover:bg-blsm_primary'
              >
                Make Post{' '}
              </Link>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
