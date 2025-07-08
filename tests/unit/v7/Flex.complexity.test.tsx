import type { MenuProps as MuiMenuProps } from "@mui/material/Menu";
import Menu from "@mui/material/Menu";
import type { MenuListProps as MuiMenuListProps } from "@mui/material/MenuList";
import MenuList from "@mui/material/MenuList";
import { styled as muiStyled } from "@mui/material/styles";
import { FlexBox } from "@mui-flexy/v7";
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

export default {};
