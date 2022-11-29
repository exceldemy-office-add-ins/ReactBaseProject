import { Alert } from "@mui/material";
import React, { useEffect } from "react";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";
import RangeInputBox from "../../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../../shared/reusableComponents/Title";

const SwapRanges = ({ isOfficeInitialized }) => {
  const [copiedRange, setCopiedRange] = React.useState(" ");
  const [targetRange, setTargetRange] = React.useState(" ");

  const [rowNo_1, setRowNo_1] = React.useState("");
  const [colNo_1, setColNo_1] = React.useState("");
  const [rowIndex_1, setRowIndex_1] = React.useState("");
  const [columnIndex_1, setColumnIndex_1] = React.useState("");

  const [rowNo_2, setRowNo_2] = React.useState("");
  const [colNo_2, setColNo_2] = React.useState("");
  const [rowIndex_2, setRowIndex_2] = React.useState("");
  const [columnIndex_2, setColumnIndex_2] = React.useState("");

  const [data, setData] = React.useState(" ");
  const [sourceValues, setSourceValues] = React.useState("");
  const [targetValues, setTargetValues] = React.useState("");
  const [focus, setFocus] = React.useState("source");
  const [errorMsg, setErrorMsg] = React.useState(false);

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRanges();
        range.load("address");
        await context.sync();
        setCopiedRange(range.address);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sourceRangeHandler = (e) => {
    e.preventDefault();
    setCopiedRange(e.target.value);
  };

  const targetRangeHandler = (e) => {
    e.preventDefault();
    setTargetRange(e.target.value);
  };
  var eventResult;
  const dataRangeEvent = async () => {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        eventResult = worksheet.onSelectionChanged.add(dataRangeEventHandler);
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function dataRangeEventHandler(event) {
    await Excel.run(async (context) => {
      setData(event.address);
      await context.sync();
    });
  }

  const getSourceRangeData = async () => {
    try {
      await Excel.run(async (context) => {
        if (copiedRange.length >= 2) {
          const range = context.workbook.worksheets.getActiveWorksheet().getRange(copiedRange);
          range.load(["address", "rowCount", "columnCount", "values", "rowIndex", "columnIndex"]);
          await context.sync();
          setSourceValues(range.values);
          setRowNo_1(range.rowCount);
          setColNo_1(range.columnCount);
          setRowIndex_1(range.rowIndex);
          setColumnIndex_1(range.columnIndex);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTargetRangeData = async () => {
    try {
      await Excel.run(async (context) => {
        if (targetRange.length >= 2) {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(targetRange);
        range.load(["address", "rowCount", "columnCount", "values", "rowIndex", "columnIndex"]);
        await context.sync();
        setTargetValues(range.values);
        setRowNo_2(range.rowCount);
        setColNo_2(range.columnCount);
        setRowIndex_2(range.rowIndex);
        setColumnIndex_2(range.columnIndex);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const swapRanges = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        if (rowNo_1 === rowNo_2 && colNo_1 === colNo_2) {
          if (rowNo_1 > colNo_1) {
            setErrorMsg(false);
            for (let i = 0; i < rowNo_1; i++) {
              for (let j = 0; j < colNo_1; j++) {
                sheet.getCell(rowIndex_2 + i, columnIndex_2 + j).values = sourceValues[i][j];
                sheet.getCell(rowIndex_1 + i, columnIndex_1 + j).values = targetValues[i][j];
              }
            }
          } else {
            setErrorMsg(false);
            for (let i = 0; i < rowNo_1; i++) {
              for (let j = 0; j < colNo_1; j++) {
                sheet.getCell(rowIndex_2 + i, columnIndex_2 + j).values = sourceValues[i][j];
                sheet.getCell(rowIndex_1 + i, columnIndex_1 + j).values = targetValues[i][j];
              }
            }
          }
        } else {
          setErrorMsg(true);
        }

        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isOfficeInitialized) {
      initialValue();
      dataRangeEvent();
    }
  }, [isOfficeInitialized]);
  useEffect(() => {
    getSourceRangeData();
  }, [copiedRange]);

  useEffect(() => {
    getTargetRangeData();
  }, [targetRange]);

  useEffect(() => {
    if (focus === "source") {
      setCopiedRange(data);
    } else {
      setTargetRange(data);
    }
  }, [data]);

  const sourceFocusChangeHandler = () => {
    setFocus("source");
  };
  const targetFocusChangeHandler = () => {
    setFocus("target");
  };

  return (
    <React.Fragment>
      <Title title="Swap Ranges" />
      <RangeInputBox
        label="Range 1"
        value={copiedRange}
        color="success"
        onChange={sourceRangeHandler}
        onClick={sourceFocusChangeHandler}
        selectedRange={copiedRange}
      />
      <div style={{padding: '10px'}}>
        <span style={{ color: "black", fontWeight: "bold" }}>Range 1 Dimension:</span>
        <span>
          ({rowNo_1} rows X {colNo_1} cols)
        </span>
      </div>
      <RangeInputBox
        label="Range 2"
        value={targetRange}
        color="primary"
        onChange={targetRangeHandler}
        onClick={targetFocusChangeHandler}
        selectedRange={targetRange}
      />

      <div style={{padding: '10px'}}>
        <span style={{ color: "black", fontWeight: "bold" }}>Range 2 Dimension:</span>
        <span>
          ({rowNo_2} rows X {colNo_2} cols)
        </span>
      </div>

      {(rowNo_1 !== rowNo_2 || colNo_1 !== colNo_2) && (
        <Alert
          severity="error"
          style={{ marginBottom: "5px", fontWeight: "600" }}
          sx={{ "& .MuiAlert-icon": { padding: "0px" }, "& .MuiAlert-message": { padding: "0px" } }}
        >
          Dimensions are not equal.
        </Alert>
      )}
      <OkCancelButton onClick={swapRanges} selectedRange={copiedRange} targetRange={targetRange} />
    </React.Fragment>
  );
};

export default SwapRanges;
