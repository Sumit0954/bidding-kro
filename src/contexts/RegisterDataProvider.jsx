import { createContext, useState } from "react";

export const RegisterDataContext = createContext();
const RegisterDataProvider = (props) => {
  const [registerData, setRegisterData] = useState(null);
  console.log(registerData, " : registerData");
  return (
    <RegisterDataContext.Provider value={[registerData, setRegisterData]}>
      {props.children}
    </RegisterDataContext.Provider>
  );
};

export default RegisterDataProvider;
