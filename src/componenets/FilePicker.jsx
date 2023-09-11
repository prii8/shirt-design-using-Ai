import React from 'react'
import CustomButton from './CustomButton'

const FilePicker = ({file,setFile,readFile}) => {
  return (
    <div className='filepicker-container'>
     <div className='flex-1 flex flex-col'>
      <input
      id='file-upload'
      type='file'
      accept='image/*'
      onChange={(e)=> setFile(e.target.files[0])}
      />
      <label htmlFor='file-upload' className='filepicker-label' >
        Upload-file
      </label>

      <p className='mt-2 text-gray-500 text-xs truncate'>
        {file===''?"No file selected": file.name}
      </p>

      {/* <div>Image Preview:</div>
          <img src={file}  height="100px" /> */}


      <div className='mt-28 flex flex-wrap gap-3'>
        <CustomButton 
        title="Logo"
        type="outline"
        handleClick={()=> readFile('logo')}
        customStyles="text-xs px-1"
        />

        <CustomButton 
        title="Full"
        type="filled"
        handleClick={()=> readFile('full')}
        customStyles="text-xs py-1 px-1"
        />
      </div>
      </div></div>
  )
}

export default FilePicker