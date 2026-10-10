import type { ComponentProps } from "react";

type ContainerWidth = "default" | "wide";

type ContainerProps = ComponentProps<"div"> & {
  /** `default` is 1040px wide, `wide` is 1320px. Both narrow to 575px on small screens. */
  width?: ContainerWidth;
};

const WIDTH_CLASS: Record<ContainerWidth, string> = {
  default: "max-w-[1040px] le768:max-w-[575px]",
  wide: "max-w-[1320px] le768:max-w-[575px]",
};

/** Centres its content and keeps it from growing wider than the page grid. */
export function Container({
  width = "default",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-5 ${WIDTH_CLASS[width]} ${className}`.trim()}
      {...props}
    />
  );
}
