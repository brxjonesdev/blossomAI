'use client';
import React from 'react';
import { Button } from './ui/button';
import { useState } from 'react';

export default function CopyBtn({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }
  return (
    <Button
      onClick={() => {
        copyToClipboard();
      }}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </Button>
  );
}
