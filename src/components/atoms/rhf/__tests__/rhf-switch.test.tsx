import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import RHFSwitch from "../rhf-switch";
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

describe(RHFSwitch.name, () => {
  beforeAll(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const result = render(
      <FormProvider value={"Alpha"}>
        <RHFSwitch name={"name"} label={"Name"} />
      </FormProvider>,
    );
    expect(result).toMatchSnapshot();
  });

  it("should render", () => {
    const { container } = render(
      <FormProvider>
        <RHFSwitch name={"name"} label={"Name"} />
      </FormProvider>,
    );
    const nameInput = container.querySelector(
      'button[data-state="unchecked"]',
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
  });

  it("should trigger error", () => {
    render(
      <FormProvider error={"Not valid"}>
        <RHFSwitch name={"name"} label={"Name"} />
      </FormProvider>,
    );
    const errorText = screen.getByText("Not valid");
    expect(errorText).toBeInTheDocument();
  });
});
