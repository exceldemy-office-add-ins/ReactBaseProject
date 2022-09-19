import App from "../taskpane/components/App";
import * as React from "react";
import * as ReactDOM from "react-dom";

/* global document, Office, module, require */

let isOfficeInitialized = false;
const render = (Component) => {
  ReactDOM.render(
      <Component isOfficeInitialized={isOfficeInitialized}/>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});
/* Initial render showing a progress bar */
render(App);


