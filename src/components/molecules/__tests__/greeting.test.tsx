import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { UserGreet, AnonGreet, NavLoggedIn, NavLoggedOut } from "../greeting";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe(UserGreet.name, () => {
  it("should match the snapshot", () => {
    const result = render(<UserGreet />);
    expect(result).toMatchSnapshot();
  });
});

describe(AnonGreet.name, () => {
  it("should match the snapshot", () => {
    const result = render(<AnonGreet />);
    expect(result).toMatchSnapshot();
  });
});

describe(NavLoggedIn.name, () => {
  it("should match the snapshot", () => {
    const result = render(<NavLoggedIn />);
    expect(result).toMatchSnapshot();
  });
});

describe(NavLoggedOut.name, () => {
  it("should match the snapshot", () => {
    const result = render(<NavLoggedOut />);
    expect(result).toMatchSnapshot();
  });
});
