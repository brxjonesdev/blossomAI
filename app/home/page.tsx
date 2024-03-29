import React from 'react';
export default function BLSMHome() {
  return (
    <section>
      <div className='flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-black'>
          {`Connect your project to `}{' '}
          <span className='text-blsm_accent underline underline-offset-2 transition-all ease-in-out hover:underline-offset-4'>
            BlossomAI
          </span>{' '}
          {`and start sharing your project's updates.`}
        </h1>
        <p className='text-center font-cabin'>
          {`Here's how to setup your project with BlossomAI.`}
          {/* 
          Actual steps to connect to BlossomAI:
          1. Sign in to your BlossomAI account.
          2. Link your GitHub account.
          3. Users just need to tell us what branches to monitor.
          4. The script is made available to users to add to their GitHub repository.
        
        */}
        </p>
      </div>
    </section>
  );
}
