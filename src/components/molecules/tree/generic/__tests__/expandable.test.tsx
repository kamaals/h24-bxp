import { describe, it, expect, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { ExpandableContent, ExpandableTrigger } from "../expandable";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";

describe(ExpandableContent.name, () => {
  beforeEach(() => {
    cleanup();
  });

  it("Should render correctly for close", () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value={"item-1"}>
          <ExpandableContent>
            <div data-testid="action">Action</div>
          </ExpandableContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(
      container.querySelector('div[data-state="closed"]'),
    ).toBeInTheDocument();
  });

  it("Should render correctly for open", () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value={"item-1"} data-state="open">
          <ExpandableTrigger>Open</ExpandableTrigger>
          <ExpandableContent>
            <div data-testid="action">Action</div>
          </ExpandableContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(
      container.querySelector('div[data-state="open"]'),
    ).toBeInTheDocument();
  });

  it("Should match the snapshot", () => {
    const resp = render(
      <Accordion type="single" collapsible>
        <AccordionItem value={"item-1"}>
          <ExpandableTrigger>Open</ExpandableTrigger>
          <ExpandableContent>
            <div data-testid="action">Action</div>
          </ExpandableContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(resp).toMatchSnapshot();
  });
});
