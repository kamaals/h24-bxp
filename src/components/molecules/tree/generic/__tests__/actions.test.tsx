import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TreeActions from "../actions";

describe(TreeActions.name, () => {
  beforeEach(() => {
    cleanup();
  });

  it("Should render correctly for selected", () => {
    render(
      <TreeActions isSelected={true}>
        <div data-testid="action">Action</div>
      </TreeActions>,
    );
    expect(screen.getByTestId("action")).toBeInTheDocument();
  });

  it("Should render correctly for selected", () => {
    render(
      <TreeActions isSelected={false} id={"1"}>
        <div>Action</div>
      </TreeActions>,
    );
    expect(screen.getByTestId("tree-actions-1")).toHaveClass("hidden");
  });

  it("Should match the snapshot", () => {
    const resp = render(
      <TreeActions isSelected={false}>
        <div>Action</div>
      </TreeActions>,
    );
    expect(resp).toMatchSnapshot();
  });
});
