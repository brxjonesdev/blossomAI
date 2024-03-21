import React from 'react';
import Project from './project';
import { Input } from './ui/input';

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

  const sampleRepos: Repos[] = [
    {
      name: 'NeuralSculptor',
      description:
        'A tool for generating digital sculptures using neural networks.',
      petalscore: 92,
      lastUpdated: '2024-03-21',
      owner: 'ArtGenius',
      githubLink: 'https://github.com/artgenius/neural-sculptor',
      recentUpdate: {
        date: '2024-03-21',
        message: 'Enhanced sculpting algorithm for smoother outputs.',
      },
    },
    {
      name: 'GalacticExplorer',
      description:
        'An interactive simulation for exploring the depths of the cosmos.',
      petalscore: 88,
      lastUpdated: '2024-03-20',
      owner: 'StellarTech',
      githubLink: 'https://github.com/stellartech/galactic-explorer',
      recentUpdate: {
        date: '2024-03-20',
        message: 'Added virtual reality support for immersive experiences.',
      },
    },
    {
      name: 'DreamWeaver',
      description:
        'A web application for collaboratively creating and sharing dreams.',
      petalscore: 95,
      lastUpdated: '2024-03-19',
      owner: 'Oneirologist',
      githubLink: 'https://github.com/oneirologist/dream-weaver',
      recentUpdate: {
        date: '2024-03-19',
        message: 'Implemented dream visualization tool for better analysis.',
      },
    },
  ];

  return (
    <div className='grow'>
      <Input placeholder='Search Projects ...' className='mb-4 p-4 text-blsm_accent hidden md:block'></Input>
      <div className='grid grid-cols-1 gap-4'>
        {sampleRepos.map((project, i) => (
          <Project key={i} project={project} />
        ))}
      </div>
    </div>
  );
}
