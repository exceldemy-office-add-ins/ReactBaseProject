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
  const [dummy, setDummy]= React.useState(undefined);

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
        // setDummy('siddique');
        await context.sync();
        console.log('event added')
        console.log(eventResult)
        
        const testRemove = ()=>{eventResult.remove};
        
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
      await context.sync();
      setCopiedRange(event.address);
      console.log("Address of current selection: " + event.address);
      console.log(eventResult);
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
      console.log(context.runtime.enableEvents);

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
      <p>Source Range {copiedRange}</p>
      <input
        type="text"
        value={copiedRange}
        onChange={(e) => {
          setCopiedRange(e.target.value);
        }}
        onClick={copiedRangeEvent}
        onFocus={toggleOn}
        
      />

      <p>Target Range: {targetRange}</p>

      <input
        type="text"
        value={targetRange}
        onChange={(e) => setTargetRange(e.target.value)}
        onFocus={toggleOff}
      
        onClick={copyRange}
      />

      <p>{rowNo}</p>

      <button onClick={pasteRange}>get target range</button>
      <br />
      <button onClick={()=>{tableToList()}}> Table to List</button>

    </React.Fragment>
  );
}
