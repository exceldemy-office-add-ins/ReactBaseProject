import App from "../taskpane/App";
import * as React from "react";
import { createRoot } from 'react-dom/client';

import './index.css';
import { HashRouter } from "react-router-dom";

/* global document, Office, module, require */

let isOfficeInitialized = false;
const render = (Component) => {
  const container= document.getElementById("app");
  const root = createRoot(container);
  root.render(
    <HashRouter>
      <Component isOfficeInitialized={isOfficeInitialized}/> </HashRouter>
  );

};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});



