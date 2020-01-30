import React from "react";
import ReactDOM from "react-dom";
import App from './components/app'
import { Provider } from './context'

ReactDOM.render(
  <Provider><App /></Provider>,
  document.getElementById("root"),
);