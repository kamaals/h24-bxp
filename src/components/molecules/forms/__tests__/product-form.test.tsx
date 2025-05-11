import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ProductForm from "../product/product-form";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";
import { useRouter } from "next/navigation";

const mockMutate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/store/api/categoryService", () => ({
  useCreateCategoryMutation: vi.fn(() => [mockMutate]),
}));

describe(ProductForm.name, async () => {
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
        <ProductForm categoryId={"0645"} />
      </ReduxStoreProvider>,
    );

    const form = screen.getByTestId("product-form");
    expect(form).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const resp = render(
      <ReduxStoreProvider user={null}>
        <ProductForm categoryId={"0645"} />
      </ReduxStoreProvider>,
    );

    expect(resp).matchSnapshot();
  });

  it("should render with parentId and data", () => {
    render(
      <ReduxStoreProvider user={null}>
        <ProductForm
          edit={true}
          data={{
            name: "T-Shits",
            id: "ffd",
            categoryId: "wew",
            attributes: [],
          }}
          categoryId={"0645"}
        />
      </ReduxStoreProvider>,
    );

    const form = screen.getByTestId("product-form");
    expect(form).toBeInTheDocument();
  });
});
