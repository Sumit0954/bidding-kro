export const numberFormatter = (number) => {
  if (number) {
    const parts = number?.split(" ");
    const filteredParts = parts.filter((part) => part !== "+91");
    return filteredParts.join("");
  }
};

export const addCountryCode = (number) => {
  if (number) {
    return "+91" + number;
  }
};

export const modifiedData = (data) => {
  let modified = [];
  data?.forEach((element) => {
    modified = [...modified, { lable: element.name, value: element.id }];
  });
  return modified;
};

export const formatUrl = (inputUrl) => {
  if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
    return `https://${inputUrl}`;
  }
  return inputUrl;
};

export const dateFormatter = (date) => {
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  const mm = String(newDate.getMonth() + 1);
  const dd = String(newDate.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

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

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
