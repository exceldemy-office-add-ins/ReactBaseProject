/* eslint-disable no-undef */
import * as React from "react";
import Home from "./shared/home/Home";
import { Route, Routes } from 'react-router-dom'
import FlipRanges from "./groups/Cells&Ranges/pages/FlipRanges";
import Header from "./shared/header/Header";
import Transpose from "./groups/Cells&Ranges/components/TransposeRanges/Transpose";
import HideUnhideRanges from "./groups/Cells&Ranges/pages/HideUnhideRanges";
import Container from '@mui/material/Container';
import { rangesData} from "./shared/data/rangesData";

import MergeRanges from "./groups/Cells&Ranges/pages/MergeRanges";
import UnmergeRanges from "./groups/Cells&Ranges/pages/UnmergeRanges";
import UnhideRanges from "./groups/Cells&Ranges/pages/UnhideRanges"
import SplitRanges from "./groups/Cells&Ranges/components/SplitRanges/SplitRanges";
import CombineRanges from "./groups/Cells&Ranges/components/CombineRanges/CombineRanges";
import SplitNames from "./groups/Cells&Ranges/components/SplitRanges/SplitNames";

const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
  console.log(isOfficeInitialized)
 
  return(
    <React.Fragment>
    <Container sx={{padding:'10px'}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home rangesData={rangesData} />}/>
 
        
        <Route path="/flipRanges" element={<FlipRanges isOfficeInitialized={isOfficeInitialized}/>}  />
        <Route path="/transposeRanges" element={<Transpose/>}/>
        <Route path="/hideRanges"  element={<HideUnhideRanges/>} />
        <Route path="/unhideRanges"  element={<UnhideRanges/>} />


        <Route path="/mergeRanges" element={<MergeRanges/>} />
        <Route path="/unmergeRanges" element={<UnmergeRanges/>} />

        <Route path="/splitRanges" element={<SplitRanges/>} />
        <Route path="/splitNames" element={<SplitNames/>}/>
        <Route path="/combineRanges" element={<CombineRanges/>} />
       </Routes>
    </Container>
    </React.Fragment>
 
   
      
   
  )
}
export default App;

