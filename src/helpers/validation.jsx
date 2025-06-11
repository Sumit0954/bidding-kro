/**
 * Validates a 10-digit phone number (numeric only).
 *
 * @type {{ value: String, message: string }}
 * @example
 * // Valid: 9876543210
 * // Invalid: 98765-43210, +919876543210
 */
export const phoneValidator = {
  value: /^\d{10}$/,
  message: "Enter a valid phone number",
};

/**
 * Validates a standard email address.
 *
 * @type {{ value: String, message: string }}
 * @example
 * // Valid: example@domain.com
 * // Invalid: example@domain
 */
export const emailValidator = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "Enter a valid e-mail address",
};

/**
 * Validates the strength of a password.
 * Checks for:
 * - Minimum length of 8 characters
 * - At least one special character
 * - At least one digit
 * - At least one uppercase letter
 *
 * @param {string} password - The password to validate.
 * @returns {Promise<true|string>} - Returns `true` if valid, or an error message string if invalid.
 */
export const passwordValidator = async (password) => {
  // -1 = false and 0 = true
  if (password.length < 8) {
    return "Password must be 8 characters or more.";
  } else if (password.search(/^(?=.*[^A-Za-z0-9])/) === -1) {
    return "Password must have at least 1 special character!";
  } else if (password.search(/^(?=(.*\d){1,})/) === -1) {
    return "Password must have at least 1 digits!";
  } else if (password.search(/^(?=(.*[A-Z]){1,})/) === -1) {
    return "Password must have at least 1 uppercase character!";
  }
  // else if (password.search(/^(?=(.*[a-z]){5,})/) === -1) {
  //   return "Password must have at least 5 lowercase character!";
  // }
  else {
    return true;
  }
};

/**
 * Validates if a given date is within a specified range.
 *
 * @param {string|Date} value - The date to validate.
 * @param {string|Date} minDate - The minimum allowed date.
 * @param {string|Date} maxDate - The maximum allowed date.
 * @returns {true|string} - Returns `true` if the date is within range, or an error message string otherwise.
 */
export const dateValidator = (value, minDate, maxDate) => {
  const date = new Date(value);
  const min = new Date(minDate);
  const max = new Date(maxDate);
  if (date < min || date > max) {
    return `Date must be between ${minDate} and ${maxDate}`;
  }
  return true;
};
