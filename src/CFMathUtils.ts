export function polarToCartesian(x, y, r, degrees) {
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

export function segmentPath(x, y, r0, r1, d0, d1) {
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
