import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "../layout";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  // no-unused-vars
  Sunflower: vi.fn(() => ({
    style: {
      fontFamily: "mocked",
    },
  })),
  // no-unused-vars
  Geist_Mono: vi.fn(() => ({
    style: {
      fontFamily: "mocked_2",
    },
  })),
}));

describe("RootLayout", () => {
  it("renders the RootLayout component", () => {
    const result = render(
      <RootLayout>
        <div>Hi</div>
      </RootLayout>,
    );
    expect(result).toMatchSnapshot();
  });
});
