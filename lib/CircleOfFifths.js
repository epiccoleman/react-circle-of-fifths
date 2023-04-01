"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleOfFifths = void 0;
const React = require("react");
require("./CircleOfFifths.css");
function polarToCartesian(x, y, r, degrees) {
    const radians = (degrees * Math.PI) / 180.0;
    return [x + r * Math.cos(radians), y + r * Math.sin(radians)];
}
function segmentPath(x, y, r0, r1, d0, d1) {
    const arc = Math.abs(d0 - d1) > 180 ? 1 : 0;
    const point = (radius, degree) => polarToCartesian(x, y, radius, degree)
        .map((n) => n.toPrecision(5))
        .join(",");
    return [
        `M${point(r0, d0)}`,
        `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
        `L${point(r1, d1)}`,
        `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
        "Z",
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
];
const CircleOfFifths = (props) => {
    const handleClick = (keySelection) => {
        if (props.handleKeySelection) {
            props.handleKeySelection(keySelection);
        }
    };
    return React.createElement("svg", { version: "1.1", width: "800", height: "800", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 400 400" },
        React.createElement("g", { style: { transform: "rotate(-15deg)", transformOrigin: "200px 200px" } },
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return React.createElement(CircleOfFifthsWedge, { onClick: () => { handleClick(v.note); }, x: 200, y: 200, r0: 180, r1: 120, d0: i * 30, d1: ((i + 1) * 30) });
            }),
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return React.createElement(CircleOfFifthsWedge, { onClick: () => { handleClick(v.relativeMinor); }, x: 200, y: 200, r0: 120, r1: 80, d0: i * 30, d1: ((i + 1) * 30) });
            }),
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                return React.createElement(CircleOfFifthsWedge, { x: 200, y: 200, r0: 80, r1: 50, d0: i * 30, d1: ((i + 1) * 30), onClick: null });
            })),
        React.createElement("g", null,
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                const [center_x, center_y] = polarToCartesian(200, 200, 150, (i * 30));
                return React.createElement("text", { style: { textAnchor: "middle", dominantBaseline: "central", pointerEvents: "none" }, x: center_x, y: center_y }, v.note);
            }),
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                const [center_x, center_y] = polarToCartesian(200, 200, 100, (i * 30));
                return React.createElement("text", { style: { textAnchor: "middle", dominantBaseline: "central", fontSize: "small", pointerEvents: "none" }, x: center_x, y: center_y }, v.relativeMinor);
            }),
            ...CIRCLE_OF_FIFTHS_DATA.map((v, i) => {
                const [center_x, center_y] = polarToCartesian(200, 200, 65, (i * 30));
                return React.createElement("text", { style: { textAnchor: "middle", dominantBaseline: "central", fontSize: "xx-small", pointerEvents: "none" }, x: center_x, y: center_y }, v.diminished);
            })));
};
exports.CircleOfFifths = CircleOfFifths;
const CircleOfFifthsWedge = ({ x, y, r0, r1, d0, d1, onClick }) => {
    return (React.createElement("path", { onClick: onClick ? onClick : null, className: "cf-wedge", d: segmentPath(x, y, r0, r1, d0, d1), stroke: "black", strokeWidth: "2", fill: "#84CC16" }));
};
//# sourceMappingURL=CircleOfFifths.js.map