import { useTheme } from "@mui/material/styles";
import type { FlexyProviderProps } from "@mui-flexy/core";
import { FlexyStyleProvider } from "@mui-flexy/core";

export function FlexyProvider(props: FlexyProviderProps) {
  const theme = useTheme();
  return <FlexyStyleProvider {...props} theme={theme} />;
}

export type { FlexyProviderProps };
