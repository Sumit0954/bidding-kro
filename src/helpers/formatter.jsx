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
