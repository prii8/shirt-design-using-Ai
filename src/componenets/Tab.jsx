import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'



const Tab = ({isActive,isFilterTab,tab,handleClick}) => {
  const snap=useSnapshot(state)

  const activeStyle=isFilterTab && isActive ?
  {background :snap.color,opacity:0.5}:
  {background:"transparent",opacity:1}

  return (
    <div
    key={tab.name}
    className={`tab-btn ${isFilterTab ?
      'rounded-full glassmorhism' : 'rounded-4'
    }`}
    onClick={handleClick}
    style={activeStyle}
    
    >

    <img src={tab.icon}
    alt={tab.name}
    className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
    />
    </div>
  )
}

export default Tab