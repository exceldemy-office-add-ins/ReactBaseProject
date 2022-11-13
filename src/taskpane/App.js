/* eslint-disable no-undef */
import * as React from "react";
import Home from "./shared/home/Home";
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import FlipRanges from "./groups/Cells&Ranges/pages/FlipRanges";
import Header from "./shared/header/Header";

import CellAndRanges from "./groups/Cells&Ranges/pages/CellAndRanges";
import Transpose from "./groups/Cells&Ranges/components/TransposeRanges/Transpose";
import HideUnhideRanges from "./groups/Cells&Ranges/pages/HideUnhideRanges";
import Container from '@mui/material/Container';
import { rangesData } from "./shared/home/data/rangesData";

const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
 
  return(
    <React.Fragment>
    <Container sx={{padding:'10px'}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home rangesData={rangesData}/>}/>
 
        <Route path="/cell&Ranges" element={<CellAndRanges/>}/>
        <Route path="/flipRanges" element={<FlipRanges/>}/>
        <Route path="/transposeRanges" element={<Transpose/>}/>
        <Route path="/hideRanges"  element={<HideUnhideRanges/>} />
      </Routes>
    </Container>
    </React.Fragment>
 
   
      
   
  )
}
export default App;

