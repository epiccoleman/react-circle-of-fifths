// Circle of Fifths component heavily inspired by: https://blog.logrocket.com/interactive-svg-circle-of-fifths/

import React from "react";

function polarToCartesian(x, y, r, degrees) {
  const radians = (degrees * Math.PI) / 180.0;
  return [x + r * Math.cos(radians), y + r * Math.sin(radians)];
}

function segmentPath(x, y, r0, r1, d0, d1) {
  const arc = Math.abs(d0 - d1) > 180 ? 1 : 0;
  const point = (radius, degree) =>
    polarToCartesian(x, y, radius, degree)
      .map((n) => n.toPrecision(5))
      .join(",");
  return [
    `M${point(r0, d0)}`, // Move to the
    `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
    `L${point(r1, d1)}`,
    `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
    "Z",
  ].join("");
}

function segment(index, segments, size, radius, width) {
    const center = size / 2
    const degrees = 360 / segments
    const start = degrees * index
    const end = (degrees * (index + 1) + 1)
    const path = segmentPath(center, center, radius, radius-width, start, end)
    return `<path stroke="black" d="${path}" />`
  }

  function posXY(center, radius, angle) {
    return [
      center + radius * Math.cos(angle * Math.PI / 180.0),
      center + radius * Math.sin(angle * Math.PI / 180.0)
    ]
  }

// todo: s is sharp, b is flat - figure out how to render em better?
const CIRCLE_OF_FIFTHS_DATA = [
    {
        note: "C",
        relativeMinor: "Am",
        keySignature: ""
    },
    {
        note: "G",
        relativeMinor: "Em",
        keySignature: "s"
    },
    {
        note: "D",
        relativeMinor: "Bm",
        keySignature: "ss"
    },
    {
        note: "A",
        relativeMinor: "Fsm",
        keySignature: "sss"
    },
    {
        note: "E",
        relativeMinor: "Csm",
        keySignature: "ssss"
    },
    {
        note: "B",
        relativeMinor: "Gsm",
        keySignature: "sssss"
    },
    {
        note: "Gb",
        relativeMinor: "Dsm",
        keySignature: "sssss"
    },
    {
        note: "Db",
        relativeMinor: "Bbm",
        keySignature: "bbbbb"
    },
    {
        note: "Ab",
        relativeMinor: "Fm",
        keySignature: "bbbb"
    },
    {
        note: "Eb",
        relativeMinor: "Cm",
        keySignature: "bbb"
    },
    {
        note: "Bb",
        relativeMinor: "Gm",
        keySignature: "bb"
    },
    {
        note: "F",
        relativeMinor: "Dm",
        keySignature: "b"
    },
]

export const CircleOfFifths = () => {

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


return <>
    <div className="container py-4 m-auto">
        <svg className="m-auto text-lime-900" version="1.1"
        width="800" height="800"
        xmlns="http://www.w3.org/2000/svg"
        >



        <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="5" fill="transparent" />
        {/* <path */}

        {data.map((n) => segment(n, 12, 10, 10, 100 ))}
        {/* <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text> */}
</svg>

    </div>


</>

}