import CardContent from "@mui/material/CardContent";
import type { MenuProps as MuiMenuProps } from "@mui/material/Menu";
import Menu from "@mui/material/Menu";
import type { MenuListProps as MuiMenuListProps } from "@mui/material/MenuList";
import MenuList from "@mui/material/MenuList";
import { styled as muiStyled, styled } from "@mui/material/styles";
import { FlexBox, FlexColumnBox, FlexRowBox } from "@mui-flexy/v7";
import { type FlexBoxColumnProps, type FlexBoxProps } from "@mui-flexy/v7";
import type React from "react";
import { type ComponentProps, forwardRef, type PropsWithChildren } from "react";

const MuiMenu = Menu;
const MuiMenuList = MenuList;

type StyledListContainerProps = MuiMenuListProps & FlexBoxProps;

const StyledListContainer = muiStyled((props: StyledListContainerProps) => (
  <FlexBox component={MuiMenuList} {...props} />
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

const StyledSelectContainer = muiStyled(StyledListContainer, {
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
  menuProps: MuiMenuProps;
  menuListFlexProps?: MuiMenuListProps & FlexBoxColumnProps;
}>;

const StyledMenu = ({ children, id, menuProps, menuListFlexProps }: StyledMenuListProps) => {
  return (
    <StyledListContainer {...menuListFlexProps} column component="div">
      <MuiMenu component={FlexBox} id={id} {...menuProps}>
        {children}
      </MuiMenu>
    </StyledListContainer>
  );
};

type PropsOverrideProps = FlexBoxProps & {
  scale?: number;
};

const PropsOverrideDefaults = styled(
  (props: PropsOverrideProps) => <FlexBox row component="section" x="center" y="center" {...props} />,
  {
    shouldForwardProp: (prop) => !["scale"].includes(String(prop)),
  },
)<PropsOverrideProps>(({ theme, scale = 1 }) =>
  theme.unstable_sx({
    opacity: 0.95,
    transform: `scale(${scale})`,
    willChange: "transform, opacity",
  }),
);

const DefaultsOverrideProps = styled(
  (props: PropsOverrideProps) => <FlexBox {...props} column component="section" x="center" y="center" />,
  {
    shouldForwardProp: (prop) => !["scale"].includes(String(prop)),
  },
)<PropsOverrideProps>(({ theme, scale = 1 }) =>
  theme.unstable_sx({
    opacity: 0.95,
    transform: `scale(${scale})`,
    willChange: "transform, opacity",
  }),
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
