/**
 * Removes the '+91' country code prefix from a phone number string.
 *
 * @param {string} number - The phone number string, possibly including '+91'.
 * @returns {string} - The phone number string without the '+91' prefix.
 */
export const numberFormatter = (number) => {
  if (number) {
    const parts = number?.split(" ");
    const filteredParts = parts.filter((part) => part !== "+91");
    return filteredParts.join("");
  }
};

/**
 * Adds the '+91' country code prefix to a phone number.
 *
 * @param {string} number - The phone number string without country code.
 * @returns {string} - The phone number prefixed with '+91'.
 */
export const addCountryCode = (number) => {
  if (number) {
    return "+91" + number;
  }
};

/**
 * Transforms an array of objects into a new format with 'label' and 'value' keys.
 *
 * @param {Array<{ name: string, id: string|number }>} data - The input array to transform.
 * @returns {Array<{ label: string, value: string|number }>} - The modified array.
 */
export const modifiedData = (data) => {
  let modified = [];
  data?.forEach((element) => {
    modified = [...modified, { lable: element.name, value: element.id }];
  });
  return modified;
};

/**
 * Ensures the given URL starts with 'https://' or 'http://'.
 *
 * @param {string} inputUrl - The URL to validate and format.
 * @returns {string} - A properly formatted URL starting with 'https://' or 'http://'.
 */
export const formatUrl = (inputUrl) => {
  if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
    return `https://${inputUrl}`;
  }
  return inputUrl;
};

/**
 * Formats a date into 'YYYY-MM-DD' format.
 *
 * @param {Date|string|number} date - A valid date object or date string/number.
 * @returns {string} - The formatted date string.
 */
export const dateFormatter = (date) => {
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  const mm = String(newDate.getMonth() + 1);
  const dd = String(newDate.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Formats a date into a human-readable string like 'Jan 01, 2024 10:30 AM'.
 *
 * @param {Date|string|number} date - A valid date object or value.
 * @param {boolean} [showTime=true] - Whether to include time in the output.
 * @returns {string} - The formatted date-time string.
 */
export const dateTimeFormatter = (date, showTime = true) => {
  const newDate = new Date(date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const yyyy = newDate.getFullYear();
  const mm = monthNames[newDate.getMonth()];
  const dd = newDate.getDate();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${mm} ${dd}, ${yyyy} ${
    showTime ? `${hours}:${minutes} ${ampm}` : ""
  }`;
};

/**
 * Returns a date string in 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm' format.
 *
 * @param {Date|string|number} date - A valid date object or value.
 * @param {boolean} [showTime=true] - Whether to include time in the output.
 * @returns {string} - The formatted date string with or without time.
 */
export const retrieveDateFormat = (date, showTime = true) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");

  const formatted = showTime
    ? `${year}-${month}-${day}T${hours}:${minutes}`
    : `${year}-${month}-${day}`;

  return formatted;
};

/**
 * Truncates a string to a specified length.
 *
 * @param {string} title - The input string to truncate.
 * @param {number} maxlength - The maximum allowed length.
 * @returns {string} Truncated string with ellipsis if required.
 */
export const truncateString = (title, maxlength) => {
  return title?.length > maxlength
    ? title.substring(0, maxlength) + "..."
    : title;
};

export const convertHtmlToText = (html) => {
  if (!html) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Clean all elements except allowed tags
  const allowedTags = ["A", "STRONG", "B", "BR"];
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null);

  let node;
  while ((node = walker.nextNode())) {
    if (!allowedTags.includes(node.nodeName)) {
      const parent = node.parentNode;
      while (node.firstChild) {
        parent.insertBefore(node.firstChild, node);
      }
      parent.removeChild(node);
    } else if (node.nodeName === "A") {
      // Ensure <a> has target _blank and rel attributes
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  }

  return doc.body.innerHTML.trim();
};
