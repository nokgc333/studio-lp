import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./container";

describe("Container", () => {
  it("holds its children", () => {
    const { container } = render(
      <Container>
        <p>inside</p>
      </Container>,
    );

    expect(container.querySelector("div p")).toHaveTextContent("inside");
  });

  it("centres the content with side padding", () => {
    const { container } = render(<Container />);

    expect(container.firstElementChild).toHaveClass("mx-auto", "px-5");
  });

  it("is 1040px wide by default and narrows to 575px on small screens", () => {
    const { container } = render(<Container />);

    expect(container.firstElementChild).toHaveClass(
      "max-w-[1040px]",
      "le768:max-w-[575px]",
    );
  });

  it("is 1320px wide in the wide variant", () => {
    const { container } = render(<Container width="wide" />);

    expect(container.firstElementChild).toHaveClass(
      "max-w-[1320px]",
      "le768:max-w-[575px]",
    );
  });

  it("keeps classes given by the caller", () => {
    const { container } = render(<Container className="extra" />);

    expect(container.firstElementChild).toHaveClass("extra", "mx-auto");
  });
});
