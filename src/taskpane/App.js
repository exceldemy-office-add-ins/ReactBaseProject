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

const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
 
  return(
    <React.Fragment>
    <Container sx={{padding:'10px'}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home rangesData={rangesData} />}/>
 
        
        <Route path="/flipRanges" element={<FlipRanges/>}/>
        <Route path="/transposeRanges" element={<Transpose/>}/>
        <Route path="/hideRanges"  element={<HideUnhideRanges/>} />
        <Route path="/unhideRanges"  element={<UnhideRanges/>} />


        <Route path="/mergeRanges" element={<MergeRanges/>} />
        <Route path="/unmergeRanges" element={<UnmergeRanges/>} />
      </Routes>
    </Container>
    </React.Fragment>
 
   
      
   
  )
}
export default App;

