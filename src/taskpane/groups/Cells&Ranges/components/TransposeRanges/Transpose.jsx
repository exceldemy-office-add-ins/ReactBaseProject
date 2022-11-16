import { SystemUpdateAlt } from "@mui/icons-material";
import { Button, TextField, Tooltip, Typography } from "@mui/material";
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
  const [targetRange, setTargetRange] = React.useState("");
  const [selection, setSelection] = React.useState("tableToList");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");

  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [sheetName, setSheetName] = React.useState("");
  const [data, setData] = React.useState("");
  const [sourceValues, setSourceValues] = React.useState('');

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
        console.log("event added");
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function dataRangeEventHandler(event) {
    await Excel.run(async (context) => {
      setData(event.address);
      await context.sync();
      console.log(`after sync ${dummy}`);
      console.log("Address of current selection: " + event.address);
    });
  }

  // async function remove() {
  //   await Excel.run(eventResult.context, async (context) => {
  //     await context.sync();
  //     console.log("Event handler successfully removed.");
  //   });
  // }

  const copyRange = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(copiedRange);
        range.load(["address", "rowCount", "columnCount", "values"]);
        await context.sync();
        console.log('stage 1')
        console.log(range.rowCount)
        setSourceValues(range.values);
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
        console.log('getPassed copy range')
        console.log(rowNo);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // async function toggleOn() {
  //   await Excel.run(async (context) => {
  //     context.runtime.load("enableEvents");
  //     await context.sync();
  //     context.runtime.enableEvents = true;
  //     await context.sync();
  //   });
  // }

  // async function toggleOff() {
  //   await Excel.run(async (context) => {
  //     context.runtime.load("enableEvents");
  //     await context.sync();
  //     console.log(context.runtime.enableEvents);
  //     console.log('toggle off');
  //     context.runtime.enableEvents = false;
  //     remove();

  //     await context.sync();
  //   });
  // }

  const pasteRange = async () => {
    try {
      await Excel.run(async (context) => {

        const range = context.workbook.worksheets.getActiveWorksheet().getRange(targetRange);
        range.load(["address", "rowIndex", "columnIndex"]);
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        sheet.load("name");
        await context.sync();
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
        setSheetName(sheet.name);
        console.log('getPassed paste range')
        console.log(rowIndex);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tableToList = async () => {
    try {
      await Excel.run(async (context) => {
     
        let sheet = context.workbook.worksheets.getItem(sheetName);
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
  useEffect(()=>{
    copyRange();
  },[copiedRange])

  useEffect(()=>{
    pasteRange();
  },[targetRange])

  const setDataCopiedRange = () => {
    setCopiedRange(data);


  };
  const setDataTargetRange = () => {
    setTargetRange(data);
 

  };



  return (
    <React.Fragment>
      <Title title="Transpose Ranges"/>
      <p>Your Selection: {data}</p>

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <RangeInputBox label="Source Range" value={copiedRange} color="success" onChange={sourceRangeHandler} />
        <Button size="small" onClick={setDataCopiedRange}>
          <Tooltip title="Click to set the Selected Range as the Source Range" placement="bottom-start">
            <SystemUpdateAlt color="success" />
          </Tooltip>
        </Button>
      </div>
      <RadioButton defaultValue="tableToList" formData={radioInfo} onChange={selectionChangeHandler} />

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <RangeInputBox label="Target Range" value={targetRange} color="error" onChange={targetRangeHandler} />
        <Button onClick={setDataTargetRange}>
          <Tooltip title="Click to set the Selected Range as the Target Range" placement="bottom-start">
            <SystemUpdateAlt color="error"/>
          </Tooltip>
        </Button>
      </div>

      <OkCancelButton onClick={tableToList}/>


    </React.Fragment>
  );
}
