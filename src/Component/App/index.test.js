import React from "react";
import ReactDOM from "react-dom";
import App, { updateSearchTopStoriesState } from ".";
import renderer from "react-test-renderer";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    Date.now = jest.fn(() => 1482363367071);
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("functions", () => {
  test("updateSearchTopStoriesState testing merge", () => {
    const list = [
      { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", num_comments: 1, points: 2, objectID: "x" }
    ];
    const state = {
      searchKey: "test",
      results: {
        test: {
          hits: [
            {
              title: "3",
              author: "1",
              num_comments: 1,
              points: 2,
              objectID: "a"
            },
            {
              title: "4",
              author: "2",
              num_comments: 1,
              points: 2,
              objectID: "b"
            }
          ]
        }
      }
    };
    const result = updateSearchTopStoriesState(list, 0)(state);
    expect(result.results["test"].hits.length).toBe(4);
  });
});
