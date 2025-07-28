const URLS_KEY = 'shortenedUrls';

/**
 * Retrieves all URLs from localStorage.
 * @returns {Array} An array of URL objects.
 */
export const getUrls = () => {
  const urls = localStorage.getItem(URLS_KEY);
  return urls ? JSON.parse(urls) : [];
};

/**
 * Saves an array of URL objects to localStorage.
 * @param {Array} urls - The array of URL objects to save.
 */
export const saveUrls = (urls) => {
  localStorage.setItem(URLS_KEY, JSON.stringify(urls));
};

/**
 * Finds a URL by its shortcode.
 * @param {string} shortcode - The shortcode to search for.
 * @returns {object|undefined} The URL object or undefined if not found.
 */
export const getUrlByShortcode = (shortcode) => {
  const urls = getUrls();
  return urls.find((url) => url.shortcode === shortcode);
};

/**
 * Checks if a shortcode already exists.
 * @param {string} shortcode - The shortcode to check.
 * @returns {boolean} True if the shortcode exists, false otherwise.
 */
export const shortcodeExists = (shortcode) => {
  const urls = getUrls();
  return urls.some((url) => url.shortcode === shortcode);
};