import React from 'react';

export default function ProjectSelect() {
  return (
    <div className='hidden md:block'>
      <h1 className='text-2xl font-bold text-blsm_black'>Projects</h1>
      <div className=''>
        <button className='rounded-md bg-blsm_primary p-2 text-blsm_white'>
          Create New
        </button>
        <button className='rounded-md bg-blsm_primary p-2 text-blsm_white'>
          Project 1
        </button>
        <button className='rounded-md bg-blsm_primary p-2 text-blsm_white'>
          Project 2
        </button>
        <button className='rounded-md bg-blsm_primary p-2 text-blsm_white'>
          Project 3
        </button>
        <button className='rounded-md bg-blsm_primary p-2 text-blsm_white'>
          Project 4
        </button>
      </div>
    </div>
  );
}
