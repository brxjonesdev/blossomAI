import Link from 'next/link';
import React from 'react';
type Repos = {
  name: string;
  description: string;
  petalscore: number;
  owner: string;
  githubLink: string;
  recentUpdate: {
    date: string;
    message: string;
  };
};
export default function Project({ project }: { project: Repos }) {
  const { name, description, petalscore, owner, githubLink, recentUpdate } =
    project;
  return (
    <div className='flex flex-col gap-2 rounded-md border-2 p-4 font-montserrat'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>{name}</h1>
          <p className='text-sm font-bold tracking-wide text-blsm_primary'>
            Owner: {owner}
          </p>
        </div>
        <p className='md:text-md text-sm  text-blsm_secondary font-cabin'>
          {description}
        </p>
      </div>
      <div>
        <h1 className='text-md font-bold'>Latest Update:</h1>
        <p className='text-sm text-blsm_text font-cabin'>
          {recentUpdate.date} | {recentUpdate.message}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <Link
          href={githubLink}
          className='rounded-sm  font-bold text-blsm_accent hover:text-blsm_primary'
        >
          View on GitHub
        </Link>
        <div className='flex gap-2'>
          <button className='rounded-sm border-2 px-2 py-1'>Upvote</button>
          <button className='justify-items-end rounded-sm border-2 border-blsm_accent bg-blsm_accent px-3 py-1.5 hover:bg-blsm_primary'>
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
