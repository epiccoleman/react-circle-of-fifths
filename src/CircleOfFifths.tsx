// Circle of Fifths component heavily inspired by: https://blog.logrocket.com/interactive-svg-circle-of-fifths/

import * as React from "react";
import "./CircleOfFifths.css"

import CIRCLE_OF_FIFTHS_DATA from "./CircleOfFifthsData";
import { polarToCartesian, segmentPath } from "./CFMathUtils";

type CircleOfFifthsTheme = {
    majorKeysFillColor?: string;
    majorKeysFillColorHover?: string;
    majorKeysFillColorSelected?: string;
    minorKeysFillColor?: string;
    minorKeysFillColorHover?: string;
    minorKeysFillColorSelected?: string;
    diminishedKeysFillColor?: string;

    strokeColor?: string;
    strokeWidth?: string;
    textColor?: string;
}

const defaultTheme = {
    majorKeysFillColor: "#84CC16",
    majorKeysFillColorHover: "#65A30D",
    majorKeysFillColorSelected:  "#65A30D",
    minorKeysFillColor: "#84CC16",
    minorKeysFillColorHover: "#65A30D",
    minorKeysFillColorSelected:  "#65A30D",
    diminishedKeysFillColor: "#84CC16",

    strokeColor: "black",
    strokeWidth: "2px",
    textColor: "black"
} as CircleOfFifthsTheme;

type CircleOfFifthsProps = {
    theme?: CircleOfFifthsTheme;
    handleKeySelection?: (selection: string) => void
}

const CF_SIZE = 400;

export const CircleOfFifths = (props: CircleOfFifthsProps) => {

    const handleClick = (keySelection) => {
        if (props.handleKeySelection) {
            props.handleKeySelection(keySelection);
        }
    }

    return <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${CF_SIZE} ${CF_SIZE}`} >

            <g style={{transform: "rotate(-15deg)", transformOrigin: `${CF_SIZE/2}px ${CF_SIZE/2}px`}}>
            {
                ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                    return <CircleOfFifthsWedge onClick={() => {handleClick(v.note)}} r0={180} r1={120} d0={i * 30} d1={((i+1) * 30)}/>
                })
            }
            {
                ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                    return <CircleOfFifthsWedge onClick={() => {handleClick(v.relativeMinor)}} r0={120} r1={80} d0={i * 30} d1={((i+1) * 30)}/>
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
    r0: number;
    r1: number;
    d0: number;
    d1: number;
    fillColor?: string;
    hoverColor?: string;
    selectedColor?: string;
    strokeColor?: string;
    onClick?: () => void;
}

const CircleOfFifthsWedge = (props: CircleOfFifthsWedgeProps) => {
    /**
     * @param r0 - outer radius of the segment, i.e. how far out it extends from the center of the circle
     * @param r1 - inner radius of the segment - i.e. where it starts. if this were 0, the segment would touch the center
     * @param d0 - where the segment starts in the circle - i.e. the degrees from reference of one edge
     * @param d1 - where the segment end in the circle - i.e. the degrees from reference of other edge
     * @param onClick - onClick
     */
    return (
        <path
            d={segmentPath(200, 200, props.r0, props.r1, props.d0, props.d1)}
            stroke="black"
            strokeWidth="2"
            fill="#84CC16"
            onClick={props.onClick} ></path>
    )
}