import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

import { FlexBox } from "./Flex";

describe("FlexBox v5", () => {
  it("should render basic FlexBox", () => {
    const { container } = render(<FlexBox>Content</FlexBox>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render FlexBox with row orientation", () => {
    const { container } = render(<FlexBox row>Content</FlexBox>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render FlexBox with column orientation", () => {
    const { container } = render(<FlexBox column>Content</FlexBox>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render FlexBox with x and y alignment", () => {
    const { container } = render(
      <FlexBox x="center" y="center">
        Content
      </FlexBox>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render FlexBox with custom sx", () => {
    const { container } = render(<FlexBox sx={{ backgroundColor: "red" }}>Content</FlexBox>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
