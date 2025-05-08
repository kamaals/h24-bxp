import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "../page";

describe("RootLayout", () => {
  it("renders the RootLayout component", () => {
    const result = render(<HomePage />);
    expect(result).toMatchSnapshot();
  });
});
