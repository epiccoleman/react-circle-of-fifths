# React Circle of Fifths

[React Circle of Fifths on npm](https://www.npmjs.com/package/react-circle-of-fifths)

A beautiful, interactive, and highly customizable Circle of Fifths component for React.

# Getting Started

Install this package via npm:
``` bash
npm install react-circle-of-fifths
```

Or yarn:
``` bash
yarn add react-circle-of-fifths
```

Import the CircleOfFifths component, and render it!
``` tsx
import { CircleOfFifths } from "react-circle-of-fifths";
```

And render it!
``` tsx
    <CircleOfFifths handleKeySelection={setKey}/>
```


The CircleOfFifths takes an optional callback, which will be passed the currently selected key when the selection changes. One way to take advantage of
this is to use a `useState` hook in the component that renders the CircleOfFifths component:

``` tsx
export function App() {
  const [key, setKey] = useState("C");

  return <>
    <h1 style={{textAlign: "center"}}>{key}</h1>
    <CircleOfFifths handleKeySelection={setKey}/>
  </>
```

The default size of the SVG element this component renders is quite large, so you'll probably want to adjust the size via CSS. See the [demo application](https://github.com/epiccoleman/react-circle-of-fifths/tree/main/src/demo-app/) for a minimal example of using and styling the Circle.


# Styling the Circle of Fifths
The Circle of Fifths component ships with a default stylesheet and color theme. If this theme isn't to your liking, or doesn't fit well with the color theme of your application, you can customize the colors via CSS variables. Or, just copy-paste this block into the CSS file for your component, and change it to your liking!
``` css
.cf-theme {
    --cf-major-keys-fill: #84CC16;
    --cf-major-keys-fill-hover: #65A30D;
    --cf-major-keys-fill-selected:  #65A30D;
    --cf-minor-keys-fill: #84CC16;
    --cf-minor-keys-fill-hover: #65A30D;
    --cf-minor-keys-fill-selected:  #65A30D;
    --cf-diminished-keys-fill: #84CC16;

    --cf-stroke-color: black;
    --cf-stroke-width: 2px;
    --cf-text-color: black;
}
```

You can check out the [demo app](https://github.com/epiccoleman/react-circle-of-fifths/tree/main/src/demo-app/) for an example of how this works.

Note: One planned feature for this component is to allow styling via props. If this is something you'd use, drop me a line or

# Note

This project is currently in alpha development and may not be ready for production use. If you'd like to help, file an issue or email me at eric@epiccoleman.com!
