import fs from "node:fs";
import path from "node:path";
import type { Collection } from "./types";

export function readCollection(collection: Collection, root = process.cwd()) {
  const directory = path.join(root, "content", collection);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => ({
      filename: path.join(directory, name),
      slug: name.slice(0, -3),
      raw: fs.readFileSync(path.join(directory, name), "utf8"),
    }));
}
