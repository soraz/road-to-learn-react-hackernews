import React from "react";
import ReactDOM from "react-dom";
import App, { Search, Button, Table, updateSearchTopStoriesState } from "./App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

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

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Search />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

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

describe("Table", () => {
  const props = {
    list: [
      { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", num_comments: 1, points: 2, objectID: "x" }
    ],
    onDismiss: () => {},
    sortKey: "TITLE",
    isSortReverse: false
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("show two items in list", () => {
    const element = shallow(<Table {...props} />);
    expect(element.find(".table-row").length).toBe(2);
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
