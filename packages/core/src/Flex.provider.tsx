import { __unsafe_useEmotionCache, ClassNames, Global } from "@emotion/react";
import type { ReactElement, ReactNode } from "react";
import { cloneElement, createContext, useContext, useMemo } from "react";

import type { FlexyTheme } from "./Flex.classes";
import { createFlexClassStyles, getFlexClassConfig, mapFlexClassProps } from "./Flex.classes";
import type { BaseFlexProps, FlexStyling } from "./Flex.core.types";
import { mapFlexProps } from "./Flex.core.utils";

export interface FlexyProviderProps {
  children?: ReactNode;
  /** Existing MUI system rendering is the default. */
  styling?: FlexStyling;
}

type StyleContext = {
  styling: FlexStyling;
  theme: FlexyTheme;
  config: ReturnType<typeof getFlexClassConfig>;
  cache: ReturnType<typeof __unsafe_useEmotionCache>;
};
const FlexyContext = createContext<StyleContext | undefined>(undefined);

/** Version adapters supply their own MUI theme to avoid crossing theme contexts. */
export function FlexyStyleProvider({
  children,
  styling = "system",
  theme,
}: FlexyProviderProps & { theme: FlexyTheme }) {
  const parent = useContext(FlexyContext);
  const cache = __unsafe_useEmotionCache();
  const config = useMemo(() => getFlexClassConfig(theme), [theme]);
  const sharesCache = parent !== undefined && parent.cache === cache;
  const styles = useMemo(() => createFlexClassStyles(config, !sharesCache), [config, sharesCache]);
  const value = useMemo(() => ({ styling, theme, config, cache }), [styling, theme, config, cache]);
  const inheritedStyles = parent?.config.signature === config.signature && parent.cache === cache;
  return (
    <FlexyContext.Provider value={value}>
      {!inheritedStyles && <Global styles={styles} />}
      {children}
    </FlexyContext.Provider>
  );
}

/** The version-specific normalizer moves MUI system props into sx. */
export function useFlexProps<P extends BaseFlexProps = BaseFlexProps, R = Record<string, unknown>>(
  props: P,
  ref: React.Ref<unknown> | null | undefined,
  componentName: "Box" | "Grid" | "Grid2",
  normalize: (props: Record<string, unknown>) => Record<string, unknown>,
): R {
  const context = useContext(FlexyContext);
  const mode = props.styling ?? context?.styling ?? "system";
  if (mode === "system") return mapFlexProps<P, R>(props, ref, componentName);
  if (!context) throw new Error('Mui Flexy: styling="classes" requires a FlexyProvider inside your ThemeProvider.');
  const { mapped, fallback } = mapFlexClassProps(props, context.config, context.theme, ref, componentName);
  const normalized = normalize(mapped);
  const sx = normalized.sx;
  const entries = [fallback, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])];
  // Shared utility selectors beat Grid defaults; explicit sx beats both. No !important.
  normalized.sx = entries.filter(Boolean).map((entry) => (theme: { unstable_sx: (sx: unknown) => unknown }) => ({
    "&.MuiFlex-root.MuiFlex-root.MuiFlex-root": theme.unstable_sx(entry),
  }));
  return normalized as R;
}

/** MUI styled wrappers may consume sx before forwarding props to Flexy. Raise their
 * registered styles as well, so their sx declarations retain normal override priority.
 * ClassNames registers each distinct style once in the active Emotion cache.
 */
export function FlexyClassOverrides({ children }: { children: ReactElement<{ className?: string }> }) {
  const cache = __unsafe_useEmotionCache();
  const names = (children.props.className ?? "").split(/\s+/);
  if (!names.some((name) => /^MuiFlex-(?:d-|dir-|row(?:-|$)|col(?:-|$)|j-|a-|w-)/.test(name)) || !cache)
    return children;
  const inherited = names.filter((name) => cache.registered[name] !== undefined);
  if (!inherited.length) return children;
  const cssText = inherited.map((name) => cache.registered[name]).join(";");
  const remaining = names.filter((name) => !inherited.includes(name));
  return (
    <ClassNames>
      {({ css }) =>
        cloneElement(children, {
          className: [...remaining, css(`&.MuiFlex-root.MuiFlex-root.MuiFlex-root{${cssText}}`)].join(" "),
        })
      }
    </ClassNames>
  );
}
