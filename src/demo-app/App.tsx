import * as React from "react";
import { useState } from "react";

import { CircleOfFifths, CircleOfFifthsSelection } from "../CircleOfFifths";

import "./App.css"

export function App() {
  const [key, setKey] = useState<CircleOfFifthsSelection | undefined>(undefined);

  return <>
    <h1 style={{textAlign: "center"}}>react-circle-of-fifths</h1>

    <div style={{margin: "auto", width: "50%" }}>
    <CircleOfFifths handleKeySelection={setKey}/>
    </div>

    <h1 style={{textAlign: "center"}}>{key? `${key?.tonicDisplay} ${key?.tonality}` : ""}</h1>

    <div style={{textAlign: "center"}} >
      <pre style={{display: "inline-block", textAlign: "left"}}>
        {JSON.stringify(key, null, 2)}
      </pre>
    </div>
  </>

}