import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'

const CustomButton = ({type , title ,customStyles,handleClick }) =>
 {
    const snap= useSnapshot(state);
  const styleGenerator=(type)=>{
    if(type ==='filled')
    {
        return{
            backgroundColor: snap.color,
            color:getContrastingColor(snap.color)
        }
    }
    else if(type === 'outline')
    {
      return{
        borderWidth:'1px',
        color:snap.color,
        borderColor:snap.color
      }
    }
  }
  
    return (
    <button onClick={handleClick}
    className={`px-2 py-1.2 flex-1 rounded-md ${customStyles}`}
    style={styleGenerator(type)}
    >
        {title}
    </button>
  )
}

export default CustomButton