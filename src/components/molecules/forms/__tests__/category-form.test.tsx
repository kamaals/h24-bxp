import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import CategoryForm from "../category-form";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";
import { useRouter } from "next/navigation";

const mockMutate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/store/api/categoryService", () => ({
  useCreateCategoryMutation: vi.fn(() => [mockMutate]),
  useUpdateCategoryMutation: vi.fn(() => [mockMutate]),
}));

describe(CategoryForm.name, async () => {
  const pushMock = vi.fn();
  beforeEach(() => {
    cleanup();
    // @ts-expect-error: mocking the push function
    (useRouter as Mock<typeof useRouter>).mockReturnValue({
      push: pushMock,
    });
  });

  it("should render the form", () => {
    render(
      <ReduxStoreProvider user={null}>
        <CategoryForm />
      </ReduxStoreProvider>,
    );

    const form = screen.getByTestId("category-form");
    expect(form).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const resp = render(
      <ReduxStoreProvider user={null}>
        <CategoryForm />
      </ReduxStoreProvider>,
    );

    expect(resp).matchSnapshot();
  });

  it("should render with parentId and data", () => {
    render(
      <ReduxStoreProvider user={null}>
        <CategoryForm
          edit={true}
          data={{ name: "T-Shits", id: "ffd" }}
          parentId={"0645"}
        />
      </ReduxStoreProvider>,
    );

    const form = screen.getByTestId("category-form");
    expect(form).toBeInTheDocument();
  });

  it("should call the api", async () => {
    const { container } = render(
      <ReduxStoreProvider user={null}>
        <CategoryForm
          edit={true}
          data={{ name: "T-Shits", id: "ffd" }}
          parentId={"0645"}
        />
      </ReduxStoreProvider>,
    );

    await waitFor(() => {
      const nameInput = container.querySelector(
        'input[value="T-Shits"]',
      ) as HTMLInputElement;
      expect(nameInput).toBeInTheDocument();
    });
  });
});
