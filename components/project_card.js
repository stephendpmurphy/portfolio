import React from 'react'
import {LightningBoltIcon} from '@heroicons/react/solid'

function ProjectCard({projectTitle, projectDesc, projectUrl}) {
  return (
    <div onClick={() => window.open(`${projectUrl}`)} className="group flex flex-col text-white px-5 py-1 m-3 w-80 h-40 bg-primary-gray rounded cursor-pointer">
        <div className="text-lg mb-2">
            <p>{projectTitle}</p>
        </div>
        <div className="text-sm h-full">
            <p className="overflow-clip overflow-hidden h-20">{projectDesc}</p>
        </div>
        <div className="text-sm mb-2 pt-1 flex flex-row group">
            <LightningBoltIcon className="h-4 w-4 mt-1 mr-2 text-white-500 group-hover:text-yellow-500"/>
            <a href={projectUrl} target="_blank">View on Github</a>
        </div>
    </div>
  )
}

export default ProjectCard