/* eslint-disable no-undef */
import * as React from "react";
import { Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container';
import Header from "./shared/header/Header";


const FlipRanges = React.lazy(()=>import('./groups/Cells&Ranges/pages/FlipRanges') )
import Home from "./shared/home/Home"


const Transpose = React.lazy(()=>import("./groups/Cells&Ranges/pages/TransposeRanges"))
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
    <Container sx={{padding:'10px', background:'white',minHeight: '100vh', height:'100%' }} >
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
 
        
        <Route path="/flipRanges" element={<React.Suspense fallback={null}><FlipRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>}  />
        <Route path="/transposeRanges" element={<React.Suspense fallback={null}><Transpose isOfficeInitialized={isOfficeInitialized}/></React.Suspense> }/>
        <Route path="/swapRanges" element={<React.Suspense fallback={null}><Swap isOfficeInitialized={isOfficeInitialized}/></React.Suspense> }/>
        <Route path="/hideRanges"  element={<React.Suspense fallback={null}><HideUnhideRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/unhideRanges"  element={<React.Suspense fallback={null}><UnhideRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />


        <Route path="/mergeRanges" element={<React.Suspense fallback={null}><MergeRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/unmergeRanges"element={<React.Suspense fallback={null}><UnmergeRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />

        <Route path="/splitRanges"element={<React.Suspense fallback={null}><SplitRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/splitNames" element={<React.Suspense fallback={null}><SplitNames isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
        <Route path="/combineRanges"element={<React.Suspense fallback={null}><CombineRanges isOfficeInitialized={isOfficeInitialized}/></React.Suspense>} />
       </Routes>
    </Container>
    </React.Fragment>
 
   
      
   
  )
}
export default App;

