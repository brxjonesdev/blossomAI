import React from 'react';

export default function Content() {

  return (
    <section className='font-montserrat border-2 grow rounded-md flex p-4 items-center flex-col gap-2 pt-8'>
      <h1 className='font-montserrat font-black text-xl md:text-3xl max-w-[600px] '>
        You have <span className='text-blsm_primary'>4 pull requests</span>, <span className='text-blsm_secondary'>7 issues</span>, & <span className='text-blsm_accent'>12 commmits</span> across 2 repositories.
      </h1>
      <p className='font-cabin'>
        Select which repository you would like to view updates for.
      </p>
      <section className='gap-4 grid grid-cols-3 mt-6'>
        <div className='flex flex-col gap-2 border-2 w-full p-2 rounded'>
          <h2 className='font-montserrat font-bold text-lg'>Repository 1</h2>
          <p className='font-cabin'>4 pull requests, 7 issues, 12 commits</p>
        </div>
        <div className='flex flex-col gap-2 border-2 w-full p-2 rounded'>
          <h2 className='font-montserrat font-bold text-lg'>Repository 2</h2>
          <p className='font-cabin'>4 pull requests, 7 issues, 12 commits</p>
        </div>
        <div className='flex flex-col gap-2 border-2 w-full p-2 rounded'>
          <h2 className='font-montserrat font-bold text-lg'>Repository 3</h2>
          <p className='font-cabin'>4 pull requests, 7 issues, 12 commits</p>
        </div>
        <div className='flex flex-col gap-2 border-2 w-full p-2 rounded'>
          <h2 className='font-montserrat font-bold text-lg'>Repository 4</h2>
          <p className='font-cabin'>4 pull requests, 7 issues, 12 commits</p>
        </div>
        <div className='flex flex-col gap-2 border-2 w-full p-2 rounded'>
          <h2 className='font-montserrat font-bold text-lg'>Repository 1</h2>
          <p className='font-cabin'>4 pull requests, 7 issues, 12 commits</p>
        </div>
        <div className='flex flex-col gap-2 border-2 w-full p-2'>
          <h2 className='font-montserrat font-bold text-lg'>Repository 2</h2>
          <p className='font-cabin'>4 pull requests, 7 issues, 12 commits</p>
        </div>
    
      </section>

    </section>
  )
}
