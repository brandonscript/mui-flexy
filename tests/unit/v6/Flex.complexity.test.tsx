import { CardContent, Menu, MenuList, type MenuListProps, type MenuProps, styled } from "@mui/material";
import {
  FlexBox,
  type FlexBoxColumnProps,
  type FlexBoxProps,
  type FlexBoxRowProps,
  FlexColumnBox,
  FlexRowBox,
} from "@mui-flexy/v6";
import type * as React from "react";
import { type ComponentProps, forwardRef, type PropsWithChildren } from "react";

type StyledListContainerProps = MenuListProps & FlexBoxProps;

const StyledListContainer = styled((props: StyledListContainerProps) => (
  <FlexBox component={MenuList} {...props} />
))<StyledListContainerProps>(({ theme }) =>
  theme.unstable_sx({
    display: "block",
    padding: 0,
    margin: 0,
    "& .MuiMenuItem-root": {
      padding: theme.spacing(1, 2),
      margin: 0,
      borderRadius: theme.shape.borderRadius,
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: theme.palette.action.selected,
      },
      "&.Mui-disabled": {
        opacity: 0.5,
      },
    },
  }),
);
type StyledSelectContainerProps = FlexBoxColumnProps & {
  doNotFwdThisProp?: string;
};

const StyledSelectContainer = styled(StyledListContainer, {
  shouldForwardProp: (prop) => !["doNotFwdThisProp"].includes(String(prop)),
})<StyledSelectContainerProps>(({ theme, doNotFwdThisProp: _doNotFwdThisProp }) =>
  theme.unstable_sx({
    "& .MuiSelect-select:focus": {
      borderRadius: (theme) => theme.shape.borderRadius,
    },
    "& .MuiButton-root": {
      borderRadius: (theme) => theme.shape.borderRadius,
    },
    "& .MuiSelect-splitMenu": {
      borderRadius: (theme) => theme.shape.borderRadius,
    },
    "& .MuiSelect-splitMenu .MuiSelect-select": {
      borderRadius: (theme) => theme.shape.borderRadius,
    },
  }),
);

const StyledSelect = forwardRef<
  HTMLUListElement,
  ComponentProps<typeof StyledSelectContainer> & {
    button?: React.ReactNode;
  }
>(({ button, ...props }, ref) => {
  return (
    <StyledSelectContainer component={FlexBox} column {...props} ref={ref}>
      {button}
    </StyledSelectContainer>
  );
});
StyledSelect.displayName = "StyledSelect";

type StyledMenuListProps = PropsWithChildren<{
  id: string;
  menuProps: MenuProps;
  menuListFlexProps?: MenuListProps & FlexBoxColumnProps;
}>;

const StyledMenu = ({ children, id, menuProps, menuListFlexProps }: StyledMenuListProps) => {
  return (
    <StyledListContainer {...menuListFlexProps} column component="div">
      <Menu component={FlexBox} id={id} {...menuProps}>
        {children}
      </Menu>
    </StyledListContainer>
  );
};

// Ideally if you know this is a row FlexBox, you would use the FlexBoxRowProps type instead
// e.g type PropsOverrideProps = FlexBoxRowProps & { scale?: number };
const PropsOverrideDefaultsAgnostic = styled(
  // In lieu of using FlexBoxRowProps, you can ignore the strict type restrictions by using the agnostic prop
  (
    props: FlexBoxProps & {
      scale?: number;
    },
  ) => <FlexBox row component="section" x="center" y="center" {...props} agnostic />,
  {
    shouldForwardProp: (prop) => !["scale"].includes(String(prop)),
  },
)<
  FlexBoxProps & {
    scale?: number;
  }
>(({ theme, scale = 1 }) =>
  theme.unstable_sx({
    opacity: 0.95,
    transform: `scale(${scale})`,
    willChange: "transform, opacity",
  }),
);

const PropsOverrideDefaults = styled(
  // @ts-expect-error
  (props: FlexBoxProps & { scale?: number }) => <FlexBox row component="section" x="center" y="center" {...props} />,
  {
    shouldForwardProp: (prop) => !["scale"].includes(String(prop)),
  },
)<FlexBoxProps & { scale?: number }>(({ theme, scale = 1 }) =>
  theme.unstable_sx({
    opacity: 0.95,
    transform: `scale(${scale})`,
    willChange: "transform, opacity",
  }),
);
const _SpecifyOrientationWhenOverridingDefaults = (props: FlexBoxRowProps & { scale?: number }) => (
  <FlexRowBox component="section" x="center" y="center" {...props} />
);

const DefaultsOverrideProps = styled(
  // @ts-expect-error
  (props: FlexBoxProps & { scale?: number }) => <FlexBox {...props} column component="section" x="center" y="center" />,
  {
    shouldForwardProp: (prop) => !["scale"].includes(String(prop)),
  },
)<FlexBoxProps & { scale?: number }>(({ theme, scale = 1 }) =>
  theme.unstable_sx({
    opacity: 0.95,
    transform: `scale(${scale})`,
    willChange: "transform, opacity",
  }),
);

const _SpecifyOrientationWhenOverridingProps = (props: FlexBoxColumnProps & { scale?: number }) => (
  <FlexColumnBox {...props} component="section" x="center" y="center" />
);

describe("StyledMenu", () => {
  it("should render StyledSelectContainer with correct props", () => {
    const menuProps = {
      open: true,
      anchorEl: (() => {}) as unknown as HTMLElement,
    };
    const menuListFlexProps = {
      doNotFwdThisProp: "test",
    };

    expect(() => StyledMenu({ id: "test", menuProps, ...menuListFlexProps })).not.toThrow();
  });
});

describe("Flex[Orientation]Box integration", () => {
  it("allows CardContent to use all FlexBox variants as its component", () => {
    const AnyCard = () => (
      <CardContent component={FlexBox} x="center" y="center">
        <div />
      </CardContent>
    );
    const RowCard = () => (
      <CardContent component={FlexRowBox} x="center" y="center">
        <div />
      </CardContent>
    );
    const ColumnCard = () => (
      <CardContent component={FlexColumnBox} x="center" y="center">
        <div />
      </CardContent>
    );

    [AnyCard, RowCard, ColumnCard].forEach((factory) => expect(factory).toBeDefined());
  });
});

describe("FlexBox styled clobbering cases", () => {
  it("allows using agnostic prop to ignore orientation restrictions", () => {
    expect(
      <PropsOverrideDefaultsAgnostic id="props-override-defaults-agnostic">
        <div />
      </PropsOverrideDefaultsAgnostic>,
    ).toBeDefined();
  });
  it("allows styled FlexBox props to override defaults", () => {
    expect(
      <PropsOverrideDefaults id="props-override-defaults">
        <div />
      </PropsOverrideDefaults>,
    ).toBeDefined();
  });
  it("allows styled FlexBox defaults to supersede props", () => {
    expect(
      <DefaultsOverrideProps id="defaults-override-props">
        <div />
      </DefaultsOverrideProps>,
    ).toBeDefined();
  });
});

export default {};
