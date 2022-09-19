import * as React from "react";
const ColorYellow = () =>{
    const click = async () => {
        try {
          await Excel.run(async (context) => {
            /**
             * Insert your Excel code here
             */
            const range = context.workbook.getSelectedRange();
    
            // Read the range address
            range.load("address");
    
            // Update the fill color
            range.format.fill.color = "yellow";
    
            await context.sync();
            console.log(`The range address was ${range.address}.`);
          });
        } catch (error) {
          console.error(error);
        }
      };
    return(
    <div>
      <h4>The below button colors your selected cell to Yellow.</h4>
    { <button onClick={click}>Color Yellow</button>}

   </div>
    )
}

export default ColorYellow;