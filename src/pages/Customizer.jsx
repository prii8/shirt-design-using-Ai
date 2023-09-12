import React,{useState,useEffect} from 'react'
import { AnimatePresence,motion} from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import {download} from '../assets'
import {downloadCanvasToImage,reader} from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import { fadeAnimation,slideAnimation } from '../config/motion'
import ColorPicker from '../componenets/ColorPicker'
import AIPicker from '../componenets/AIPicker'
import Tab from '../componenets/Tab'
import CustomButton from '../componenets/CustomButton'
import FilePicker from '../componenets/FilePicker'

const Customizer = () => {
  const snap=useSnapshot(state);

  const [file,setFile]=useState('');

  const [prompt,setPrompt] =useState("");

  const [generatingImage,setGeneratingImage]=useState(false)

  const [activeEditorTab,setActiveEditorTab]=useState()
  const [activeFilterTab,setActiveFilterTab]=useState({
    logoShirt:true,
    stylishShirt:false,
  })

  const generateTabContent=()=>
  {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
        break;
      case "filepicker":
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
        break;

      case "aipicker":
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImage={generatingImage}
        handleSubmit={handleSubmit}
        />
        break;
      default:
        return null;
        break;
    }
  }

  const handleSubmit= async(type)=>{
    if(!prompt) return alert("Please Enter a Prompt.");

    try {

      setGeneratingImage(true);
      const response =await fetch('http://localhost:8080/api/v1/dalle',
      {
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(
          {
            prompt,
          }
        )
      })

      const data=await response.json();

      console.log(data);

      handleDecals(type,`data:image/png;base64,${data.photo}`)

      
    } catch (error) {
      alert(error);
      
    }
    finally{
      setGeneratingImage(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals=(type,result) =>
  {
    const decaltype=DecalTypes[type];
    state[decaltype.stateProperty]=result;
    if(!activeFilterTab[decaltype.filterTabs])
    {
      handleActiveFilterTab(decaltype.filterTab)
    }
  }

  const handleActiveFilterTab=(tabname)=>{
    switch (tabname) {
      case 'logoShirt':
        state.isLogoTexture=!activeFilterTab[tabname];
        
        break;

      case 'stylishShirt':
        state.isFullTexture=!activeFilterTab[tabname];
    
      default:
        state.isFullTexture=false;
        state.isLogoTexture=true;
    }

    setActiveFilterTab((prev)=>{
      return{
        ...prev,[tabname]:!prev[tabname]
      }
    })

  }

  

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }




  return (
    <AnimatePresence>
       {!snap.intro &&(
        <>
        <motion.div 
        key="custom"
        className="absolute top-0 left-0 z-10"
        {...slideAnimation('left')}
        >
        <div className='flex items-center min-h-screen'>
          <div className='editortabs-container tabs'  {...slideAnimation('Right')}>
            {EditorTabs.map((tab)=>(
                <Tab key={tab.name}
                tab={tab}
                handleClick={()=>{setActiveEditorTab(tab.name)}}/>
            ))
            }
            {generateTabContent()}
          </div>
        </div>


        </motion.div>

        <motion.div className='absolute top-5 right-5 z-10' {...fadeAnimation}>
            <CustomButton title="Go Back" type="filled"  customStyles="w-fit px-4 py-1.5 text-sm font-bold" handleClick={()=> state.intro=true} />
        </motion.div>


        <motion.div className='filtertabs-container '  {...slideAnimation('up')}>
        {FilterTabs.map((tab)=>(
                <Tab key={tab.name}
                tab={tab}
                isfilterTab
                isActiveTab={tab.name}
                handleClick={()=>handleActiveFilterTab(tab.name)}/>
            ))
            }
        </motion.div>
        </>
      )} 


    </AnimatePresence>
    
  )
}

export default Customizer




