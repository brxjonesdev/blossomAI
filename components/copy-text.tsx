import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip';
  import { useState } from 'react';

export default function CopyText({text}: {text: string}) {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    return (
        <p
          className='cursor-pointer hover:underline'
          onClick={() => {
            navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 5000);
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='hover:underline'>
                  {text}
              </TooltipTrigger>
              <TooltipContent>
                {isCopied ? 'Copied!' : 'Copy'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      )
}
