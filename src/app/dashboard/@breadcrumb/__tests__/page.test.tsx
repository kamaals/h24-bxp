import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BreadcrumbSlot from "../page";

describe(BreadcrumbSlot.name, () => {
  it("renders the BreadcrumbSlot correctly", () => {
    const result = render(<BreadcrumbSlot />);
    expect(result).toMatchSnapshot();
  });
});
