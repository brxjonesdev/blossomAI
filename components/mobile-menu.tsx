'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"


export default function MobileMenu() {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    // search, project select, notifications
    <div className='flex w-full justify-evenly gap-4 rounded-sm text-blsm_background md:hidden'>
      <Dialog>
        <DialogTrigger className='rounded-sm bg-blsm_white px-4 py-2 hover:bg-blsm_secondary'>
          Projects
        </DialogTrigger>
        <DialogContent className='max-w-[420px] rounded-sm'>
          <DialogHeader>
            <DialogTitle className='text-left text-xl font-bold'>
              Your Linked Projects
            </DialogTitle>
            <p className='w-full text-left text-sm italic text-blsm_secondary'>
              Select a project to view its details, or create a new project.
            </p>
            <DialogDescription>
              <div className='w-fit rounded-sm bg-blsm_white p-2'>
                Project 1
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Input className='flex-1 rounded-sm bg-blsm_black px-4 py-2 text-blsm_accent font-bold' placeholder='Search Projects...'></Input>
      <button className='border-2'>
        Search
      </button>
    </div>
  );
}
