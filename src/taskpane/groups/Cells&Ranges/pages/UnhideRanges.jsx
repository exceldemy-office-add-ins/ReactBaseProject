import React, { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import HideAllExceptSelectedRanges from '../components/HideUnhideRanges/HideAllExceptSelectedRanges'
import HideDiscontinuousRanges from '../components/HideUnhideRanges/HideDiscontinuousRanges';
import HideSelectedRanges from '../components/HideUnhideRanges/HideSelectedRanges'
import UnhideAll from '../components/HideUnhideRanges/UnhideAll'
import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import { Typography } from "@mui/material";
import UnhideSelectedRanges from "../components/HideUnhideRanges/UnhideSelectedRanges";
import Title from "../../../shared/reusableComponents/Title";

export default function HideUnhideRanges() {
  const [ranges, setRanges] = React.useState('');
  const [selection, setSelection] = React.useState("unhideSelectedRanges");
  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };
  const inputChangeHandler =(e)=>{
    e.preventDefault();
    setRanges(e.target.value);
  }
  const initialValue= async()=>{
    try{
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();;
        range.load('address');
        await context.sync();
        setRanges(range.address);
    })
  
    }catch(error){
      console.log(error)
    }
  }

  const copiedRangeEvent = async () => {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        worksheet.onSelectionChanged.add(copiedRangeEventHandler);
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const copiedRangeEventHandler = (event1) => {
    // console.log(ranges);
    setRanges(event1.address);
  };

  useEffect(()=>{
    initialValue();
    copiedRangeEvent();
  }, [])


  return (
    <React.Fragment>
   <Title title="Unhide Ranges"/>
    <RangeInputBox label="Selected Range" color="success" value={ranges} onChange={inputChangeHandler}  />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue="unhideSelectedRanges"
        
        >
          
          <FormControlLabel
            value="unhideSelectedRanges"
            control={<Radio />}
            label="Unhide from Selection" 
            onChange={selectionChangeHandler}
            style={{ height: 32, fontSize:12 }}
            
          />
          <FormControlLabel
            value="unhideAll"
            control={<Radio />}
            label="Unhide All"
            onChange={selectionChangeHandler}
            style={{ height: 32, fontSize:12 }}
          />
 
        </RadioGroup>
      </FormControl>
        {selection === 'unhideSelectedRanges' && <UnhideSelectedRanges selection={ranges} />}
        {selection === 'unhideAll' && <UnhideAll selection={ranges} />}
    </React.Fragment>
  )
}
