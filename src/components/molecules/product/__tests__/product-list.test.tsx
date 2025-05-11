import { describe, expect, it, beforeAll, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import ProductList from "../product-list";
import React from "react";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";
import { SidebarProvider } from "@/components/molecules/sidebar";
import { useGetProductsQuery } from "@/lib/store/api/productServices";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

vi.mock("@/lib/store/api/productServices", async (importOriginal) => ({
  ...(await importOriginal()),
  useGetProductsQuery: vi.fn(),
}));

describe(ProductList.name, () => {
  beforeAll(() => {
    cleanup();
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useGetProductsQuery as any).mockReturnValue({
      data: MOCK_PRODUCTS,
      isLoading: false,
      error: null,
    });
  });

  it("should match the snapshot", () => {
    const result = render(
      <ReduxStoreProvider user={null}>
        <SidebarProvider>
          <ProductList />
        </SidebarProvider>
      </ReduxStoreProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
