import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
  type Mock,
} from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
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

  it("Should renders the login form with all fields", () => {
    render(<Login />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your email below to login to your account")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("Should match with snapshot", () => {
    const result = render(<Login />);
    expect(result).toMatchSnapshot();
  });

  it("Should trigger login", () => {
    render(<Login />);
    const button = screen.getAllByTestId("login-btn");
    button[0].click();
  });

  it("Should updates input values when user types", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const rememberInput = screen.getByTestId("remember") as HTMLInputElement;

    await user.type(emailInput, "john.doe@example.com");
    await user.type(passwordInput, "password123password123");
    await user.type(rememberInput, "rememberMe");

    expect(emailInput.value).toBe("john.doe@example.com");
    expect(passwordInput.value).toBe("password123password123");
    expect(rememberInput.value).toBe("on");
  });

  it("Should trigger login", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    const rememberInput = screen.getByTestId("remember") as HTMLInputElement;
    const loginBtn = screen.getByTestId("login-btn") as HTMLInputElement;

    await user.type(emailInput, "john.doe@example.com");
    await user.type(passwordInput, "password123password123");
    await user.type(rememberInput, "rememberMe");

    await user.click(loginBtn);

    const loader = screen.getByTestId("loader") as HTMLInputElement;
    expect(loader).toBeInTheDocument();
  });
});
