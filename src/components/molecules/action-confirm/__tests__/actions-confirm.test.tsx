import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import ActionConfirm from "../action-confirm";
import userEvent from "@testing-library/user-event";

describe(ActionConfirm.name, async () => {
  beforeAll(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const result = render(<ActionConfirm />);
    expect(result).toMatchSnapshot();
  });

  it("Should click trigger", async () => {
    const user = userEvent.setup();
    render(<ActionConfirm />);
    const btn = screen.getAllByTestId("action-confirm-trigger");
    await waitFor(async () => {
      await user.click(btn[0]);
      const okButton = screen.getByTestId("action-confirm-ok");
      expect(okButton).toBeInTheDocument();
      await user.click(okButton);
    });
  });

  it("Should click trigger cancel", async () => {
    const user = userEvent.setup();
    render(<ActionConfirm />);
    const btn = screen.getAllByTestId("action-confirm-trigger");
    await waitFor(async () => {
      await user.click(btn[0]);
      const okButton = screen.getByTestId("action-confirm-cancel");
      expect(okButton).toBeInTheDocument();
      await user.click(okButton);
    });
  });
});
