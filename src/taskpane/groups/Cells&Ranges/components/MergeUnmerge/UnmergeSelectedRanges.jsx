import React from 'react'
import OkCancelButton from '../../../../shared/reusableComponents/okCancelButton';

export default function UnmergeSelectedRanges(props) {
  let rng = props.selection;
  const unmergeSelection = async () => {
    try {
      await Excel.run(async (context) => {
        
        
        
        const mergeRange = sheet2.getMergedAreasOrNullObject();
        mergeRange.load(["address", "cellCount"]);
        const range= context.workbook.getActiveCell();
        range.load('address');
        
        await context.sync();
        let val= range.address;
        const sheet2 = context.workbook.worksheets.getActiveWorksheet().getRange(range.address);
        
        console.log(range.address)
        console.log(val)
        // console.log(sheet2.address)
        // console.log(mergeRange.address);
        // console.log(mergeRange.cellCount);
        // let sepValues = mergeRange.address.split(",");
        // console.log(sepValues[0])
        // console.log(sepValues[1])

        // const sheet = context.workbook.worksheets.getActiveWorksheet();

        // for (let i = 0; i < sepValues.length; i++) {
        //   sheet.getRange(sepValues[i]).format.font.color = "green";
        // }
        // for (let i = 0; i < sepValues.length; i++) {
        //   sheet.getRange(sepValues[i]).unmerge(true);

        // }
         await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <OkCancelButton onClick={unmergeSelection}  targetRange="nothing"/>
    </React.Fragment>
  );
}

