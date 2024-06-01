import { createContext, useState, useEffect } from "react";
import _sendAPIRequest from "../utils/CommonFunctions";

export const userDetailsContext = createContext();
const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [isLogin, setIsLogin] = useState(false);

  
  

  return (
    <userDetailsContext.Provider
      value={[userDetails, setUserDetails, isLogin, setIsLogin]}
    >
      {props.children}
    </userDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
