import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AttributeFields } from "../product/attribute-fields";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/form";
import React from "react";

const FormProvider = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) => {
  const form = useForm<{
    attributes: Array<{
      name: string | boolean | number;
      code: string;
      type: string;
    }>;
  }>({
    defaultValues: {
      attributes: [
        { name: "name", code: "value", type: "text" },
        { name: "name", code: "value", type: "url" },
        { name: 12, code: "PI", type: "number" },
        { name: true, code: "AVAIL", type: "boolean" },
        { name: "name", code: "value", type: "tag" },
      ],
    },
  });

  React.useEffect(() => {
    if (error) {
      // @ts-expect-error: correct
      form.setError("attributes[0].name", { message: error });
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
      <FormProvider>
        <AttributeFields />
      </FormProvider>,
    );
    expect(result).toMatchSnapshot();
  });

  it("should render", () => {
    const { container } = render(
      <FormProvider>
        <AttributeFields />
      </FormProvider>,
    );
    const nameInput = container.querySelector(
      'input[name="attributes[0].name"]',
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
  });

  it("should trigger error", () => {
    render(
      <FormProvider error={"Not valid"}>
        <AttributeFields />
      </FormProvider>,
    );
    const errorText = screen.getByText("Not valid");
    expect(errorText).toBeInTheDocument();
  });
});
