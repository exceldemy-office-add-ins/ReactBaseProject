/* eslint-disable no-undef */
import * as React from "react";
import Header from "./Header";
import ColorYellow from "./ColorYellow";


const App = (props) => {
  const isOfficeInitialized = props.isOfficeInitialized;
 
  return(
    <React.Fragment>
      <Header/>
      <ColorYellow/>
   </React.Fragment>
  )
}
export default App;

