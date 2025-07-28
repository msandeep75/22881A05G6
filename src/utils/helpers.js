import { shortcodeExists } from './storage';

/**
 * Generates a unique random alphanumeric shortcode.
 * @param {number} length - The desired length of the shortcode.
 * @returns {string} A unique shortcode.
 */
export const generateShortcode = (length = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortcode;
  do {
    shortcode = '';
    for (let i = 0; i < length; i++) {
      shortcode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (shortcodeExists(shortcode)); // Ensure uniqueness
  return shortcode;
};

/**
 * Validates if a string is a valid URL.
 * @param {string} urlString - The string to validate.
 * @returns {boolean} True if the URL is valid.
 */
export const isValidUrl = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch (e) {
        return false;
    }
};