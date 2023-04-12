// Circle of Fifths component heavily inspired by: https://blog.logrocket.com/interactive-svg-circle-of-fifths/

import * as React from "react";

import { polarToCartesian, segmentPath } from "./CFMathUtils";
import CIRCLE_OF_FIFTHS_DATA from "./CircleOfFifthsData";

import "./CircleOfFifths.css"

export type CircleOfFifthsProps = {
    /**
     * Selection callback. Receives the currently selected key as a string.
     * @param selection
     */
    handleKeySelection: (selection: string) => void;
}

export const CircleOfFifths = (props: CircleOfFifthsProps) => {

const handleClick = (keySelection) => {
    if (props.handleKeySelection) {
        props.handleKeySelection(keySelection);
    }
    // console.log(`you clicked: ${keySelection}`)
}

const CF_SIZE = 400;
const CF_CENTER = CF_SIZE/2;

return <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${CF_SIZE} ${CF_SIZE}`} >

        <g style={{transform: "rotate(-15deg)", transformOrigin: `${CF_CENTER}px ${CF_CENTER}px`}}>
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return <CircleOfFifthsWedge onClick={() => {handleClick(v.note)}} r0={180} r1={120} d0={i * 30} d1={((i+1) * 30)} selectable={true}/>
            })
        }
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return <CircleOfFifthsWedge onClick={() => {handleClick(v.relativeMinor)}} r0={120} r1={80} d0={i * 30} d1={((i+1) * 30)} selectable={true}/>
            })
        }
        {
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return <CircleOfFifthsWedge r0={80} r1={50} d0={i * 30} d1={((i+1) * 30)} />
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
    selectable?: boolean;
}

const CircleOfFifthsWedge = (props: CircleOfFifthsWedgeProps) => {
    return (
        <path
            d={segmentPath(200, 200, props.r0, props.r1, props.d0, props.d1)}
            className={`cf-wedge ${props.selectable? "selectable" : ""}`}
            stroke="black"
            strokeWidth="2"
            fill="#84CC16"
            onClick={props.onClick? props.onClick : undefined} ></path>
    )
}