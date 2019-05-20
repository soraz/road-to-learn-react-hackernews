import React from "react";
import ReactDOM from "react-dom";
import Button from ".";
import renderer from "react-test-renderer";

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button onClick={() => {}}>More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Button onClick={() => {}}>More</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
