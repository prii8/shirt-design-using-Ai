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
        return <AIPicker/>
        break;
      default:
        break;
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
  }

  const handleDecals=(type,result) =>
  {
    const decaltype=DecalTypes[type];
    console.log(decaltype);
    console.log(state.logoDecal+"before");
    console.log(state[decaltype.stateProperty]);

    state[decaltype.stateProperty]=result;
    console.log(state[decaltype.stateProperty]);
    console.log(state.logoDecal+before);

    console.log(activeFilterTab[decaltype.filterTabs])

    if(!activeFilterTab[decaltype.filterTabs])
    {
      handleActiveFilterTab(decaltype.filterTab)
    }
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
                isActiveTab=""
                handleClick={()=>{}}/>
            ))
            }
        </motion.div>
        </>
      )} 


    </AnimatePresence>
    
  )
}

export default Customizer