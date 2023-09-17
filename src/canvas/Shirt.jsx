import React, { useRef,useState,useEffect } from 'react'
import {easing } from 'maath'
import {useSnapshot} from 'valtio'
import {useFrame} from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Shirt = () => {
  const snap = useSnapshot(state);
  const {nodes ,materials} = useGLTF('\shirt_baked.glb');
  const mesh=useRef();
  
  const logoTexture =useTexture(snap.logoDecal);
  const fullTexture=useTexture(snap.fullDecal);
  const picTexture=useTexture(snap.picDecall);
  const smallTexture=useTexture(snap.smallDecal);
  const colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#800080"];
  let currentColorIndex = 0;
  let nextColorIndex = 0;
  let lastColorChangeTime = 0;

  const stateTextureProperties = [
    'isFullTexture',
    'isLogoTexture',
    'isPicTexture',
    'isSmallTexture',
  ];
  

  const [targetColor, setTargetColor] = useState(getRandomColor());
  const colorChangeInterval = 3000; // 10 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetColor(getRandomColor());
      console.log(snap.intro)
      if(snap.intro)
      {updateRandomTextureProperty();
      console.log("opps changed")}
      
    }, colorChangeInterval);

    return () => clearInterval(interval);
  }, [state.intro]);

  const updateRandomTextureProperty = () => {
    //const randomIndex = Math.floor(Math.random() * stateTextureProperties.length);
    currentColorIndex = nextColorIndex;
    nextColorIndex = (nextColorIndex + 1) % stateTextureProperties.length;
    const randomProperty = stateTextureProperties[nextColorIndex];
    state[randomProperty] = true;

    // Set all other properties to false
    stateTextureProperties.forEach((property) => {
      if (property !== randomProperty) {
        state[property] = false;
      }
    });
  };
  useFrame((state, delta) => {
    if (snap.intro) {
      mesh.current.rotation.y += 0.03;
      easing.dampC(materials.lambert1.color, targetColor, 0.25, 1);
      //updateRandomTextureProperty();
     
    } else {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

// useFrame((state, delta) => {
//   console.log("Frame update");
  
//   if (snap.intro) {
//     mesh.current.rotation.y +=0.02;
//     const currentTime = Date.now();
//     if (currentTime - lastColorChangeTime >= colorChangeInterval) {
//       lastColorChangeTime = currentTime;
//       currentColorIndex = nextColorIndex;
//       nextColorIndex = (nextColorIndex + 1) % colors.length;
//       const targetColor = colors[currentColorIndex];
//       easing.dampC(materials.lambert1.color, targetColor, 0.25, 1);
//       console.log("Color changed to:", targetColor);

//     }
//   } else {
//     easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
//   }
// });


  const stateString = JSON.stringify(snap);

  return (
   <group
   key={stateString}
   >
    <mesh
    ref={mesh}
    castShadow
    geometry={nodes.T_Shirt_male.geometry}
    material={materials.lambert1}
    material-roughness={1}
    dispose={null}

    >
      {/* <meshBasicMaterial color={"white"}/> */}
      
      {snap.isFullTexture && (
        <Decal 
        position={[0,0,0]}
        rotation={[0,0,0]}
        scale={1}
        map={fullTexture}
        />


      )}

      {snap.isLogoTexture && (
        <Decal 
        position={[0,0.04,0.15]}
        rotation={[0,0,0]}
        scale={0.15}
        map={logoTexture}
        mapAnisotropy={16}
        depthTest={false}
        depthWrite={true}
        />


      )}

      {snap.isPicTexture && (
        <Decal 
        position={[-0.01,-0.02,0.1]}
        rotation={[0,0,0]}
        scale={0.24}
        map={picTexture}
        mapAnisotropy={16}
        depthTest={false}
        depthWrite={true}
        />


      )}

      {snap.isSmallTexture && (
        <Decal 
        position={[0.05,0.07,0.15]}
        rotation={[0,0,0]}
        scale={0.06}
        map={smallTexture}
        mapAnisotropy={16}
        depthTest={false}
        depthWrite={true}
        />


      )}



    </mesh>
   </group>
  )
}

export default Shirt