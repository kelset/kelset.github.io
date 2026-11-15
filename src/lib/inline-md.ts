/* Tiny build-time renderer for the inline-markdown `detail` strings on
   appearance entries. Escapes first, then re-introduces only the three
   constructs the content actually uses. */

const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export function renderInlineMd(src: string): string {
  let out = escapeHtml(src);
  // [text](url) — http(s) links, or a root-relative path on this site
  out = out.replace(
    /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]*)\)/g,
    (_m, text, url) => `<a href="${url}">${text}</a>`,
  );
  // **strong** — before the single-asterisk pass, or it would eat the pair
  out = out.replace(/\*\*([^*<>]+)\*\*/g, "<strong>$1</strong>");
  // *em* (single asterisks, non-greedy, not across tags)
  out = out.replace(/\*([^*<>]+)\*/g, "<em>$1</em>");
  return out;
}
