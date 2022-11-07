import React, { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Horizontally from "../components/FlipRanges/Horizontally";
import Vertically from "../components/FlipRanges/Vertically";

export default function FlipRanges() {
  const [ranges, setRanges] = React.useState("");
  const [selection, setSelection] = React.useState("horizontally");
  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };


    
    const initialValue= async()=>{
      try{
        await Excel.run(async (context) => {
          const range = context.workbook.getSelectedRange();;
          range.load('address');
          await context.sync();
          setRanges(range.address);
          console.log(range)

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
    console.log(ranges);
    setRanges(event1.address);
  };
  useEffect(()=>{
    initialValue();
  }, [])
  return (
    <React.Fragment>
      <h4>Flip Ranges: horizontally or vertically</h4>
      <div style={{ display: "inline-block" }}>
        <span>Source Range: </span>
        <input
          type="text"
          value={ranges}
          onChange={(e) => {
            setRanges(e.target.value);
          }}
          onClick={copiedRangeEvent}
        />
      </div>
 
      <p>Decide whether to Flip the selected ranges Horizontally or Vertically</p>

      {selection === "horizontally" && (
        <img src="https://milleary.sirv.com/Images/flip_horizonatally.png" width="262" height="128" alt="" />
      )}
      {selection === "vertically" && (
        <img src="https://milleary.sirv.com/Images/flip_vertically.png" width="289" height="128" alt="" />
      )}
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue="horizontally"
        >
          <FormControlLabel
            value="horizontally"
            control={<Radio />}
            label="Horizontally"
            onChange={selectionChangeHandler}
          />
          <FormControlLabel
            value="vertically"
            control={<Radio />}
            label="Vertically"
            onChange={selectionChangeHandler}
          />
        </RadioGroup>
      </FormControl>
      {selection === "horizontally" && <Horizontally sourceRanges={ranges} />}
      {selection === "vertically" && <Vertically sourceRanges={ranges} />}
    </React.Fragment>
  );
}
