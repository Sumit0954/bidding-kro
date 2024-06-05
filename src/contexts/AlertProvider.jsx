import { createContext, useState } from "react";

export const AlertContext = createContext();
const AlertProvider = (props) => {
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    isVisible: false,
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
