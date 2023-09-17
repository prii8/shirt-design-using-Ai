import { swatch, fileIcon, ai, logoShirt, stylishShirt,smallLogo,picShirt, download } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "pictureShirt",
    icon: picShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
  {
    name: "smallLogoshirt",
    icon: smallLogo,
  },
 
];

export const DownloadTabs=[
  {
    name: "imgDownId",
    icon: download,
  },
]
 

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
  pic:{
    stateProperty:"picDecal",
    filterTab:"pictureShirt",
  },
  small:{
    stateProperty:"smallLogoDecal",
    filterTab:"smallLogoshirt",
  }
};




