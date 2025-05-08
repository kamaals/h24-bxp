import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import CategoryForm from "../category-form";
import ReduxStoreProvider from "@/components/providers/redux-store-provider";

const mockMutate = vi.fn();

vi.mock("@/lib/store/api/categoryService", () => ({
  useCreateCategoryMutation: vi.fn(() => [mockMutate]),
}));

describe(CategoryForm.name, async () => {
  beforeEach(() => {
    cleanup();
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

    const button = screen.getByTestId("loading-button");

    await waitFor(() => {
      const nameInput = container.querySelector(
        'input[value="T-Shits"]',
      ) as HTMLInputElement;
      expect(nameInput).toBeInTheDocument();
      fireEvent.click(button);
      const svg = container.querySelector(".animate-spin");
      expect(svg).toBeInTheDocument();
    });
  });
});
