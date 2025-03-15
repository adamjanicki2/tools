import {
  faCalendar,
  faFileCode,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import CodePrettifier from "src/pages/tools/CodePrettifier";
import UnixConverter from "src/pages/tools/UnixConverter";
import type { Tool, ParentSection } from "src/utils/types";

const codeSection: ParentSection = {
  name: "Code Development",
  path: "code",
  parent: null,
};

const imageSection: ParentSection = {
  name: "Images & Visuals",
  path: "image",
  parent: null,
};

export const tools: readonly Tool[] = [
  {
    name: "Code Prettifier",
    path: "prettifier",
    description:
      "A code formatting tool to nicely arrange spaces and indentations in a variety of preset languages.",
    icon: faFileCode, // can also use faCode?
    parent: codeSection,
    Component: CodePrettifier,
  },
  {
    name: "Unix Converter",
    path: "unix",
    description:
      "Switching between unix timestamps and human readable dates has been a necessity to me multiple times, so I made this.",
    icon: faCalendar,
    parent: codeSection,
    Component: UnixConverter,
  },
  {
    name: "Text to Image",
    path: "text-to-image",
    description:
      "Unlike whatever crazy AI thing you're thinking of, this is a simple tool that converts text to a PNG.",
    icon: faImage,
    parent: imageSection,
    Component: UnixConverter,
  },
];
