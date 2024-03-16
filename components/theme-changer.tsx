'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Popover>
        <PopoverTrigger>Settings</PopoverTrigger>
        <PopoverContent className='w-fit'>
          <button
            onClick={() => setTheme('light')}
            className='block w-full px-4 py-2 text-left'
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className='block w-full px-4 py-2 text-left'
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className='block w-full px-4 py-2 text-left'
          >
            System
          </button>
        </PopoverContent>
      </Popover>
    </>
  );
}
