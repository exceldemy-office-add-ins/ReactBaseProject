import React from "react";

export default function CopiedRange() {
  const [copiedRange, setCopiedRange] = React.useState("");
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

  // async function remove() {
  //   await Excel.run(eventResult.context, async (context) => {
  //     const worksheet = context.workbook.worksheets.getActiveWorksheet();
  //     worksheet.onSelectionChanged.remove(copiedRangeEventHandler);
  //     await context.sync();

  //     eventResult = null;
  //     console.log("Event handler successfully removed.");
  //     console.log(eventResult);
  //   });
  // }
  // const renderHandler = () => {
  //   setRender("false");
  // };
  // async function toggle(){

  //     await Excel.run(async (context) => {
  //         context.runtime.load("enableEvents");
  //         await context.sync();

  //         let eventBoolean = !context.runtime.enableEvents;
  //         context.runtime.enableEvents = eventBoolean;
  //         if (eventBoolean) {
  //             console.log("Events are currently on.");
  //         } else {
  //             console.log("Events are currently off.");
  //         }

  //         await context.sync();
  //     });
  // }

  return (
    <div>
      <p>Source Range {copiedRange}</p>
      <input
        type="text"
        value={copiedRange}
        onChange={(e) => {
          setCopiedRange(e.target.value);
        }}
        onClick={copiedRangeEvent}
      />
    </div>
  );
}
