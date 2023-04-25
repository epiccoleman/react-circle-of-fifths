import * as React from "react"
import { CircleOfFifths, CircleOfFifthsSelection, idToSelection } from "./CircleOfFifths";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("idToSelection", () => {
    it("correctly converts a major selection", () => {
        const expected: CircleOfFifthsSelection = {
            tonic: "C",
            tonicDisplay: "C",
            tonality: "major"
        }

        const actual = idToSelection("C")

        expect(actual).toEqual(expected);
    });

    it("correctly converts a selection with a sharp", () => {
        const expected: CircleOfFifthsSelection = {
            tonic: "G#",
            tonicDisplay: "G♯",
            tonality: "minor"
        }

        const actual = idToSelection("Gsm")

        expect(actual).toEqual(expected);
    });
});

describe("CircleOfFifths selection handler", () => {
    let actualKey;

    beforeEach(() => {
        const testSelectionHandler = (selection) => {
            actualKey = selection;
        }

        render(<CircleOfFifths handleKeySelection={testSelectionHandler} />)
    })

    afterEach(() => {
        actualKey = {};
    })

    it("returns the selected major key", async () => {
        // this is kind of ugly, but since we do pointer-events: none
        // on label text, it's the best option we have for selecting the element.
        const wedgeToClick = document.querySelector(".cf-wedge#Ab") as Element;
        await userEvent.click(wedgeToClick)

        const expectedKey: CircleOfFifthsSelection = {
            tonic: "Ab",
            tonicDisplay: "A♭",
            tonality: "major"
        }

        expect(actualKey).toEqual(expectedKey)
    })

    it("returns the selected minor key", async () => {
        const wedgeToClick = document.querySelector(".cf-wedge#Csm") as Element;
        await userEvent.click(wedgeToClick)

        const expectedKey: CircleOfFifthsSelection = {
            tonic: "C#",
            tonicDisplay: "C♯",
            tonality: "minor"
        }

        expect(actualKey).toEqual(expectedKey)
    })

});
