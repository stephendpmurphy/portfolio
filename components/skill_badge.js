import React from 'react'

function SkillBadge({skill}) {
  return (
    <div className="m-1 px-2 py-1 text-xs rounded w-max text-center text-white bg-primary-gray">
        <p className="m-auto">{skill}</p>
    </div>
  )
}

export default SkillBadge