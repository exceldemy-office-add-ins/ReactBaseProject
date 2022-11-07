import React from 'react'

export default function TargetRange() {
    const [targetRange, setTargetRange]= React.useState('');

// const targetRangeEvent= async()=>{
//   try{
//     await Excel.run(async (context) => {
//       const worksheet = context.workbook.worksheets.getActiveWorksheet();
//       targetEventResult=worksheet.onSingleClicked.add(targetRangeEventHandler);
//       await context.sync();
//   })

//   }catch(error){
//     console.log(error)
//   }
// }
// async function targetRangeEventHandler(event2) {
//   await Excel.run(async (context) => {
 
//       await context.sync();     
//       setTargetRange(event2.address);   
//       console.log(event2);
     
//       console.log("Address of event2: " + event2.address);
     
//   })
// }

  return (
    <div>
       <p>Target Range: {targetRange}</p>
      
      <input type="text" value={targetRange} onChange={(e)=>setTargetRange(e.target.value)}  />
    </div>
  )
}
