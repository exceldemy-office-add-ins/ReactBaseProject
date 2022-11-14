import React, { useEffect, useState } from "react";

import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MergeSelectedRanges from "../components/MergeUnmerge/MergeSelectedRanges";
import MergeAllExceptSelectedRanges from "../components/MergeUnmerge/MergeAllExceptSelectedRanges.";
import { Typography } from "@mui/material";
import Title from "../../../shared/reusableComponents/Title";
export default function MergeRanges() {
  const [ranges, setRanges] = React.useState("");
  const [selection, setSelection] = React.useState("mergeSelection");
  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setRanges(e.target.value);
  };

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("address");
        await context.sync();
        setRanges(range.address);
        // console.log(range)
      });
    } catch (error) {
      console.log(error);
    }
  };

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
  useEffect(() => {
    initialValue();
    copiedRangeEvent();
  }, []);
  return (
    <React.Fragment>
     <Title title="Merge Ranges" />
      <RangeInputBox label="Selected Range" color="success" value={ranges} onChange={inputChangeHandler} />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group2"
          defaultValue="mergeSelection"
        >
          <FormControlLabel
            value="mergeSelection"
            control={<Radio />}
            label="Only the Selected Range"
            onChange={selectionChangeHandler}
            style={{ height: 32, fontSize: 12 }}
          />
          <FormControlLabel
            value="mergeAllExceptSelection"
            control={<Radio />}
            label="All Except Selected Ranges"
            onChange={selectionChangeHandler}
            style={{ height: 32, fontSize: 12 }}
          />
        </RadioGroup>
      </FormControl>

      {selection === "mergeSelection" && <MergeSelectedRanges selection={ranges} />}
      {selection === "mergeAllExceptSelection" && <MergeAllExceptSelectedRanges selection={ranges} />}
      
    </React.Fragment>
  );
}
