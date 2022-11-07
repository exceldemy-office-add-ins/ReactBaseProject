import React from 'react'
import CopiedRange from './CopiedRange';
import TargetRange from './TargetRange';


export default function Transpose() {
  const [copiedRange, setCopiedRange] = React.useState("");
  const [targetRange, setTargetRange]= React.useState('');
  const [rowNo, setRowNo]= React.useState('');
  const [colNo, setColNo]= React.useState('');

  const [rowIndex, setRowIndex]= React.useState('');
  const [columnIndex, setColumnIndex]= React.useState('');
  const [sheetName, setSheetName]= React.useState('');
  const [data, setData]=React.useState('');

  let eventResult;
  const copiedRangeEvent = async () => {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        eventResult = worksheet.onSelectionChanged.add(copiedRangeEventHandler);
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const copiedRangeEventHandler = (event1) => {
      return setCopiedRange(event1.address);
  };



  const copyRange = async () => {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load(['address', 'rowCount', 'columnCount', 'values'])
        await context.sync();
        setData(range.values);
        setCopiedRange(range.address)
        setRowNo(range.rowCount);
        setColNo(range.columnCount);
        
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function toggleOn(){

    await Excel.run(async (context) => {
        context.runtime.load("enableEvents");
        await context.sync();
        console.log(context.runtime.enableEvents)
   
        context.runtime.enableEvents = true;
     

        await context.sync();
    });
}

  async function toggleOff(){

        await Excel.run(async (context) => {
            context.runtime.load("enableEvents");
            await context.sync();
            console.log(context.runtime.enableEvents)
       
            context.runtime.enableEvents = false;
         
  
            await context.sync();
        });
    }

  const pasteRange= async()=>{
    try{
      await Excel.run(async (context)=>{
        const range = context.workbook.getSelectedRange();
        range.load(['address', 'rowIndex', 'columnIndex']);
        let sheet = context.workbook.worksheets.getActiveWorksheet();
        sheet.load("name");
        await context.sync();
        setTargetRange(range.address);
        setRowIndex(range.rowIndex);
        setColumnIndex(range.columnIndex);
        setSheetName(sheet.name);
      })

    }catch(error){
      console.log(error)
    }
  }

  const tableToList= async()=>{
    try{
      await Excel.run(async (context)=>{
        let sheet = context.workbook.worksheets.getItem(sheetName);
        let range = sheet.getCell(rowIndex,columnIndex);
        for(let i=1 ; i<rowNo; i++){
         for(let j=0; j<(colNo-1); j++){
           sheet.getCell(rowIndex+(colNo-1)*(i-1)+j, columnIndex+0).values= data[i][0]; 
           sheet.getCell(rowIndex+(colNo-1)*(i-1)+j, columnIndex+1).values= data[0][j+1]; 
           sheet.getCell(rowIndex+(colNo-1)*(i-1)+j, columnIndex+2).values= data[i][j+1]; 
         }
        }
        await context.sync();
      })

    }catch(error){
      console.log(error)
    }
  }
  // loadEvent();
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
      
      <input type="text" value={targetRange} onChange={(e)=>setTargetRange(e.target.value)} onFocus={toggleOff} onClick={copyRange}/>

     <p>{rowNo}</p>

      <button onClick={pasteRange}>get target range</button><br />
      <button onClick={tableToList}> Table to List</button><br />
    </React.Fragment>
  )
}

