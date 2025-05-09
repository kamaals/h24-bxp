import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import DashboardLayout from "../layout";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("@/lib/store/hooks", () => ({
  useAppSelector: vi.fn(),
}));

describe("Dashboard Layout ", () => {
  it("Should match the snapshot", () => {
    const result = render(
      <DashboardLayout breadcrumb={<div>Breadcrumb</div>}>
        <div>Test</div>
      </DashboardLayout>,
    );
    expect(result).toMatchSnapshot();
  });
});
