import { describe, expect, beforeEach, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Attribute from "../attribute";
import React from "react";

describe(Attribute.name, () => {
  beforeEach(() => {
    cleanup();
  });
  it("should match the snapshot", () => {
    const result = render(
      <Attribute attribute={{ name: "Foo", code: "DD", type: "text" }} />,
    );
    expect(result).toMatchSnapshot();
  });

  it("should render text", () => {
    render(<Attribute attribute={{ name: "Foo", code: "DD", type: "text" }} />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  it("should render tag", () => {
    render(
      <Attribute attribute={{ name: "shirt", code: "DD", type: "tag" }} />,
    );
    expect(screen.getByText("tag")).toBeInTheDocument();
  });

  it("should render boolean", () => {
    render(
      <Attribute attribute={{ name: "true", code: "DD", type: "boolean" }} />,
    );
    expect(screen.getByText("boolean")).toBeInTheDocument();
  });

  it("should render number", () => {
    render(
      <Attribute attribute={{ name: "123", code: "DD", type: "number" }} />,
    );
    expect(screen.getByText("number")).toBeInTheDocument();
  });

  it("should render url", () => {
    render(
      <Attribute
        attribute={{ name: "http:://apb.ae", code: "DD", type: "url" }}
      />,
    );
    expect(screen.getByText("url")).toBeInTheDocument();
  });
});
