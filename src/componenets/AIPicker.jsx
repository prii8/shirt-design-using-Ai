import React from 'react'
import CustomButton from './CustomButton'


const AIPicker = ({prompt,setPrompt,generatingImage,handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea
        placeholder='ASK AI...'
        rows={5}
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
        {
          generatingImage?(
            <CustomButton
            type="outline"
            title="Asking AI...."
            customStyles="text-xs"
            />
          ):(
            <>
            <CustomButton
            type="outline"
            title="AI LOGO"
            handleClick={()=>handleSubmit("logo")}
            customStyles="text-xs py-1"
            />
            <CustomButton
            type="filled"
            title="AI Full"
            handleClick={()=>handleSubmit("full")}
            customStyles="text-xs"
            />
            </>
          )
        }
      </div>

      
    </div>
  )
}

export default AIPicker