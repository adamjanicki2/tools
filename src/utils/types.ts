import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ParentSection = {
  name: string;
  path: string;
  parent: ParentSection | null;
};

export type Tool = {
  name: string;
  path: string;
  description: string;
  icon: IconDefinition;
  parent: ParentSection;
  Component: () => JSX.Element;
};
