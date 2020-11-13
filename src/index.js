import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "fontsource-roboto";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { App } from "./App";

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
