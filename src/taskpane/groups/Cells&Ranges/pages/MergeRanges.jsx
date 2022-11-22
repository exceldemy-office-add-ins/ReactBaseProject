import React, { useEffect, useState } from "react";

import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MergeSelectedRanges from "../components/MergeUnmerge/MergeSelectedRanges";
import MergeAllExceptSelectedRanges from "../components/MergeUnmerge/MergeAllExceptSelectedRanges.";
import { Alert, Typography } from "@mui/material";
import Title from "../../../shared/reusableComponents/Title";
import RadioButton from "../../../shared/reusableComponents/RadioButton";

const radioInfo = [
  { id: "1", value: "mergeSelection", label: "Only the Selected Range" },
  { id: "2", value: "mergeAllExceptSelection", label: "All Except Selected Ranges" },
];

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
        const range = context.workbook.getSelectedRanges();
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
      {ranges === "" && (
        <Alert
          severity="error"
          style={{ marginBottom: "5px", fontWeight: "600" }}
          sx={{ "& .MuiAlert-icon": { padding: "0px" }, "& .MuiAlert-message": { padding: "0px" } }}
        >
          Please! Select a Range.
        </Alert>
      )}
      {/* 
      <RadioButton defaultValue="mergeSelection" formData={radioInfo} onChange={selectionChangeHandler} /> */}

      {selection === "mergeSelection" && <MergeSelectedRanges selection={ranges} />}
      {/* {selection === "mergeAllExceptSelection" && <MergeAllExceptSelectedRanges selection={ranges} />} */}
    </React.Fragment>
  );
}
