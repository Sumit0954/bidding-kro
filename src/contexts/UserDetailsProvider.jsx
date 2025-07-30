import { createContext, useContext, useEffect, useState } from "react";
import _sendAPIRequest from "../helpers/api";
import { PortalApiUrls } from "../helpers/api-urls/PortalApiUrls";
import { AuthContext } from "./AuthProvider";

export const UserDetailsContext = createContext();
const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [noCompany, setNoCompany] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const getUserProfile = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_USER_PROFILE,
        "",
        true
      );
      if (response.status === 200) {
        console.log(response.data, "erer");
        setUserDetails(response.data);
        setNoCompany(response.data.company === null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfile();
    }
  }, [isAuthenticated]);

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        setUserDetails,
        noCompany,
        setNoCompany,
        getUserProfile,
      }}
    >
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
