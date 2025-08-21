import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Tooltip,
} from "@mui/material";
import Messages from "./Messages";
import Badge from "@mui/material/Badge";
import { truncateString } from "../../../helpers/formatter";
import dayjs from "dayjs";
import { MessageRounded } from "@mui/icons-material";
import styles from "./Messages.module.scss";
import { useLocation } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import useMediaQuery from "@mui/material/useMediaQuery";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";
const MessagesList = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserID, setSelectedUserID] = useState("");
  const location = useLocation();
  const [chatList, setChatList] = useState([]);
  const [chatId, setChatID] = useState(location?.state?.chatId);
  const userID = localStorage.getItem("loginUserID");
  const [readStatus, setReadStatus] = useState({});
  const isMobile = useMediaQuery("(max-width:600px)");
  const [screenLoader, setScreenLoader] = useState(true);
  const { companyDetails } = useContext(CompanyDetailsContext);
  const getChatList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CHAT_LIST,
        "",
        true
      );

      if (response?.status === 200) {
        setChatList(response?.data);
        setScreenLoader(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    Object.keys(companyDetails).length > 0 && getChatList();
  }, []);

  useEffect(() => {
    if (chatList.length > 0 && !selectedUser) {
      // Ensure we don't override a manually selected user
      const sortedChats = [...chatList].sort(
        (a, b) =>
          new Date(b.channel.last_message_at) -
          new Date(a.channel.last_message_at)
      );

      const recentChat = sortedChats.find((chat) =>
        chat.read.some((c) => c?.company?.id !== userID)
      );

      if (recentChat) {
        const recentCompanyID = recentChat.read.find(
          (c) => c?.company?.id !== userID
        )?.company?.id;
        // if (recentCompany) setSelectedUser(recentCompany);
        if (recentCompanyID) setSelectedUserID(recentCompanyID);
        // if (recentChatId) setChatID(recentChatId);
      }

      const newConvo = sortedChats.find((chat) => chat.channel.id === chatId);

      if (newConvo) {
        const selConvo = newConvo.read.find((c) => c?.company?.id !== userID)
          ?.company?.name;

        if (selConvo) setSelectedUser(selConvo);
      }
    }
  }, [chatList, selectedUser]);

  const messageRead = async (chadId) => {
    try {
      const response = await _sendAPIRequest(
        "PUT",
        `${PortalApiUrls?.MARK_MESSAGE_READ}${chadId}/mark_read/`,
        "",
        true
      );
      if (response?.status === 200) {
        setReadStatus((prevStatus) => ({
          ...prevStatus,
          [chadId]: true,
        }));
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Box className={styles["chat-sidebar"]}>
          <Box className={styles["chat-sidebar__header"]}>
            {/* Icon Always Visible */}
            <IconButton color="inherit" sx={{ padding: "5px" }}>
              <MessageRounded />
            </IconButton>

            {/* Header Text (Hidden on Mobile) */}
            {!isMobile && (
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Messages
              </Typography>
            )}
          </Box>

          <List sx={{ padding: "8px" }}>
            {/* Chat List Items */}
            <Box className={styles["chat-list-container"]}>
              {chatList.length > 0 ? (
                chatList
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.channel.last_message_at) -
                      new Date(a.channel.last_message_at)
                  )
                  .map((user, userIndex) =>
                    user.read.map((company, companyIndex) => {
                      if (company?.company?.id !== userID) {
                        return (
                          <Tooltip
                            title={company.company?.name}
                            key={companyIndex}
                          >
                            <ListItem
                              button
                              selected={selectedUser === company.company?.name}
                              onClick={() => {
                                setSelectedUser(company.company?.name);
                                setSelectedUserID(company?.company?.id);
                                setChatID(user?.channel?.id);
                                messageRead(user?.channel?.id);
                              }}
                              className={`${styles["chat-user-item"]} ${
                                selectedUser === company.company?.name
                                  ? styles["selected"]
                                  : ""
                              }`}
                            >
                              {/* Avatar with Badge */}
                              <ListItemAvatar>
                                <Badge
                                  badgeContent={
                                    readStatus[user?.channel?.id]
                                      ? 0
                                      : user.read.find(
                                          (company) =>
                                            company?.company?.id === userID
                                        )?.unread_messages || 0
                                  }
                                  color="error"
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      backgroundColor: "#062d72",
                                      width: "35px",
                                      height: "35px",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {company.company.name.charAt(0)}
                                  </Avatar>
                                </Badge>
                              </ListItemAvatar>

                              {/* Hide Company Name & Timestamp on Mobile */}
                              {!isMobile && (
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontWeight: "bold",
                                        color:
                                          selectedUser === company.company?.name
                                            ? "#fff"
                                            : "#333",
                                      }}
                                    >
                                      {truncateString(
                                        company.company?.name,
                                        13
                                      )}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color:
                                          selectedUser === company.company?.name
                                            ? "#fff"
                                            : "gray",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {/* {dayjs(
                                        user.channel.last_message_at
                                      ).format("DD MMM, hh:mm A")} */}
                                      {user.channel.last_message_at
                                        ? dayjs(
                                            user.channel.last_message_at
                                          ).format("DD MMM, hh:mm A")
                                        : ""}
                                    </Typography>
                                  }
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                />
                              )}
                            </ListItem>
                          </Tooltip>
                        );
                      }
                    })
                  )
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    padding: "16px",
                    fontSize: "14px",
                  }}
                >
                  No conversations <br></br>
                  Go to Invited Bids summary page to start a conversation.
                </Typography>
              )}
            </Box>
          </List>
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Messages Component */}
          <Messages
            selectedUser={selectedUser}
            chatId={chatId}
            userID={userID}
            refreshChatList={getChatList}
            selectedUserID={selectedUserID}
            chatList={chatList}
          />
        </Box>
      </Box>
    </>
  );
};

export default MessagesList;
