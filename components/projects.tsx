import React from 'react';
import Project from './project';
import { Input } from './ui/input';
import { Button } from "@/components/ui/button"


export default function Projects() {
  {
    /* 
  Here we need to get all projects from the database and display them in a grid.
  Those projects also need to be clickable and redirect to the project page.
  They also need to be sorted by petalscore and recent activity.

*/
  }
  type Repos = {
    name: string;
    description: string;
    petalscore: number;
    lastUpdated: string;
    owner: string;
    githubLink: string;
    recentUpdate: {
      date: string;
      message: string;
    };
  };

  const blsmProjects: Repos[] = [
  
  ];

  return (
    <div className='grow'>
      <div className='flex items-center justify-center gap-4 mb-4'>
      <Input placeholder='Search Projects ...' className='p-4 text-blsm_accent'></Input> 
      <Button className='bg-blsm_accent text-white font-cabin'>Search</Button>
      </div>
      
      <div className='grid grid-cols-1 gap-4'>
        {blsmProjects && blsmProjects.length > 0 ? (
          blsmProjects.map((project, i) => (
            <Project key={i} project={project} />
          ))
        ) : (
          <p className='text-center font-cabin'>
            There are no projects to display. 
          </p>
        )}
      </div>
    </div>
  );
}
