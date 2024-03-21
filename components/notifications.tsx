'use client';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './theme-changer';
import Link from 'next/link';

export default function Notifications() {
  const repoUpdates: string[] = [
    "Repo 1: Updated README.md",
    "Repo 2: Updated index.js",
    "Repo 3: Updated styles.css",
  ]

  return (
    <div className='border-2 rounded-md p-4 flex flex-col gap-2'>
      <div className='flex flex-wrap items-center justify-between gap-2  '>
        <div className='flex items-center gap-2  '>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>BX</AvatarFallback>
          </Avatar>
          <p className='text-lg font-bold'>Rory Mercury</p>
        </div>
        <ThemeToggle />
      </div>
      <div
        className='border-t-2 border-b-2 border-blsm_accent my-2'
      />
      <div>
        <p className='text-xl font-bold mb-2'>You have 4 recent repo changes.</p>
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
                staggerChildren: 1.5,}}
              
            >
            {update}
            </motion.p>
          ))}
        </AnimatePresence>
        </div>
        <div className='flex justify-center items-center mt-3'>
            <Link href='/home' className='border-2 border-blsm_accent w-full text-center p-2 rounded-sm hover:bg-blsm_primary'>Make Post </Link>
        </div>
      </div>
    </div>
  );
}
