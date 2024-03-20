'use client'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from './theme-changer';


export default function Notifications() {
    const notifications: string[] = [
        "3 recent updates",
        "Dahyun is now following Matchanym",
        "Aesor is now a two-pedal project!"
    ];

    return (
        <div className="">     
       <div className='flex items-center justify-between flex-wrap gap-2'>
                <div className='flex items-center gap-2'>
                <Avatar>
                    <AvatarImage src=''/>
                    <AvatarFallback>BX</AvatarFallback>
                </Avatar>
                <p className='text-lg font-bold'>Rory Mercury</p>
                </div>
                <ThemeToggle/>
            </div>
         </div>
    );
}
