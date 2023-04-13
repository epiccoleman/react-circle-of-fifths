import * as React from "react";
import { useState } from "react";

import { CircleOfFifths } from "../CircleOfFifths";

import "./App.css"

export function App() {
  const [key, setKey] = useState("C");

  return <>
    <h1 style={{textAlign: "center"}}>Key Explorer</h1>

    <div style={{margin: "auto", height: "30%", width: "30%"}}>
    <CircleOfFifths handleKeySelection={setKey}/>
    </div>

    <h1 style={{textAlign: "center"}}>{key}</h1>
  </>

}