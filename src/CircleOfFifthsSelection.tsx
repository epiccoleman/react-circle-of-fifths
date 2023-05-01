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