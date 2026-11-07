const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

function walk(node, visit) {
  if (!node || typeof node !== "object") return;
  visit(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visit);
  }
}

function withTrailingSlash(pathname) {
  if (pathname.endsWith("/")) return pathname;
  const last = pathname.split("/").pop() ?? "";
  return last.includes(".") ? pathname : `${pathname}/`;
}

export function rehypeBaseLinks({ base = "/" } = {}) {
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;

  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== "element") return;
      const isLink = node.tagName === "a";
      const isImage = node.tagName === "img";
      if (!isLink && !isImage) return;

      const attr = isLink ? "href" : "src";
      const value = node.properties?.[attr];
      if (typeof value !== "string" || !value.startsWith("/") || EXTERNAL.test(value)) return;
      if (prefix && (value === prefix || value.startsWith(`${prefix}/`))) return;

      let next = `${prefix}${value}`;
      if (isLink) {
        const hashIndex = next.search(/[?#]/);
        const pathname = hashIndex === -1 ? next : next.slice(0, hashIndex);
        next = withTrailingSlash(pathname) + (hashIndex === -1 ? "" : next.slice(hashIndex));
      }

      node.properties[attr] = next;
    });
  };
}
