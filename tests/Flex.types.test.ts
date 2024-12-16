import { FlexBoxProps, FlexGridProps, FlexProps } from "@/Flex.types";

describe("Flex.types", () => {
  it("should support FlexBoxProps and FlexGridProps along with standard CSS props", () => {
    const flexBoxProps: FlexBoxProps = {
      alignItems: "center",
      flexDirection: "row",
      row: true,
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };
    const flexGridProps: FlexGridProps = {
      alignItems: "center",
      flexDirection: "row",
      row: true,
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: 2,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };

    expect(flexBoxProps).toBeDefined();
    expect(flexGridProps).toBeDefined();
  });

  it("should be typesafe against invalid x/y row values", () => {
    let xRow: FlexProps<"row">["x"];
    xRow = "left";
    xRow = "center";
    xRow = "right";
    xRow = "space-between";
    xRow = "space-around";
    xRow = "space-evenly";
    // @ts-expect-error
    xRow = "top";
    // @ts-expect-error
    xRow = "bottom";
    // @ts-expect-error
    xRow = "stretch";
    // @ts-expect-error
    xRow = "baseline";

    expect(xRow).toBeDefined();

    let yRow: FlexProps<"row">["y"];
    yRow = "top";
    yRow = "center";
    yRow = "bottom";
    yRow = "stretch";
    yRow = "baseline";
    // @ts-expect-error
    yRow = "left";
    // @ts-expect-error
    yRow = "right";
    // @ts-expect-error
    yRow = "space-between";
    // @ts-expect-error
    yRow = "space-around";
    // @ts-expect-error
    yRow = "space-evenly";

    expect(yRow).toBeDefined();
  });

  it("should be typesafe against invalid x/y column values", () => {
    let xColumn: FlexProps<"column">["x"];
    xColumn = "left";
    xColumn = "center";
    xColumn = "right";
    xColumn = "flex-start";
    xColumn = "flex-end";
    xColumn = "baseline";
    // @ts-expect-error
    xColumn = "top";
    // @ts-expect-error
    xColumn = "bottom";
    // @ts-expect-error
    xColumn = "space-between";
    // @ts-expect-error
    xColumn = "space-around";
    // @ts-expect-error
    xColumn = "space-evenly";

    expect(xColumn).toBeDefined();

    let yColumn: FlexProps<"column">["y"];
    yColumn = "top";
    yColumn = "center";
    yColumn = "bottom";
    yColumn = "flex-start";
    yColumn = "flex-end";
    yColumn = "space-between";
    yColumn = "space-around";
    yColumn = "space-evenly";
    // @ts-expect-error
    yColumn = "baseline";
    // @ts-expect-error
    yColumn = "left";
    // @ts-expect-error
    yColumn = "right";

    expect(yColumn).toBeDefined();
  });

  it("should support responsive style props", () => {
    const flexBoxProps: FlexBoxProps = {
      alignItems: ["center", "flex-start"],
      row: true,
      justifyContent: { xs: "center", sm: "flex-start" },
      flexWrap: "nowrap",
      gap: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };
    const flexGridProps: FlexGridProps = {
      alignItems: ["center", "flex-start"],
      flexDirection: "row",
      row: true,
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: 2,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };

    expect(flexBoxProps).toBeDefined();
    expect(flexGridProps).toBeDefined();
  });
});
