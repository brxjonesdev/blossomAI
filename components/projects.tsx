import React from 'react'

export default function Projects() {
  {/* 
  Here we need to get all projects from the database and display them in a grid.
  Those projects also need to be clickable and redirect to the project page.
  They also need to be sorted by petalscore and recent activity.

*/}
const projects = [{
  name: "Project 1",
  description: "This is a project",
  petalscore: 100,
  lastUpdated: "2021-01-01",
  owner: "John Doe",
}]
  return (
    <div className="w-full border-2">
      <h1>Projects</h1>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => {
          return (
            <div key={project.name} className="">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <p>{project.petalscore}</p>
              <p>{project.lastUpdated}</p>
              <p>{project.owner}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
