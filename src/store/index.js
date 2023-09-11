import { color } from 'framer-motion';
import {proxy} from 'valtio';

const state =proxy({
intro:true,
color:'#EFBD48',
isLogoTexture:true,
isFullTexture:false,
logoDecal:'./gautmi.png',
fullDecal:'./react.png'

});

export default state;