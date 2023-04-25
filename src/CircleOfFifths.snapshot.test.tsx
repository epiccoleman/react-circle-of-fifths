import * as React from "react";
import { render } from "@testing-library/react";
import { CircleOfFifths } from './CircleOfFifths';

it('renders correctly', () => {
  const renderedCf = render(<CircleOfFifths />)
  expect(renderedCf).toMatchSnapshot();
});