import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { LeafAction } from "../leaf-action";
import userEvent from "@testing-library/user-event";

describe(LeafAction.name, async () => {
  beforeEach(() => {
    cleanup();
  });
  it("Should match the snapshot", () => {
    const resp = render(<LeafAction />);
    expect(resp).toMatchSnapshot();
  });

  it("Should match the snapshot", async () => {
    const user = userEvent.setup();
    render(<LeafAction />);
    const actionToggle = screen.getByTestId("leaf-action-toggle");
    await user.click(actionToggle);
    await waitFor(() => {
      expect(screen.getByTestId("leaf-action-dropdown")).toBeInTheDocument();
    });
  });
});
