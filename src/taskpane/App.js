/* eslint-disable no-undef */
import * as React from "react";
import Home from "./shared/home/Home";
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import FlipRanges from "./groups/Cells&Ranges/pages/FlipRanges";
import Header from "./shared/header/Header";
import Groups from "./shared/others/Groups";
import CellAndRanges from "./groups/Cells&Ranges/pages/CellAndRanges";
import Transpose from "./groups/Cells&Ranges/components/TransposeRanges/Transpose";
import HideUnhideRanges from "./groups/Cells&Ranges/components/TransposeRanges/HideUnhideRanges";


const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
 
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/cell&Ranges" element={<CellAndRanges/>}/>
        <Route path="/flipRanges" element={<FlipRanges/>}/>
        <Route path="/transposeRanges" element={<Transpose/>}/>
        <Route path="/hideRanges"  element={<HideUnhideRanges/>} />
      </Routes>
 
   
      
   </>
  )
}
export default App;

