import React from 'react';
export default function BLSMHome() {
  return (
    <section>
      <div  className='flex flex-col gap-4'>
      <h1 className='font-black text-2xl text-center'>
        {`Connect your project to `} <span className='text-blsm_accent underline-offset-2 hover:underline-offset-4 underline transition-all ease-in-out'>BlossomAI</span> {`and start sharing your project's updates.`}
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
