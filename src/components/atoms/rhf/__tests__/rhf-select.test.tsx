import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import RHFSelect from "../rhf-select";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import React from "react";
import { SelectItem } from "@/components/atoms/select";

const FormProvider = ({
  children,
  value,
  error,
}: {
  children: React.ReactNode;
  value?: string;
  error?: string;
}) => {
  const form = useForm<{ name: string }>({
    defaultValues: { name: value },
  });

  React.useEffect(() => {
    if (error) {
      form.setError("name", { message: error });
    }
  }, [error, form]);

  return <Form {...form}>{children}</Form>;
};

describe(RHFSelect.name, () => {
  beforeAll(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const result = render(
      <FormProvider value={"Alpha"}>
        <RHFSelect name={"name"} label={"Name"}>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="tag">Tag</SelectItem>
        </RHFSelect>
      </FormProvider>,
    );
    expect(result).toMatchSnapshot();
  });

  it("should render", () => {
    const { container } = render(
      <FormProvider>
        <RHFSelect name={"name"} label={"Name"}>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="tag">Tag</SelectItem>
        </RHFSelect>
      </FormProvider>,
    );
    const nameInput = container.querySelector(
      'button[data-slot="select-trigger"]',
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
  });

  it("should trigger error", () => {
    render(
      <FormProvider error={"Not valid"}>
        <RHFSelect name={"name"} label={"Name"}>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="tag">Tag</SelectItem>
        </RHFSelect>
      </FormProvider>,
    );
    const errorText = screen.getByText("Not valid");
    expect(errorText).toBeInTheDocument();
  });
});
