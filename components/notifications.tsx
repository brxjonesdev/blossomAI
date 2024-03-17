'use client'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"


export default function Notifications() {
    const notifications: string[] = [
        "3 recent updates",
        "Dahyun is now following Matchanym",
        "Aesor is now a two-pedal project!"
    ];

    return (
        <div className='border-2 p-2 rounded-md flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                <Avatar>
                    <AvatarImage src=''/>
                    <AvatarFallback>BX</AvatarFallback>
                </Avatar>
                <p className='text-lg font-bold'>Rory Mercury</p>
                </div>
                <p className='text-xs italic'>7 updates.</p>
            </div>
            <motion.div className='border-white border-2 rounded-lg'>
                {notifications.map((notification, index) => {
                    return (
                        <AnimatePresence key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                className='flex items-center gap-2 p-2'
                            >
                                <div>
                                    {/* We could add a better icon here. */}
                                    <svg width="20" height="20">
                                        <circle cx="10" cy="10" r="10" fill="purple" />
                                    </svg>
                                </div>
                                <p className='italic'>{notification}</p>
                            </motion.div>
                        </AnimatePresence>
                    );
                })}
            </motion.div>
        </div>
    );
}
