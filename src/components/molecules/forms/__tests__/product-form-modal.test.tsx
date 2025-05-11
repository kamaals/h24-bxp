import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import ProductFormModal from "../product/product-form-modal";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/molecules/forms/product/product-form";

const mockMutate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/store/api/categoryService", () => ({
  useCreateCategoryMutation: vi.fn(() => [mockMutate]),
}));

describe(ProductFormModal.name, async () => {
  const pushMock = vi.fn();
  beforeEach(() => {
    cleanup();
    // @ts-expect-error: mocking the push function
    (useRouter as Mock<typeof useRouter>).mockReturnValue({
      push: pushMock,
    });
  });

  it("should match snapshot", () => {
    const resp = render(
      <ReduxStoreProvider user={null}>
        <ProductForm categoryId={"0645"} />
      </ReduxStoreProvider>,
    );

    expect(resp).matchSnapshot();
  });
});
