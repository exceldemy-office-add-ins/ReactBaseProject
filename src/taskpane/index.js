import App from "../taskpane/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css';
import { HashRouter } from "react-router-dom";

/* global document, Office, module, require */

let isOfficeInitialized = false;
const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Component isOfficeInitialized={isOfficeInitialized}/> </HashRouter>,
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


