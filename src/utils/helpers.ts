import { ParentSection, Tool } from "src/utils/types";

export function createPath(tool: Tool): string {
  let path = "";
  let cur: Tool | ParentSection | null = tool;
  while (cur) {
    path = "/" + cur.path + path;
    cur = cur.parent;
  }
  return path;
}
