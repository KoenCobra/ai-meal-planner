import { type ClassValue, clsx } from "clsx";
import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify for client-side sanitization
 */
export function sanitizeHtml(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [], // Remove all HTML tags
    ALLOWED_ATTR: [], // Remove all attributes
  });
}

/**
 * Sanitizes user input for safe use in the application
 * This function is intended for text inputs that should not contain any HTML
 */
export function sanitizeInput(input: string): string {
  // First use DOMPurify to remove any HTML/scripts
  const purified = sanitizeHtml(input);

  // Further encode special characters to prevent XSS
  return purified
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
