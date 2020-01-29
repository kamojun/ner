import React from "react";
import ReactDOM from "react-dom";
import App from './components/app'
import { Provider } from './components/context'

ReactDOM.render(
  <Provider><App /></Provider>,
  document.getElementById("root"),
);