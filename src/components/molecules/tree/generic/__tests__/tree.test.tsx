import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Tree } from "../index";
import {
  LeafComponent,
  TitleLeafComponent,
} from "@/components/molecules/tree/generic/leaf";

const onClick = vi.fn();
const expandClick = vi.fn();

const data = [
  {
    id: "1",
    name: "Test",
    onClick: expandClick,
    children: [
      {
        id: "1.1",
        name: "Test 1.1",
      },
    ],
  },
  {
    id: "2",
    name: "Test 2",
    children: [
      {
        id: "2.1",
        name: "Test 2.1",
      },
    ],
  },
  {
    id: "3",
    name: "Test 3",
    onClick,
  },
];

describe(Tree.name, () => {
  beforeEach(() => {
    cleanup();
  });

  it("Should trigger the onClick function", () => {
    render(<Tree data={data} />);
    const item = screen.getByTestId("tree-leaf-3");
    item.click();
    expect(onClick).toHaveBeenCalledWith(data[2]);
  });

  it("Should trigger the onClick function on expandable", () => {
    render(<Tree data={data} />);
    const item = screen.getByTestId("tree-trigger-1");
    item.click();
    expect(onClick).toHaveBeenCalledWith(data[2]);
  });

  it("Should match the snapshot", () => {
    const resp = render(
      <Tree
        data={data}
        initialSelectedItemId={"1"}
        titleLeaf={TitleLeafComponent}
        leaf={LeafComponent}
      />,
    );
    expect(resp).toMatchSnapshot();
  });
});
