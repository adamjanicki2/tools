import type { IconType } from "@adamjanicki/ui/types/icon";
import type React from "react";

export type ParentSection = {
  name: string;
  path: string;
  parent: ParentSection | null;
};

export type Tool = {
  name: string;
  path: string;
  description: string;
  icon: IconType;
  parent: ParentSection;
  Component: () => React.JSX.Element;
};
