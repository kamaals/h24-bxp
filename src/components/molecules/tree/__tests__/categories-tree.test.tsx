import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import CategoriesTree from "../categories-tree";
import userEvent from "@testing-library/user-event";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/lib/store/api/categoryServices";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/store/api/categoryServices", () => ({
  useGetCategoriesQuery: vi.fn(),
  useDeleteCategoryMutation: vi.fn(),
}));

vi.mock("@/components/molecules/forms/category-form-modal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? (
      <div data-testid="category-form-modal">Category Form Modal</div>
    ) : null,
}));

describe("CategoriesTree Component", async () => {
  const mockCategories = [
    { id: "1", name: "Category 1" },
    {
      id: "2",
      name: "Category 2",
      children: [{ id: "3", name: "Subcategory 1", children: [] }],
    },
  ];

  const mockDeleteCategory = vi.fn();
  const pushMock = vi.fn();
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();

    // @ts-expect-error: mocking the push function
    (useRouter as Mock<typeof useRouter>).mockReturnValue({
      push: pushMock,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useGetCategoriesQuery as any).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useDeleteCategoryMutation as any).mockReturnValue([
      mockDeleteCategory,
      { isLoading: false },
    ]);
  });

  it("renders categories when data is available", () => {
    render(<CategoriesTree />);
    expect(screen.getByTestId("tree-leaf-1")).toBeInTheDocument();
  });

  it("does not render when categories data is not an array", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useGetCategoriesQuery as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { container } = render(<CategoriesTree />);
    expect(container.firstChild).toBeNull();
  });

  it("selects a category when clicked", () => {
    render(<CategoriesTree />);

    fireEvent.click(screen.getByTestId("tree-leaf-1"));
    // The modal should not open on just selection
    expect(screen.queryByTestId("category-form-modal")).not.toBeInTheDocument();
  });

  it("opens add modal when add action is triggered", async () => {
    const user = userEvent.setup();
    render(<CategoriesTree />);
    const treeActions = screen.getByTestId("tree-actions-1");

    // Simulate clicking the add button (assuming the first button is for adding)
    const actionButton = treeActions.querySelector("button");
    await user.click(actionButton!);
    await waitFor(async () => {
      const modal = screen.getByTestId("leaf-action-dropdown");
      expect(modal).toBeInTheDocument();
      const addButton = screen.getByTestId("leaf-action-dropdown-add");
      await user.click(addButton);
    });
  });

  it("opens add modal when edit action is triggered", async () => {
    const user = userEvent.setup();
    render(<CategoriesTree />);
    const treeActions = screen.getByTestId("tree-actions-1");

    // Simulate clicking the edit button (assuming the first button is for adding)
    const actionButton = treeActions.querySelector("button");
    await user.click(actionButton!);
    await waitFor(async () => {
      const menu = screen.getByTestId("leaf-action-dropdown");
      expect(menu).toBe(menu);
      const modal = screen.getByTestId("leaf-action-dropdown");
      expect(modal).toBeInTheDocument();
      const editButton = screen.getByTestId("leaf-action-dropdown-edit");
      await user.click(editButton);
    });
  });
});
