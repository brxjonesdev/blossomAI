'use client'
import React from 'react'
import {motion} from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  }
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='w-full bg-blsm_text text-blsm_background absolute bottom-0 left-0 flex flex-col'>
     
      <motion.div
      animate={isOpen ? true: false}
      variants={variants}
      >
         <input 
      type='search' 
      placeholder='Search' 
      className='bg-blsm_background p-2 w-full'
      
      />

      </motion.div>
      <div className='flex justify-evenly py-2'>
      <Link  href="projects" className='px-4 py-2 bg-blsm_primary rounded-lg'>Projects</Link>
      <Link  href="#" onClick={() => setIsOpen(isOpen => !isOpen)} className='px-3 py-2 bg-blsm_primary rounded-lg'>Search</Link>
      <Link  href="#" className='px-3 py-2 bg-blsm_primary rounded-lg'>Explore</Link>
      <Link  href="#" className='px-3 py-2 bg-blsm_primary rounded-lg'>Updates</Link>
      </div>
      </div>
  )
}
