import React from 'react';

export default function ProjectSelect() {
  const sampleProjects = [
    { name: 'Sample Project 1', updates: 3 },
    { name: 'Sample Project 2', updates: 1 },
    { name: 'Sample Project 3', updates: 0 },
  ]
const projectSpace = (projectName: string, updatesCount: number ) => {
  return(
    <button className='rounded-sm border-blsm_text border-2 p-3 text-left flex justify-between items-center'>
      {projectName ? (<><p className='font-bold text-md'>{projectName}</p> 
        <span className='text-blsm_accent text-sm underline'>{updatesCount} changes.</span> </>) : (
          <p className='text-blsm_accent text-sm'>No Projects Linked</p>
        )}
      </button>
  )
}
  return (
    <div className='hidden md:flex flex-col border-2 rounded-sm p-4 gap-2'>
      <h2 className='font-bold text-xl'>Linked Projects</h2>
      <div className='my-2 border-b-2 border-t-2 border-blsm_accent' />
      <div className='flex flex-col gap-2'>
        {sampleProjects.map((project) => {
          return projectSpace(project.name, project.updates);
        })}
        </div>

      
      
    </div>
  );
}

{/*
  We need to adjust it so that it shows all 3 spaces, if there are only 2 projects, it should show 2 spaces and the last one should say "No Projects Linked"
 */}
