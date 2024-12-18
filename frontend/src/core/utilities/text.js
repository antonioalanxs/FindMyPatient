/**
 * Get the greeting message based on the current time.
 *
 * @returns {string} The greeting message.
 */
export function greetingText() {
  const hours = new Date().getHours();

  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

/**
 * Load the text or return "N / A" if it is empty.
 *
 * @param {string} string - The text to load or "N / A".
 */
export function loadText(string) {
  return string ?? "N / A";
}

/**
 * Capitalizes the first letter of a string and replaces all underscores with spaces.
 *
 * @param {string} text - The text to clean.
 *
 * @returns {string} The cleaned text.
 */
export function cleanText(text) {
  text = text.replace(/_/g, " ");
  text = text.charAt(0).toUpperCase() + text.slice(1);

  return text;
}
