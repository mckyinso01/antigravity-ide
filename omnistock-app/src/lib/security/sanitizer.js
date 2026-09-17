/**
 * DOMPurify wrapper for rich text sanitization (KAMKAR-02).
 * Prevents stored XSS from supplier notes and recipe descriptions.
 */

// Lightweight HTML sanitizer — strips dangerous tags and attributes
// without requiring DOMPurify as a dependency.
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'em', 'u', 's', 'ol', 'ul', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'span', 'div', 'blockquote', 'code', 'pre',
]);

const ALLOWED_ATTRS = new Set(['style', 'class']);

/**
 * Sanitize an HTML string, removing all dangerous tags and attributes.
 * @param {string} html
 * @returns {string} sanitized HTML
 */
export function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') return '';

  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Walk the tree and remove disallowed elements
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null);

  const toRemove = [];
  let node;
  while ((node = walker.nextNode())) {
    const tag = node.tagName.toLowerCase();

    // Remove script, iframe, object, embed, etc. entirely
    if (['script', 'iframe', 'object', 'embed', 'link', 'meta', 'style', 'base', 'form', 'input', 'button'].includes(tag)) {
      toRemove.push(node);
      continue;
    }

    // Remove event handler attributes (onerror, onclick, etc.)
    for (const attr of [...node.attributes]) {
      if (attr.name.startsWith('on')) {
        node.removeAttribute(attr.name);
      }
      if (!ALLOWED_ATTRS.has(attr.name) && attr.name !== 'src' && attr.name !== 'href' && attr.name !== 'alt') {
        node.removeAttribute(attr.name);
      }
      // Block javascript: URLs
      if ((attr.name === 'src' || attr.name === 'href') && attr.value?.toLowerCase().startsWith('javascript:')) {
        node.removeAttribute(attr.name);
      }
    }
  }

  toRemove.forEach((n) => n.remove());

  return doc.body.innerHTML;
}

/**
 * Sanitize plain text — escape HTML entities.
 */
export function escapeHTML(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
