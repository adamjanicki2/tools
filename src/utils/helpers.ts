import type { ParentSection, Tool } from "src/utils/types";

export function createPath(tool: Tool): string {
  let path = "";
  let cur: Tool | ParentSection | null = tool;
  while (cur) {
    path = "/" + cur.path + path;
    cur = cur.parent;
  }
  return path;
}

export function randomElement<T>(
  arr: T[],
  predicate?: (val: T) => boolean
): T | undefined {
  let idx = Math.floor(Math.random() * arr.length);
  while (predicate && !predicate(arr[idx])) {
    idx = Math.floor(Math.random() * arr.length);
  }

  return arr[idx];
}
