export const phoneValidator = {
  value: /^\d{10}$/,
  message: "Enter a valid phone number",
};

export const emailValidator = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "Enter a valid e-mail address",
};

export const websiteValidator = {
  value:
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
  message: "Enter a valid website",
};

export const passwordValidator = async (password) => {
  // -1 = false and 0 = true
  if (password.length < 12) {
    return "Password must be 12 characters or more.";
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
