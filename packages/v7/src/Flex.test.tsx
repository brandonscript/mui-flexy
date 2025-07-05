import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

import { FlexBox } from "./Flex";

describe("FlexBox v7", () => {
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

  it("should render FlexBox with Grid props", () => {
    const { container } = render(
      <FlexBox size={6} offset={2}>
        Content
      </FlexBox>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render FlexBox with responsive props", () => {
    const { container } = render(
      <FlexBox row={[true, false]} x={["left", "center"]}>
        Content
      </FlexBox>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render FlexBox with component override", () => {
    const { container } = render(
      <FlexBox component="section" role="main">
        Content
      </FlexBox>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });
});
