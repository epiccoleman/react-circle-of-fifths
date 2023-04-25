// Circle of Fifths component heavily inspired by: https://blog.logrocket.com/interactive-svg-circle-of-fifths/

import * as React from "react";

import { polarToCartesian, segmentPath } from "./CFMathUtils";
import CIRCLE_OF_FIFTHS_DATA from "./CircleOfFifthsData";

import "./CircleOfFifths.css";
import { useState } from "react";

/**
 * Represents a selection made on the Circle of Fifths.
 */
export type CircleOfFifthsSelection = {
    /**
     * The tonic note of the selected key. This string is formatted to be suitable
     * for calls to tonal.js.
     */
    tonic: string;
    /**
     * A nicely formatted string of the given note with symbols for sharps and flats,
     * suitable for display.
     */
    tonicDisplay: string;
    /**
     * The tonality of the selected key, either "major" or "minor".
     */
    tonality: "major" | "minor";
}

export type CircleOfFifthsProps = {
  /**
   * Selection callback. Receives the currently selected key as a CircleOfFifthsSelection object.
   * @param selection
   */
  handleKeySelection?: (selection: CircleOfFifthsSelection ) => void;
};

export const idToSelection = (selectionId): CircleOfFifthsSelection => {
    const keyDataObject = CIRCLE_OF_FIFTHS_DATA.find((keyData) => {
        return keyData.idMajor === selectionId || keyData.idMinor === selectionId
    })

    if (!keyDataObject) {
        throw("Unable to find selected key.")
    }

    const selectedKeyIsMajor = keyDataObject.idMajor === selectionId

    let tonic = selectedKeyIsMajor ? keyDataObject.idMajor : keyDataObject.idMinor.slice(0, -1);
    tonic = tonic.replace("s", "#");
    const tonicDisplay = selectedKeyIsMajor ? keyDataObject.displayMajor : keyDataObject.displayRelativeMinor.slice(0, -1)
    const tonality = selectedKeyIsMajor ? "major" : "minor"

    return {
        tonic,
        tonicDisplay,
        tonality
    }
}

export const CircleOfFifths = (props: CircleOfFifthsProps) => {
  const [selectedKey, setSelectedKey] = useState("")

  const handleClick = (keySelection: string) => {
    setSelectedKey(keySelection);

    if (props.handleKeySelection) {
      props.handleKeySelection(idToSelection(keySelection));
    }
  };

  const selectionClasses = (keyId) => {
    const classList: string[] = []

    if (keyId === selectedKey) {
        classList.push("selected")
    }

    return " " + classList.join(" ")
  }

  const CF_SIZE = 400;
  const CF_CENTER = CF_SIZE / 2;

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${CF_SIZE} ${CF_SIZE}`}
    >
      {/* This group renders the wedge shapes that make up the circle.  */}
      <g
        style={{
          transform: "rotate(-15deg)",
          transformOrigin: `${CF_CENTER}px ${CF_CENTER}px`,
        }}
      >
        {...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
          return (
            <>
            <CircleOfFifthsWedge
              id={v.idMajor}
              extraClasses={"major" + selectionClasses(v.idMajor)}
              onClick={() => {
                handleClick(v.idMajor);
              }}
              r0={180}
              r1={120}
              d0={i * 30}
              d1={(i + 1) * 30}
              selectable={true}
            />

            <CircleOfFifthsWedge
              id={v.idMinor}
              extraClasses={"minor" + selectionClasses(v.idMinor)}
              onClick={() => {
                handleClick(v.idMinor);
              }}
              r0={120}
              r1={80}
              d0={i * 30}
              d1={(i + 1) * 30}
              selectable={true}
            />

            <CircleOfFifthsWedge
              extraClasses="diminished"
              r0={80}
              r1={50}
              d0={i * 30}
              d1={(i + 1) * 30}
            />

            </>
          );
        })}
      </g>

      {/* This group renders the labels for each wedge.  */}
      <g>
        {...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
          const [major_center_x, major_center_y] = polarToCartesian(200, 200, 150, i * 30);
          const [minor_center_x, minor_center_y] = polarToCartesian(200, 200, 100, i * 30);
          const [diminished_center_x, diminished_center_y] = polarToCartesian(200, 200, 65, i * 30);
          return (
            <>
            <text
              className="cf-theme cf-text"
              style={{
                textAnchor: "middle",
                dominantBaseline: "central",
                pointerEvents: "none",
              }}
              x={major_center_x}
              y={major_center_y}
            >
              {v.displayMajor}
            </text>

            <text
              className="cf-theme cf-text"
              style={{
                textAnchor: "middle",
                dominantBaseline: "central",
                fontSize: "small",
                pointerEvents: "none",
              }}
              x={minor_center_x} y={minor_center_y}
            >
              {v.displayRelativeMinor}
            </text>

            <text
              className="cf-theme cf-text"
              style={{
                textAnchor: "middle",
                dominantBaseline: "central",
                fontSize: "xx-small",
                pointerEvents: "none",
              }}
              x={diminished_center_x}
              y={diminished_center_y}
            >
              {v.diminished}
            </text>
            </>
          );
        })}
      </g>
    </svg>
  );
};

type CircleOfFifthsWedgeProps = {
  /**
   * The outer radius of the segment, i.e. how far out it extends from the center of the circle.
   */
  r0: number;
  /**
   * The inner radius of the segment, i.e. where it starts. If this were 0, the segment would touch the center.
   */
  r1: number;
  /**
   * The starting position of the segment in the circle in degrees from the reference point.
   */
  d0: number;
  /**
   * The ending position of the segment in the circle in degrees from the reference point.
   */
  d1: number;
  /**
   * The callback function to be called when the CircleOfFifthsWedge is clicked.
   */
  onClick?: () => void;
  /**
   * Set this to true if the wedge is selectable.
   */
  selectable?: boolean;
  /**
   * Takes a string of space-separated class names to be added to the class list for this wedge.
   */
  extraClasses?: string;
  /**
   * Id for the <path> element.
   */
  id?: string;
};

const CircleOfFifthsWedge = (props: CircleOfFifthsWedgeProps) => {
  return (
    <path
      id={props.id}
      d={segmentPath(200, 200, props.r0, props.r1, props.d0, props.d1)}
      className={`cf-theme cf-wedge ${props.selectable ? "selectable" : ""} ${
        props.extraClasses
      }`}
      onClick={props.onClick ? props.onClick : undefined}
    ></path>
  );
};
