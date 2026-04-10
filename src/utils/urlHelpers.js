/**
 * Convert category name to URL-friendly format
 * Example: "Copy Bots" -> "copy-bots"
 */
export const categoryToUrl = (categoryName) => {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Convert URL format back to category name
 * Example: "copy-bots" -> "Copy Bots"
 */
export const urlToCategory = (urlCategory) => {
  return urlCategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Convert item title to URL slug
 * Example: "Bitcoin devil - Bull rider" -> "bitcoin-devil-bull-rider"
 */
export const titleToSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
};
