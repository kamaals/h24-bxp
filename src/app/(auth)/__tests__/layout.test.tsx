import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import AuthLayout from "../layout";
import { LogIn } from "lucide-react";

describe("Auth Layout", () => {
  it("Should render AuthLayout Correctly", () => {
    const result = render(
      <AuthLayout>
        <LogIn />
      </AuthLayout>
    );
    expect(result).toMatchSnapshot();
  });
});
