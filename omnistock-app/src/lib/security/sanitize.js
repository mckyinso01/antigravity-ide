/**
 * HTML sanitization wrapper using DOMPurify (KAMKAR-02).
 * Prevents stored XSS by stripping dangerous tags/attributes from rich text.
 */
import DOMPurify from 'dompurify';

const STRICT_CONFIG = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'span', 'div'],
  ALLOWED_ATTR: ['class'],
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'img', 'svg', 'math', 'form', 'input'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onsubmit'],
};

/**
 * Sanitize HTML content for safe rendering.
 * @param {string} html - potentially unsafe HTML string
 * @returns {string} sanitized HTML safe for dangerouslySetInnerHTML
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, STRICT_CONFIG);
}

/**
 * Sanitize plain text — strips all HTML tags entirely.
 * Use for notes fields that should never contain HTML.
 * @param {string} text - potentially unsafe text
 * @returns {string} plain text with all HTML removed
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
