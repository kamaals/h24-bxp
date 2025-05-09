import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Icon from "../icon";
import { Eye, ShieldEllipsis } from "lucide-react";

const data = {
  id: "1",
  name: "Test",
  icon: Eye,
};

describe(Icon.name, () => {
  beforeEach(() => {
    cleanup();
  });

  it("Should render correctly for selected", () => {
    render(<Icon data={data} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("Should render correctly for selected", () => {
    render(
      <Icon
        data={{ ...data, selectedIcon: ShieldEllipsis }}
        isSelected={true}
      />,
    );
    expect(screen.getByTestId("selected-icon")).toBeInTheDocument();
  });

  it("Should render correctly for opened", () => {
    render(<Icon data={{ ...data, openIcon: ShieldEllipsis }} isOpen={true} />);
    expect(screen.getByTestId("open-icon")).toBeInTheDocument();
  });

  it("Should match the snapshot", () => {
    const resp = render(<Icon data={data} />);
    expect(resp).toMatchSnapshot();
  });
});
