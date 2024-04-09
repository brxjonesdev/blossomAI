'use client'
import React from 'react'
import { Button } from './ui/button'
import { useState } from 'react'

export default function CopyBtn(summary: string) {
    const [isCopied, setIsCopied] = useState<boolean>(false)

    function copyToClipboard() {
        navigator.clipboard.writeText(summary)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 5000)
    }
  return (
    <Button
        onClick={() => {
            copyToClipboard()

        }}
    >
        {isCopied ? 'Copied!' : 'Copy'}
    </Button>
  )
}
