import type { ComponentProps } from "react";

const BASE_CLASS =
  "text-center text-[32px] leading-[1.448125] font-bold tracking-[0.1em] le768:text-[22px] le768:leading-[1.448181818]";

/** The heading that opens each section. */
export function SectionTitle({
  className = "",
  ...props
}: ComponentProps<"h2">) {
  return <h2 className={`${BASE_CLASS} ${className}`.trim()} {...props} />;
}
