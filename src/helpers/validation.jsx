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
