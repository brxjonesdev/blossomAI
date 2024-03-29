import React from 'react';

export default function Content() {
  const reposfromDB = [
    {
      name: 'Project X',
      pull_requests: [
        {
          title: 'Fix login page styling',
          description: 'Adjust the padding and alignment on the login page',
          status: 'open',
          timestamp: '2024-03-25T10:15:00Z',
        },
        {
          title: 'Add user authentication middleware',
          description: 'Implement middleware for user authentication',
          status: 'closed',
          timestamp: '2024-03-24T14:30:00Z',
        },
      ],
      issues: [
        {
          title: 'Bug: User profile not updating',
          description: 'User profile data not updating after edit',
          status: 'open',
          timestamp: '2024-03-25T09:45:00Z',
        },
        {
          title: 'Feature request: Dark mode',
          description: 'Add dark mode option for better user experience',
          status: 'closed',
          timestamp: '2024-03-23T16:20:00Z',
        },
      ],
      commits: [
        {
          title: 'Implement forgot password feature',
          description: 'Added functionality to reset user password',
          status: 'open',
          timestamp: '2024-03-25T08:00:00Z',
        },
        {
          title: 'Update API endpoints for user data',
          description: 'Updated API endpoints to retrieve and update user data',
          status: 'closed',
          timestamp: '2024-03-24T17:10:00Z',
        },
      ],
    },
    {
      name: 'Project Y',
      pull_requests: [
        {
          title: 'Refactor database queries',
          description: 'Optimize database queries for better performance',
          status: 'open',
          timestamp: '2024-03-25T11:30:00Z',
        },
        {
          title: 'Implement email notification system',
          description: 'Add functionality to send email notifications to users',
          status: 'closed',
          timestamp: '2024-03-24T13:45:00Z',
        },
      ],
      issues: [
        {
          title: 'Bug: Incorrect data displayed on dashboard',
          description: 'Data on dashboard not matching database records',
          status: 'open',
          timestamp: '2024-03-25T08:50:00Z',
        },
        {
          title: 'Feature request: Export data to CSV',
          description:
            'Allow users to export data from the application to CSV format',
          status: 'closed',
          timestamp: '2024-03-23T15:40:00Z',
        },
      ],
      commits: [
        {
          title: 'Fix error handling in authentication module',
          description: 'Improved error handling for authentication errors',
          status: 'open',
          timestamp: '2024-03-25T07:20:00Z',
        },
        {
          title: 'Update dependencies to latest versions',
          description:
            'Updated project dependencies to the latest compatible versions',
          status: 'closed',
          timestamp: '2024-03-24T16:30:00Z',
        },
      ],
    },
    {
      name: 'Project Z',
      pull_requests: [
        {
          title: 'Add search functionality',
          description:
            'Implement search functionality for better data discovery',
          status: 'open',
          timestamp: '2024-03-25T09:20:00Z',
        },
        {
          title: 'Fix pagination bug',
          description: 'Fix bug causing incorrect pagination on results page',
          status: 'closed',
          timestamp: '2024-03-24T12:40:00Z',
        },
      ],
      issues: [
        {
          title: 'Bug: Unable to upload images',
          description: 'Users encountering errors when trying to upload images',
          status: 'open',
          timestamp: '2024-03-25T07:35:00Z',
        },
        {
          title: 'Feature request: Add comments section',
          description: 'Allow users to add comments to posts',
          status: 'closed',
          timestamp: '2024-03-23T14:15:00Z',
        },
      ],
      commits: [
        {
          title: 'Optimize image loading performance',
          description:
            'Implemented lazy loading for images to improve page load times',
          status: 'open',
          timestamp: '2024-03-25T06:10:00Z',
        },
        {
          title: 'Update styling for mobile responsiveness',
          description: 'Applied CSS changes to improve mobile user experience',
          status: 'closed',
          timestamp: '2024-03-24T11:50:00Z',
        },
      ],
    },
    {
      name: 'Project Alpha',
      pull_requests: [
        {
          title: 'Refactor front-end codebase',
          description: 'Restructure front-end code for better maintainability',
          status: 'open',
          timestamp: '2024-03-25T08:45:00Z',
        },
        {
          title: 'Implement user roles and permissions',
          description:
            'Add functionality to assign different roles and permissions to users',
          status: 'closed',
          timestamp: '2024-03-24T10:20:00Z',
        },
      ],
      issues: [
        {
          title: 'Bug: Admin dashboard not loading',
          description: 'Admin dashboard failing to load due to server error',
          status: 'open',
          timestamp: '2024-03-25T06:55:00Z',
        },
        {
          title: 'Feature request: Add file upload feature',
          description: 'Allow users to upload files to the application',
          status: 'closed',
          timestamp: '2024-03-23T13:30:00Z',
        },
      ],
      commits: [
        {
          title: 'Fix memory leak in backend service',
          description: 'Identified and resolved memory leak in backend service',
          status: 'open',
          timestamp: '2024-03-25T05:30:00Z',
        },
        {
          title: 'Update third-party libraries for security patches',
          description:
            'Updated third-party libraries to address security vulnerabilities',
          status: 'closed',
          timestamp: '2024-03-24T09:40:00Z',
        },
      ],
    },
  ];

  // get total number of pull requests, issues, and commits
  let totalPullRequests = 0;
  let totalIssues = 0;
  let totalCommits = 0;
  let totalRepos = 0;
  reposfromDB.forEach((repo) => {
    totalPullRequests += repo.pull_requests.length;
    totalIssues += repo.issues.length;
    totalCommits += repo.commits.length;
    totalRepos += 1;
  });

  return (
    <section className='flex grow flex-col items-center gap-2 rounded-md border-2 p-4 pt-8 font-montserrat'>
      <h1 className='max-w-[600px] font-montserrat text-xl font-black md:text-3xl '>
        You have{' '}
        <span className='text-blsm_primary'>
          {totalPullRequests} pull requests
        </span>
        , <span className='text-blsm_secondary'>{totalIssues} issues</span>, &{' '}
        <span className='text-blsm_accent'>{totalCommits} commmits</span> across{' '}
        {totalRepos} repositories.
      </h1>
      <p className='font-cabin'>
        Select which repository you would like to view updates for.
      </p>
      <section className='flex w-full flex-col gap-4 md:mt-6 md:grid md:grid-cols-3'>
        {reposfromDB.map((repo, i) => (
          <div
            key={i}
            className='flex w-full flex-col gap-2 rounded border-2 p-2'
          >
            <h2 className='font-montserrat text-lg font-bold'>{repo.name}</h2>
            <p className='font-cabin'>
              {repo.pull_requests.length} pull requests, {repo.issues.length}{' '}
              issues, {repo.commits.length} commits
            </p>
          </div>
        ))}
      </section>
    </section>
  );
}
