import React, { useEffect } from "react";
import OkCancelButton from "../../../../shared/reusableComponents/okCancelButton";
import RadioButton from "../../../../shared/reusableComponents/RadioButton";
import RangeInputBox from "../../../../shared/reusableComponents/RangeInputBox";
import Title from "../../../../shared/reusableComponents/Title";

const radioInfo = [
  { id: "1", value: "tableToList", label: "Table To List" },
  { id: "2", value: "listToTable", label: "List to Table" },
];

export default function Transpose() {
  const [copiedRange, setCopiedRange] = React.useState("");
  const [targetRange, setTargetRange] = React.useState(" ");
  const [selection, setSelection] = React.useState("tableToList");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");
  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [data, setData] = React.useState("");
  const [sourceValues, setSourceValues] = React.useState("");
  const [focus, setFocus] = React.useState("source");

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("address");
        await context.sync();
        setData(range.address);
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

  const selectionChangeHandler = (e) => {
    setSelection(e.target.value);
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
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(copiedRange);
        range.load(["address", "rowCount", "columnCount", "values"]);
        await context.sync();
        setSourceValues(range.values);
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTargetRangeData = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(targetRange);
        range.load(["address", "rowIndex", "columnIndex"]);
        await context.sync();
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tableToList = async () => {
    try {
      await Excel.run(async (context) => {
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        for (let i = 1; i < rowNo; i++) {
          for (let j = 0; j < colNo - 1; j++) {
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 0).values = sourceValues[i][0];
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 1).values = sourceValues[0][j + 1];
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 2).values = sourceValues[i][j + 1];
          }
        }
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialValue();
    dataRangeEvent();
  }, []);
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
      <Title title="Transpose Dimensions" articleLink= "https://www.exceldemy.com/excel-transpose-rows-to-columns-based-on-criteria/" />

      <RangeInputBox
        label="Source Range"
        value={copiedRange}
        color="success"
        onChange={sourceRangeHandler}
        onClick={sourceFocusChangeHandler}
        selectedRange= {copiedRange}
      />

      <RadioButton title="Transpose Type" defaultValue="tableToList" formData={radioInfo} onChange={selectionChangeHandler} />

      <RangeInputBox
        label="Destination Range"
        value={targetRange}
        color="primary"
        onChange={targetRangeHandler}
        onClick={targetFocusChangeHandler}
        selectedRange= {targetRange}
      />

      <OkCancelButton onClick={tableToList} />
    </React.Fragment>
  );
}
