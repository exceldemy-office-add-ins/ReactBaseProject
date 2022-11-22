import React, { useEffect, useState } from "react";

import Horizontally from "../components/FlipRanges/Horizontally";
import Vertically from "../components/FlipRanges/Vertically";
import { Typography } from "@mui/material";
import RangeInputBox from "../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../shared/reusableComponents/Title";
import HorizontalRadioButton from "../../../shared/reusableComponents/HorizontalRadioButton";

const radioInfo = [
  { id: "1", value: "horizontally", label: "Horizontally" },
  { id: "2", value: "vertically", label: "Vertically" },
];

export default function FlipRanges() {
  const [ranges, setRanges] = React.useState("");
  const [selection, setSelection] = React.useState("horizontally");
  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
  };
  const inputRangeHandler = (e) => {
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
      <Title title="Filp Ranges" />

      <RangeInputBox label="Selected Range" color="success" value={ranges} onChange={inputRangeHandler} selectedRange={ranges} />

      <Typography variant="subtitle2" component="div">
        Decide whether to Flip the selected ranges Horizontally or Vertically
      </Typography>

      <div className="centered">
        {selection === "horizontally" && (
          <img src="https://milleary.sirv.com/Images/flip_horizonatally.png" width="262" height="128" alt="" />
        )}
        {selection === "vertically" && (
          <img src="https://milleary.sirv.com/Images/flip_vertically.png" width="289" height="128" alt="" />
        )}
      </div>

      <HorizontalRadioButton title="Selection Type" defaultValue="horizontally" formData={radioInfo} onChange={selectionChangeHandler} />

      {selection === "horizontally" && <Horizontally selectedRange={ranges} />}
      {selection === "vertically" && <Vertically selectedRange={ranges} />}
    </React.Fragment>
  );
}
