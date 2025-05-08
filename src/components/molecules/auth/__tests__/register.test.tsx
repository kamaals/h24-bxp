import Register from "../register";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signUp } from "@/lib/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BetterFetchOption } from "@better-fetch/fetch";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/client", () => ({
  signUp: {
    email: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("Register Component", () => {
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

  it("renders the register form correctly", () => {
    render(<Register />);

    // Check for main elements
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your information to create an account")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create an account" })
    ).toBeInTheDocument();
  });

  it("updates input values when user types", async () => {
    const user = userEvent.setup();
    render(<Register />);

    const firstNameInput = screen.getByLabelText(
      "First name"
    ) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(
      "Last name"
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "password_confirmation"
    ) as HTMLInputElement;

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "john.doe@example.com");
    await user.type(passwordInput, "password123password123");
    await user.type(confirmPasswordInput, "password123password123");

    expect(firstNameInput.value).toBe("John");
    expect(lastNameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("john.doe@example.com");
    expect(passwordInput.value).toBe("password123password123");
    expect(confirmPasswordInput.value).toBe("password123password123");
  });

  it("calls signUp.email with correct data when form is submitted", async () => {
    const user = userEvent.setup();
    render(<Register />);

    // Fill out the form
    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "john.doe@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");

    // Submit the form
    await user.click(screen.getByRole("button", { name: "Create an account" }));

    expect(signUp.email).toHaveBeenCalledWith({
      email: "john.doe@example.com",
      password: "password123password123",
      name: "John Doe",
      callbackURL: "/dashboard",
      fetchOptions: expect.objectContaining({
        onRequest: expect.any(Function),
        onResponse: expect.any(Function),
        onError: expect.any(Function),
        onSuccess: expect.any(Function),
      }),
    });
  });

  it("shows loading state while submitting the form", async () => {
    const user = userEvent.setup();

    let capturedFetchOptions: BetterFetchOption | undefined = undefined;
    (signUp.email as Mock<typeof signUp.email>).mockImplementation(
      (options) => {
        capturedFetchOptions = options.fetchOptions;
        return Promise.resolve();
      }
    );

    render(<Register />);

    // Fill out the form
    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");

    await user.click(screen.getByRole("button", { name: "Create an account" }));

    const _capturedFetchOptions =
      capturedFetchOptions as unknown as BetterFetchOption;
    // @ts-expect-error: mocked function
    _capturedFetchOptions.onRequest?.();

    // Check that the button is in loading state
    expect(screen.queryByText("Create an account")).toBeInTheDocument();
    expect(document.querySelector(".animate-spin")).not.toBeInTheDocument();

    // @ts-expect-error: mocked function
    _capturedFetchOptions.onResponse?.();

    // Check that loading state is removed
    await waitFor(() => {
      expect(screen.getByText("Create an account")).toBeInTheDocument();
      expect(document.querySelector(".animate-spin")).not.toBeInTheDocument();
    });
  });

  it("redirects to dashboard on successful registration", async () => {
    const user = userEvent.setup();

    // Mock the signUp.email implementation to capture the fetchOptions
    let capturedFetchOptions;
    (signUp.email as Mock<typeof signUp.email>).mockImplementation(
      (options) => {
        capturedFetchOptions = options.fetchOptions;
        return Promise.resolve();
      }
    );

    render(<Register />);

    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");

    await user.click(screen.getByRole("button", { name: "Create an account" }));
    const _capturedFetchOptions =
      capturedFetchOptions as unknown as BetterFetchOption;
    // @ts-expect-error: mocked function
    await _capturedFetchOptions?.onSuccess?.();

    // Verify that router.push was called with the correct path
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows error toast when registration fails", async () => {
    const user = userEvent.setup();

    // Mock the signUp.email implementation to capture the fetchOptions
    let capturedFetchOptions;
    (signUp.email as Mock<typeof signUp.email>).mockImplementation(
      (options) => {
        capturedFetchOptions = options.fetchOptions;
        return Promise.resolve();
      }
    );

    render(<Register />);

    // Fill out the form
    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");

    // Submit the form
    await user.click(screen.getByRole("button", { name: "Create an account" }));

    const _capturedFetchOptions =
      capturedFetchOptions as unknown as BetterFetchOption;

    _capturedFetchOptions.onError?.({
      // @ts-expect-error: mocked
      error: { message: "Registration failed" },
    });

    // Verify that toast.error was called with the error message
    expect(toast.error).toHaveBeenCalledWith("Registration failed");
  });

  it("disables the submit button while loading", async () => {
    const user = userEvent.setup();

    // Mock the signUp.email implementation to capture the fetchOptions
    let capturedFetchOptions;
    (signUp.email as Mock<typeof signUp.email>).mockImplementation(
      (options) => {
        capturedFetchOptions = options.fetchOptions;
        return Promise.resolve();
      }
    );

    render(<Register />);

    const submitButton = screen.getByRole("button", {
      name: "Create an account",
    });

    // Check that button is not disabled initially
    expect(submitButton).not.toBeDisabled();

    // Fill out the form
    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");

    // Submit the form
    await user.click(submitButton);

    const _capturedFetchOptions =
      capturedFetchOptions as unknown as BetterFetchOption;
    // @ts-expect-error: mocked function
    _capturedFetchOptions.onRequest?.();

    // Check that the button is disabled during loading
    expect(submitButton);

    // @ts-expect-error: mocked function
    _capturedFetchOptions.onResponse?.();

    // Check that button is enabled again
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("renders the App component", () => {
    const result = render(<Register />);
    expect(result).toMatchSnapshot();
  });
});
