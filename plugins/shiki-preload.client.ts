// plugins/shiki-preload.client.ts
export default async () => {
  if (
    typeof window !== "undefined" &&
    typeof getShikiHighlighter === "function"
  ) {
    getShikiHighlighter();
  }
};
