// Circle of Fifths component heavily inspired by: https://blog.logrocket.com/interactive-svg-circle-of-fifths/

import * as React from "react";
import "./CircleOfFifths.css"

import CIRCLE_OF_FIFTHS_DATA from "./CircleOfFifthsData";

import { polarToCartesian, segmentPath } from "./CFMathUtils";

export type CircleOfFifthsProps = {
    handleKeySelection: (selection: string) => void;
}

export const CircleOfFifths = (props: CircleOfFifthsProps) => {

const handleClick = (keySelection) => {
    if (props.handleKeySelection) {
        props.handleKeySelection(keySelection);
    }
}

return <svg version="1.1"
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