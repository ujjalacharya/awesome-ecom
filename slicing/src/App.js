import React from "react";
import logo from "./logo.svg";
import Router from "./Router/MainRouter";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
