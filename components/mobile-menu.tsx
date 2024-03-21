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
    <div className='w-full bg-blsm_secondary text-blsm_background md:hidden'>MobileMenu</div>
  )
}
