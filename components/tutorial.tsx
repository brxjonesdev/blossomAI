'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import CopyBtn from './copy-btn';
import CopyText from './copy-text';
import { Input } from "@/components/ui/input"
import { useState } from 'react';



export default function BLSMTutorial({ user }) {
    const [repoName, setRepoName] = useState<string>('');

  return (
    <section className='flex flex-col gap-2'>
    <div>
        <p className='text-left mb-2'>{`What's your repo's name?`}</p>
        <Input
          placeholder='Repo Name'
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
    </div>
     
    <div>
      <p>
        {`1. Install the BlossomAI CLI by running `}
      </p>
      <span className='block font-bold text-blsm_accent'>
          <CopyText text={`npm install -g blsm-cli`} />
        </span>
    </div>
    <div>
      <p>
        {`2. Run the following to connect your repo:`}
      </p>
      {repoName === '' ? (
        <span className='block font-bold text-blsm_secondary'>
          {`Add your repo's name above to get started.`}
        </span>
      ) : (
        <span className='block font-bold text-blsm_accent'>
          <CopyText text={`blsm-cli ${user?.preferred_username} ${repoName} `} />
        </span>
      )}
    </div>
    </section>
  );
}
