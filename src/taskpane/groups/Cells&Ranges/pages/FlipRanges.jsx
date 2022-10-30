import React, { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Horizontally from "../components/FlipRanges/Horizontally";
import Vertically from "../components/FlipRanges/Vertically";

export default function FlipRanges() {
  const [selection, setSelection] = React.useState("horizontally");
  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };
  return (
    <React.Fragment>
      <h4>Flip Ranges: horizontally and vertically</h4>
      <ul>
        <li>Select a Range of Cells</li>
        <li>Decide whether to Flip the selected ranges Horizontally or Vertically</li>

      </ul>
      {selection === "horizontally" && 
        <img src="https://milleary.sirv.com/Images/flip_horizonatally.png" width="262" height="128" alt="" />
        }
        {selection === "vertically" && 
         <img src="https://milleary.sirv.com/Images/flip_vertically.png" width="289" height="128" alt="" />
        }
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
     {selection=== 'horizontally' &&  <Horizontally />}
     {selection=== 'vertically' && <Vertically />} 
    </React.Fragment>
  );
}
