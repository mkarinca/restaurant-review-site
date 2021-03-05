import React, { useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Context from "./context";
import reducer from "./reducer";

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
