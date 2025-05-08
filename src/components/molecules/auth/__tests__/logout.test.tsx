import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Logout from "../logout";
import { signOut } from "@/lib/client";

type SignOutOptions = {
  fetchOptions: {
    onSuccess: () => void;
  };
};

type SignOutFn = (args: SignOutOptions) => void;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/lib/client", () => ({
  signOut: vi.fn() as SignOutFn,
}));

describe("Logout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // @ts-expect-error: mocked
    vi.mocked(signOut).mockImplementation(({ fetchOptions }) => {
      if (fetchOptions?.onSuccess) {
        fetchOptions.onSuccess();
      }
      return Promise.resolve();
    });
    cleanup();
  });

  it("should render a logout button", () => {
    render(<Logout />);
    const logoutButton = screen.getByTestId("logout-btn");
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveTextContent("Logout");
  });

  it("should call signOut and navigate to login page when button is clicked", async () => {
    render(<Logout />);

    const logoutButton = screen.getByTestId("logout-btn");
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
