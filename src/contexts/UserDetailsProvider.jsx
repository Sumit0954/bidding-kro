import { createContext, useEffect, useState } from "react";
import _sendAPIRequest from "../helpers/api";
import { PortalApiUrls } from "../helpers/api-urls/PortalApiUrls";

export const UserDetailsContext = createContext();
const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState({});

  const getUserProfile = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_USER_PROFILE,
        "",
        true
      );
      if (response.status === 200) {
        setUserDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
