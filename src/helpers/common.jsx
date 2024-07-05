export const getMinMaxDate = (fromToday, fromMin) => {
  // Get current date
  const currentDate = new Date();
  // Calculate minDate
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + fromToday);
  // Calculate maxDate
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + fromMin);
  return [minDate, maxDate];
};

export const extractFileExtension = (name) => {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return ""; // No extension found
  }
  return name.substring(lastDotIndex + 1);
};
