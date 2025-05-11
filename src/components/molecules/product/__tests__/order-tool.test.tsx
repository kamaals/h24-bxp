import { describe, expect, it, beforeAll, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import OrderTool, { OrderButton } from "../order-tool";
import React from "react";
import userEvent from "@testing-library/user-event";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";

const onChange = vi.fn();

describe(OrderButton.name, () => {
  beforeAll(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const result = render(
      <OrderButton onChange={onChange} order={"asc"} label={"name"} />,
    );
    expect(result).toMatchSnapshot();
  });

  it("Should trigger click up", async () => {
    const user = userEvent.setup();
    beforeAll(() => {
      cleanup();
    });
    render(<OrderButton onChange={onChange} order={"desc"} label={"name"} />);
    const upButton = screen.getAllByTestId("order-up-button");
    await user.click(upButton[0]);
    await waitFor(() => {
      expect(onChange).toBeCalled();
    });
  });

  it("Should trigger click down", async () => {
    const user = userEvent.setup();
    beforeAll(() => {
      cleanup();
    });
    render(<OrderButton onChange={onChange} order={"asc"} label={"name"} />);
    const upButton = screen.getAllByTestId("order-down-button");
    await user.click(upButton[0]);
    await waitFor(() => {
      expect(onChange).toBeCalled();
    });
  });
});

describe(OrderTool.name, () => {
  beforeAll(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const result = render(
      <ReduxStoreProvider user={null}>
        <OrderTool />
      </ReduxStoreProvider>,
    );
    expect(result).toMatchSnapshot();
  });

  it("Should trigger click down in composed", async () => {
    const user = userEvent.setup();
    beforeAll(() => {
      cleanup();
    });
    render(<OrderButton onChange={onChange} order={"asc"} label={"name"} />);
    const downButton = screen.getAllByTestId("order-down-button");
    await user.click(downButton[0]);
    await waitFor(async () => {
      expect(onChange).toBeCalled();
      const upButton = screen.getAllByTestId("order-up-button");
      await user.click(upButton[0]);
    });
  });
});
