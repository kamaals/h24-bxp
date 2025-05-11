import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
  type Mock,
} from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import Login from "../login";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("@/lib/client", () => ({
  signIn: {
    email: vi.fn(),
  },
}));

describe("Login", async () => {
  const pushMock = vi.fn();
  beforeEach(() => {
    cleanup();
    // @ts-expect-error: mocking the push function
    (useRouter as Mock<typeof useRouter>).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should match with snapshot", () => {
    const result = render(<Login />);
    expect(result).toMatchSnapshot();
  });

  it("Should trigger login", () => {
    render(<Login />);
    const button = screen.getAllByTestId("loading-button");
    button[0].click();
  });

  it("Should updates input values when user types", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;

    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, "john.doe@example.com");
    await user.type(passwordInput, "password123password123");

    expect(emailInput.value).toBe("john.doe@example.com");
    expect(passwordInput.value).toBe("password123password123");
  });

  it("Should trigger login", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const loginBtn = screen.getByTestId("loading-button") as HTMLInputElement;

    await user.type(emailInput, "john.doe@example.com");
    await user.type(passwordInput, "password123password123");

    await user.click(loginBtn);
    waitFor(() => {
      const loader = screen.getByTestId("loader") as HTMLInputElement;
      expect(loader).toBeInTheDocument();
    });
  });
});
