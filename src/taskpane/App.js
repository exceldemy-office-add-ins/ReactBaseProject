/* eslint-disable no-undef */
import * as React from "react";
import Home from "./shared/home/Home";
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import FlipRanges from "./groups/Cells&Ranges/pages/FlipRanges";
import Header from "./shared/header/Header";
import Groups from "./shared/others/Groups";


const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
 
  return(
    <>
      <Header/>

      <nav style={{padding:'10px'}}>
      <Link to='/groups' >Groups</Link><br/>
      <Link to='/'>Home</Link><br/>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/flipRanges" element={<FlipRanges/>}/>
      </Routes>
 
   
      
   </>
  )
}
export default App;

