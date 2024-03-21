'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    // search, project select, notifications
    <div className='w-full gap-4 rounded-sm text-blsm_background md:hidden flex justify-evenly'>
      <div className="hover:bg-blsm_secondary py-2 px-4 rounded-sm bg-blsm_white">Projects</div>
      <div className="hover:bg-blsm_secondary py-2 px-4 rounded-sm bg-blsm_white flex-1">Search</div>
    </div>
  );
} 
