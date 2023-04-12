// Circle of Fifths component heavily inspired by: https://blog.logrocket.com/interactive-svg-circle-of-fifths/

import * as React from "react";
import "./CircleOfFifths.css"

function polarToCartesian(x, y, r, degrees) {
    /**
     * https://observablehq.com/@haakenlid/svg-circle
     * Given a polar coordinate (r, degrees), converts to a cartesian coordinate, centered on (x,y)
     *
     * @param x - x offset for the center of the circle
     * @param y - y offset for the center of the circle
     * @param r - radius of the polar coordinate
     * @param degrees - degrees of the polar coordinate
     */
  const radians = (degrees * Math.PI) / 180.0;
  return [x + r * Math.cos(radians), y + r * Math.sin(radians)];
}

function segmentPath(x, y, r0, r1, d0, d1) {
    /**
     * https://observablehq.com/@haakenlid/svg-circle
     * Generates an svg path for a segment of a circle
     *
     * @param x - x offset for the center of the circle
     * @param y - y offset for the center of the circle
     * @param r0 - outer radius of the segment, i.e. how far out it extends from the center of the circle
     * @param r1 - inner radius of the segment - i.e. where it starts. if this were 0, the segment would touch the center
     * @param d0 - where the segment starts in the circle - i.e. the degrees from reference of one edge
     * @param d1 - where the segment end in the circle - i.e. the degrees from reference of other edge
     */
  const arc = Math.abs(d0 - d1) > 180 ? 1 : 0;
  const point = (radius, degree) =>
    polarToCartesian(x, y, radius, degree)
      .map((n) => n.toPrecision(5))
      .join(",");
  return [
    `M${point(r0, d0)}`, // Move to the starting point of the segment - one "corner"
    `A${r0},${r0},0,${arc},1,${point(r0, d1)}`, // draw outer arc from that corner to the next corner
    `L${point(r1, d1)}`, // draw the line to the inner radius
    `A${r1},${r1},0,${arc},0,${point(r1, d0)}`, // draw the inner arc
    "Z", // close the path - draw the line back to the start point.
  ].join("");
}

const CIRCLE_OF_FIFTHS_DATA = [
    {
        note: "A",
        relativeMinor: "F♯m",
        diminished: "G♯°",
        keySignature: "♯♯♯"
    },
    {
        note: "E",
        relativeMinor: "C♯m",
        diminished: "D♯°",
        keySignature: "♯♯♯♯"
    },
    {
        note: "B",
        relativeMinor: "G♯m",
        diminished: "A♯°",
        keySignature: "♯♯♯♯♯"
    },
    {
        note: "G♭",
        relativeMinor: "D♯m",
        diminished: "F♯°",
        keySignature: "♯♯♯♯♯♯"
    },
    {
        note: "D♭",
        relativeMinor: "B♭m",
        diminished: "C°",
        keySignature: "♭♭♭♭♭"
    },
    {
        note: "A♭",
        relativeMinor: "Fm",
        diminished: "G°",
        keySignature: "♭♭♭♭"
    },
    {
        note: "E♭",
        relativeMinor: "Cm",
        diminished: "D°",
        keySignature: "♭♭♭"
    },
    {
        note: "B♭",
        relativeMinor: "Gm",
        diminished: "A°",
        keySignature: "♭♭"
    },
    {
        note: "F",
        relativeMinor: "Dm",
        diminished: "E°",
        keySignature: "♭"
    },
    {
        note: "C",
        relativeMinor: "Am",
        diminished: "B°",
        keySignature: ""
    },
    {
        note: "G",
        relativeMinor: "Em",
        diminished: "F♯°",
        keySignature: "♯"
    },
    {
        note: "D",
        relativeMinor: "Bm",
        diminished: "C♯°",
        keySignature: "♯♯"
    },
]

export type CircleOfFifthsProps = {
    handleKeySelection: (selection: string) => void;
}

export const CircleOfFifths = (props: CircleOfFifthsProps) => {

const handleClick = (keySelection) => {
    if (props.handleKeySelection) {
        props.handleKeySelection(keySelection);
    }
    // console.log(`you clicked: ${keySelection}`)
}

return <svg version="1.1"
        width="800" height="800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400" >

        <g style={{transform: "rotate(-15deg)", transformOrigin: "200px 200px"}}>
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return <CircleOfFifthsWedge onClick={() => {handleClick(v.note)}} x={200} y={200} r0={180} r1={120} d0={i * 30} d1={((i+1) * 30)}/>
            })
        }
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return <CircleOfFifthsWedge onClick={() => {handleClick(v.relativeMinor)}} x={200} y={200} r0={120} r1={80} d0={i * 30} d1={((i+1) * 30)}/>
            })
        }
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return <CircleOfFifthsWedge x={200} y={200} r0={80} r1={50} d0={i * 30} d1={((i+1) * 30)} onClick={null}  />
            })
        }
        </g>
        <g>
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                const [center_x, center_y] = polarToCartesian(200, 200, 150, (i *30))
                return <text style={{textAnchor: "middle", dominantBaseline: "central", pointerEvents: "none"}} x={center_x} y={center_y} >{v.note}</text>
            })
        }
         {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                const [center_x, center_y] = polarToCartesian(200, 200, 100, (i *30))
                return <text style={{textAnchor: "middle", dominantBaseline: "central", fontSize: "small", pointerEvents: "none"}} x={center_x} y={center_y} >{v.relativeMinor}</text>
            })
        }
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                const [center_x, center_y] = polarToCartesian(200, 200, 65, (i *30))
                return <text style={{textAnchor: "middle", dominantBaseline: "central", fontSize: "xx-small", pointerEvents: "none"}} x={center_x} y={center_y} >{v.diminished}</text>
            })
        }
        </g>
        </svg>

}

const CircleOfFifthsWedge = ({x, y, r0, r1, d0, d1, onClick}) => {
    /**
     * @param x - x offset for the center of the circle
     * @param y - y offset for the center of the circle
     * @param r0 - outer radius of the segment, i.e. how far out it extends from the center of the circle
     * @param r1 - inner radius of the segment - i.e. where it starts. if this were 0, the segment would touch the center
     * @param d0 - where the segment starts in the circle - i.e. the degrees from reference of one edge
     * @param d1 - where the segment end in the circle - i.e. the degrees from reference of other edge
     * @param onClick - onClick
     */
    return (
        <path onClick={onClick? onClick : null} className="cf-wedge" d={segmentPath(x, y, r0, r1, d0, d1)} stroke="black" strokeWidth="2" fill="#84CC16" ></path>
    )
}