import React from 'react'

export default function Transpose() {
  const [copiedRange, setCopiedRange] = React.useState('');
  const [rowNo, setRowNo]= React.useState('');
  const [colNo, setColNo]= React.useState('');
  const [targetRange, setTargetRange]= React.useState('');
  const [rowIndex, setRowIndex]= React.useState('');
  const [columnIndex, setColumnIndex]= React.useState('');
  const [sheetName, setSheetName]= React.useState('');
  const [data, setData]=React.useState('');

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
  return (

    <React.Fragment>
      <p>Selected Range: {copiedRange}</p>
      <button onClick={copyRange}>get selected range</button>
      <p>Target Range: {targetRange}</p><br />
      {/* {rowIndex}--{columnIndex}-- {sheetName}--{rowNo}--{colNo} <br />
      <p>No of rows {colNo}</p> */}

      <button onClick={pasteRange}>get target range</button><br />
      <button onClick={tableToList}> Table to List</button>
    </React.Fragment>
  )
}
