import type { CSSObject } from "@emotion/react";

import type { BaseFlexProps } from "./Flex.core.types";
import { mapFlexProps } from "./Flex.core.utils";

/** The theme surface needed by the class renderer, independent of MUI version. */
export interface FlexyTheme {
  // Only keys supplied by this theme are passed to up; adapters may narrow its key type.
  breakpoints: { keys: readonly string[]; up(key: never): string };
}

const globals = ["initial", "inherit", "unset", "revert", "revert-layer"];
export const flexClassValues = {
  display: [
    "flex",
    "inline-flex",
    "none",
    "block",
    "inline",
    "inline-block",
    "grid",
    "inline-grid",
    "contents",
    ...globals,
  ],
  flexDirection: ["row", "row-reverse", "column", "column-reverse", ...globals],
  justifyContent: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", ...globals],
  alignItems: ["flex-start", "flex-end", "center", "stretch", "baseline", ...globals],
  flexWrap: ["wrap", "nowrap", "wrap-reverse", ...globals],
} as const;

type LayoutProperty = keyof typeof flexClassValues;
type Layout = Partial<Record<LayoutProperty, unknown>>;
const properties = Object.keys(flexClassValues) as LayoutProperty[];
const labels: Record<LayoutProperty, string> = {
  display: "d",
  flexDirection: "dir",
  justifyContent: "j",
  alignItems: "a",
  flexWrap: "w",
};
const inputs = ["row", "column", "reverse", "direction", "flexDirection", "x", "y", "wrap", "display"] as const;
const token = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, (char) => `_${char.charCodeAt(0).toString(16)}_`);

export function getFlexClassConfig(theme: FlexyTheme) {
  const queries = theme.breakpoints.keys.map((key) => ({ key, query: theme.breakpoints.up(key as never) }));
  const signature = JSON.stringify(queries);
  // Two independent 32-bit accumulators keep names short and deterministic on server/client.
  let a = 2166136261;
  let b = 5381;
  for (let i = 0; i < signature.length; i++) {
    a = Math.imul(a ^ signature.charCodeAt(i), 16777619);
    b = Math.imul(b, 33) ^ signature.charCodeAt(i);
  }
  return { queries, signature, namespace: `${(a >>> 0).toString(36)}${(b >>> 0).toString(36)}` };
}
export type FlexClassConfig = ReturnType<typeof getFlexClassConfig>;

function classFor(property: LayoutProperty, value: string, config: FlexClassConfig, key?: string) {
  const shortValue = value.replace(/^flex-/, "").replace(/^space-/, "");
  const name =
    property === "flexDirection" && /^(row|column)(-reverse)?$/.test(value)
      ? value.replace("column", "col").replace("-reverse", "-rev")
      : `${labels[property]}-${shortValue.replace("-reverse", "-rev")}`;
  return `MuiFlex-${name}${key === undefined ? "" : `-${config.namespace}-${token(key)}`}`;
}

/** Finite property rules, never the Cartesian product of layout permutations. */
export function createFlexClassStyles(config: FlexClassConfig, includeBase = true) {
  const styles: CSSObject = {};
  const rules = (key?: string) => {
    const result: CSSObject = {};
    for (const property of properties) {
      for (const value of flexClassValues[property]) {
        // Base sheets from other Emotion caches can be inserted later in the document.
        // Responsive rules must beat those base rules regardless of insertion order.
        const root = key === undefined ? ".MuiFlex-root" : ".MuiFlex-root.MuiFlex-root";
        result[`${root}.${classFor(property, value, config, key)}`] = { [property]: value };
      }
    }
    return result;
  };
  if (includeBase) {
    // Zero specificity keeps system-mode display props authoritative, even if
    // another Emotion cache inserts this shared default after their styles.
    styles[":where(.MuiFlex-root)"] = { display: "flex" };
    Object.assign(styles, rules());
  }
  for (const { key, query } of config.queries) {
    styles[query] = { ...(styles[query] as CSSObject), ...rules(key) };
  }
  return styles;
}

const isResponsive = (value: unknown): value is Record<string, unknown> | unknown[] =>
  value !== null && typeof value === "object";

/** Resolve each breakpoint through the same scalar mapper used by system mode. */
export function mapFlexClassProps<P extends BaseFlexProps>(
  props: P,
  config: FlexClassConfig,
  theme: FlexyTheme,
  ref?: React.Ref<unknown> | null,
  componentName: "Box" | "Grid" | "Grid2" = "Box",
) {
  const evaluated = { ...props } as Record<string, unknown>;
  for (const input of inputs) {
    const value = evaluated[input];
    if (typeof value === "function") evaluated[input] = value(theme);
  }
  if (typeof evaluated.className === "function") evaluated.className = evaluated.className(theme);
  const state: Record<string, unknown> = {};
  for (const input of inputs) {
    const value = evaluated[input];
    if (!isResponsive(value)) state[input] = value;
  }
  const snapshots: { key?: string; layout: Layout }[] = [];
  const resolve = (): Layout => {
    const mapped = mapFlexProps(state as BaseFlexProps) as Record<string, unknown>;
    return Object.fromEntries(properties.map((property) => [property, mapped[property]]));
  };
  snapshots.push({ layout: resolve() });
  config.queries.forEach(({ key, query }, index) => {
    let changed = false;
    for (const input of inputs) {
      const value = evaluated[input];
      const next = Array.isArray(value)
        ? value[index]
        : isResponsive(value)
          ? (value as Record<string, unknown>)[key]
          : undefined;
      // Null entries are gaps: previous breakpoint values continue to apply.
      if (next !== null && next !== undefined) {
        state[input] = next;
        changed = true;
      }
    }
    if (changed) {
      const snapshot = { key, layout: resolve() };
      // A zero-width first breakpoint can use the same classes as scalar props.
      if (index === 0 && /min-width:\s*0(?:px|em|rem)\)/.test(query)) snapshots[0] = { layout: snapshot.layout };
      else snapshots.push(snapshot);
    }
  });

  // Use the mapper to preserve forwarding/stripping behavior, then consume layout styles.
  const mapped = mapFlexProps({ ...evaluated, ...state } as BaseFlexProps, ref, componentName) as Record<
    string,
    unknown
  >;
  const classes = [mapped.className as string];
  const fallback: Record<string, unknown> = {};
  for (const property of properties) {
    delete mapped[property];
    const values = snapshots.map(({ layout }) => layout[property]);
    const supported = values.every(
      (value) =>
        value === undefined ||
        (typeof value === "string" && (flexClassValues[property] as readonly string[]).includes(value)),
    );
    let previous: unknown;
    for (const { key, layout } of snapshots) {
      const current = layout[property];
      if (current === previous) continue;
      // Clear a previous axis alignment when a direction change leaves it unspecified.
      const value = current === undefined ? "initial" : current;
      // The root supplies the scalar default. Responsive transitions back to
      // flex still need a utility to override the preceding breakpoint.
      if (supported && property === "display" && key === undefined && value === "flex") {
        previous = current;
        continue;
      }
      if (supported) classes.push(classFor(property, value as string, config, key));
      else if (key === undefined) fallback[property] = value;
      else {
        const query = config.queries.find((entry) => entry.key === key)!.query;
        fallback[query] = { ...(fallback[query] as object), [property]: value };
      }
      previous = current;
    }
  }
  mapped.className = classes.join(" ");
  return { mapped, fallback };
}
