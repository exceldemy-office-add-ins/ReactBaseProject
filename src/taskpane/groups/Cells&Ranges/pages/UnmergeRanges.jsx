import React, { useEffect, useState } from "react";

import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import UnmergeSelectedRanges from "../components/MergeUnmerge/UnmergeSelectedRanges";
import UnmergeAllRanges from "../components/MergeUnmerge/UnmergeAllRanges";
import { Paper, Typography } from "@mui/material";
import Title from "../../../shared/reusableComponents/Title";
export default function UnmergeRanges() {
  const [ranges, setRanges] = React.useState("");
  const [selection, setSelection] = React.useState("unmergeSelection");
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
      <Title title=" Unmerge Ranges" />
      <RangeInputBox label="Selected Range" color="success" value={ranges} onChange={inputChangeHandler} />
      <Paper elevation={2} sx={{marginBottom: '10px', marginTop: '10px'}}>
      <FormControl sx={{ padding: "10px", marginTop: "5px", marginBottom: "10px" }}>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group2"
          defaultValue="unmergeSelection"
          >
          <FormControlLabel
            value="unmergeSelection"
            control={<Radio />}
            label="Only the Selected Range"
            onChange={selectionChangeHandler}
            style={{ height: 32, fontSize: 12 }}
            />
          <FormControlLabel
            value="unmergeAll"
            control={<Radio />}
            label="Unmege All Merged Ranges"
            onChange={selectionChangeHandler}
            style={{ height: 32, fontSize: 12 }}
            />
        </RadioGroup>
      </FormControl>
      </Paper>

      {selection === "unmergeSelection" && <UnmergeSelectedRanges selection={ranges} />}
      {selection === "unmergeAll" && <UnmergeAllRanges selection={ranges} />}
    </React.Fragment>
  );
}
