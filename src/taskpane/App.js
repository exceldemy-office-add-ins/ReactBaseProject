/* eslint-disable no-undef */
import * as React from "react";
import { Route, Routes } from 'react-router-dom'
import { rangesData} from "./shared/data/rangesData";
import Container from '@mui/material/Container';
import Header from "./shared/header/Header";


const FlipRanges = React.lazy(()=>import('./groups/Cells&Ranges/pages/FlipRanges') )
import Home from "./shared/home/Home"

const Transpose = React.lazy(()=>import("./groups/Cells&Ranges/components/TransposeRanges/Transpose"))
const Swap = React.lazy(()=>import('./groups/Cells&Ranges/components/SwapRanges/SwapRanges'))
const HideUnhideRanges = React.lazy(()=>import("./groups/Cells&Ranges/pages/HideUnhideRanges"))
const MergeRanges = React.lazy(()=>import("./groups/Cells&Ranges/pages/MergeRanges"))
const UnmergeRanges = React.lazy(()=>import("./groups/Cells&Ranges/pages/UnmergeRanges"))
const UnhideRanges = React.lazy(()=>import("./groups/Cells&Ranges/pages/UnhideRanges"))
const SplitRanges = React.lazy(()=>import("./groups/Cells&Ranges/components/SplitRanges/SplitRanges"))
const CombineRanges = React.lazy(()=>import("./groups/Cells&Ranges/components/CombineRanges/CombineRanges"))
const SplitNames = React.lazy(()=>import("./groups/Cells&Ranges/components/SplitRanges/SplitNames"))


const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
 
  return(
    <React.Fragment>
    <Container sx={{padding:'10px'}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
 
        
        <Route path="/flipRanges" element={<React.Suspense fallback='loading'><FlipRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>}  />
        <Route path="/transposeRanges" element={<React.Suspense fallback="loading..."><Transpose isOfficeInitialized={isOfficeInitialized}/></React.Suspense> }/>
        <Route path="/swapRanges" element={<React.Suspense fallback="loading..."><Swap isOfficeInitialized={isOfficeInitialized}/></React.Suspense> }/>
        <Route path="/hideRanges"  element={<React.Suspense fallback="loading..."><HideUnhideRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/unhideRanges"  element={<React.Suspense fallback="loading..."><UnhideRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />


        <Route path="/mergeRanges" element={<React.Suspense fallback="loading..."><MergeRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/unmergeRanges"element={<React.Suspense fallback="loading..."><UnmergeRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />

        <Route path="/splitRanges"element={<React.Suspense fallback="loading..."><SplitRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/splitNames" element={<React.Suspense fallback="loading..."><SplitNames isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/combineRanges"element={<React.Suspense fallback="loading..."><CombineRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
       </Routes>
    </Container>
    </React.Fragment>
 
   
      
   
  )
}
export default App;

