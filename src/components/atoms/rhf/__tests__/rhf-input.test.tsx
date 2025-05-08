import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import RHFInput from "../rhf-input";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import React from "react";

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

describe("RHFInput", () => {
  beforeAll(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const result = render(
      <FormProvider value={"Alpha"}>
        <RHFInput name={"name"} label={"Name"} />
      </FormProvider>,
    );
    expect(result).toMatchSnapshot();
  });

  it("should render", () => {
    const { container } = render(
      <FormProvider>
        <RHFInput name={"name"} label={"Name"} />
      </FormProvider>,
    );
    const nameInput = container.querySelector(
      'input[name="name"]',
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
  });

  it("should trigger error", () => {
    render(
      <FormProvider error={"Not valid"}>
        <RHFInput name={"name"} label={"Name"} />
      </FormProvider>,
    );
    const errorText = screen.getByText("Not valid");
    expect(errorText).toBeInTheDocument();
  });
});
