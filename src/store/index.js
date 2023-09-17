import { color } from 'framer-motion';
import {proxy} from 'valtio';

const state =proxy({
intro:true,
color:'#EFBD48',
isLogoTexture:true,
isFullTexture:false,
isPicTexture:false,
isSmallTexture:false,
logoDecal:'./threejs.png',
fullDecal:'./texture2.jpg',
picDecall:'./ai.jpg',
smallDecal:'./react.png',


});

export default state;