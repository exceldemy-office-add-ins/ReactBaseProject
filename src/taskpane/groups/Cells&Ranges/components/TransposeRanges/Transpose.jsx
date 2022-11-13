import { TextField } from "@mui/material";
import React, { useEffect } from "react";

export default function Transpose() {
  const [copiedRange, setCopiedRange] = React.useState("");
  const [targetRange, setTargetRange] = React.useState("");
  const [rowNo, setRowNo] = React.useState("");
  const [colNo, setColNo] = React.useState("");

  const [rowIndex, setRowIndex] = React.useState("");
  const [columnIndex, setColumnIndex] = React.useState("");
  const [sheetName, setSheetName] = React.useState("");
  const [data, setData] = React.useState("");
  const [dummy, setDummy]= React.useState(true);

  const initialValue = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("address");
        await context.sync();
        setCopiedRange(range.address);
      });
    } catch (error) {
      console.log(error);
    }
  };
  var eventResult;


  const copiedRangeEvent = async () => {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        eventResult= worksheet.onSelectionChanged.add(copiedRangeEventHandler);
        await context.sync();
        console.log('event added')
      });
    } catch (error) {
      console.log(error);
    }
  };



  // const copiedRangeEventHandler = (event1) => {
  //   console.log()
  //   return setCopiedRange(event1.address);
  // };
  async function copiedRangeEventHandler(event) {
    await Excel.run(async (context) => {
      console.log(dummy);
      if(dummy){
        setCopiedRange(event.address);
        
      }else{
        setTargetRange(event.address);
      }
      await context.sync();
      console.log(`after sync ${dummy}`);
      console.log("Address of current selection: " + event.address);

    });
  }

  async function remove() {
    await Excel.run(eventResult.context, async (context) => {
   
  
      await context.sync();
      

      console.log("Event handler successfully removed.");
    });
  }
  // const remove = async () => {
  //   try {
  //     await Excel.run(async (context) => {
  //       // eventResult.remove();
  //       await context.sync();
  //       console.log(eventResult);
        
  //       // eventResult = null;
  //       console.log("Event handler successfully removed.");
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const copyRange = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.worksheets.getActiveWorksheet().getRange(copiedRange);
        range.load(["address", "rowCount", "columnCount", "values"]);
        await context.sync();
        setData(range.values);
        setCopiedRange(range.address);
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function toggleOn() {
    await Excel.run(async (context) => {
      context.runtime.load("enableEvents");
      await context.sync();
      // console.log(context.runtime.enableEvents);

      context.runtime.enableEvents = true;

      await context.sync();
    });
  }

  async function toggleOff() {
    await Excel.run(async (context) => {
      context.runtime.load("enableEvents");
      await context.sync();
      console.log(context.runtime.enableEvents);
      console.log('toggle off');
      context.runtime.enableEvents = false;
      remove();

      await context.sync();
    });
  }



  const pasteRange = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load(["address", "rowIndex", "columnIndex"]);
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        sheet.load("name");
        await context.sync();
        setTargetRange(range.address);
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
        setSheetName(sheet.name);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tableToList = async () => {
    try {
      await Excel.run(async (context) => {
        pasteRange()
        let sheet = context.workbook.worksheets.getItem(sheetName);
        let range = sheet.getCell(rowIndex, columnIndex);
        for (let i = 1; i < rowNo; i++) {
          for (let j = 0; j < colNo - 1; j++) {
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 0).values = data[i][0];
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 1).values = data[0][j + 1];
            sheet.getCell(rowIndex + (colNo - 1) * (i - 1) + j, columnIndex + 2).values = data[i][j + 1];
          }
        }
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useeffect");
    initialValue();
  }, []);

  return (
    <React.Fragment>
    <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
      <TextField
          label="Source Range"
          focused
          size="small"
          margin="none"
          color="success"
          sx={{
            alignSelf: "center",
            input: { height: "1rem" },
            div: {
              fontSize: "15px",
              color: "black",
            },
          }}
          type="text"
          value={copiedRange}
          onChange={(e) => {
            setCopiedRange(e.target.value);
          }}
          onClick={copiedRangeEvent}
          onFocus={toggleOn}
          />
          </div>


      <p>Target Range: {targetRange}</p>

      
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
      <TextField
          label="Target Range"
          focused
          size="small"
          margin="none"
          color="success"
          sx={{
            alignSelf: "center",
            input: { height: "1rem" },
            div: {
              fontSize: "15px",
              color: "black",
            },
          }}
          type="text"
          value={targetRange}
          onChange={(e) => setTargetRange(e.target.value)}
          onFocus={()=>{sessionStorage.setItem("clientID", "arafat")}}
          onClick={copyRange}
          />
          </div>
      
      <p>{rowNo}</p>

      <button onClick={pasteRange}>get target range</button>
      <br />
      <p>{dummy && 'true'}</p>
      <p>{!dummy && 'false'}</p>
      <p>{targetRange}</p>
      <button onClick={()=>{tableToList()}}> Table to List</button>
    <br />
    <button onClick={()=>{const clientID = sessionStorage.getItem("clientID");console.log(clientID)}}>get </button>

    </React.Fragment>
  );
}
