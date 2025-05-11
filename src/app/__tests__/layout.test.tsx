import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "../layout";
import { vi } from "vitest";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";

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
      <ReduxStoreProvider user={null}>
        <RootLayout>
          <div>Hi</div>
        </RootLayout>
      </ReduxStoreProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
