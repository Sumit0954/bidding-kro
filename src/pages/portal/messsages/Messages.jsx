import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Messages.module.scss";
import { Person2Outlined } from "@mui/icons-material";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { dateTimeFormatter } from "../../../helpers/formatter";
import { TimeIcon } from "@mui/x-date-pickers";
const Messages = ({
  selectedUser,
  chatId,
  userID,
  refreshChatList,
  selectedUserID,
}) => {
  const { handleSubmit, control, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const [updateChat, setUpdateChat] = useState();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  const sendMessage = async (data) => {
    if (data.message.trim() !== "") {
      const formData = new FormData();
      formData.append("message", data.message);
      formData.append("receiver_company_id", selectedUserID);

      console.log("Sending Message:", formData.get("message"));

      try {
        const response = await _sendAPIRequest(
          "POST",
          `${PortalApiUrls.SEND_CHAT_MESSAGE}${chatId}/`,
          formData,
          true
        );

        if (response?.status === 200) {
          setUpdateChat(response?.data?.created_at);
          reset({ message: "" });
          refreshChatList();
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  const getChatMessages = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls?.GET_MESSAGE_LIST}${chatId}/`,
        "",
        true
      );
      if (response?.status === 200) {
        setMessages(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getChatMessages();
  }, [chatId, selectedUser, updateChat]);

  return (
    <>
      <Box className={styles["chat-box"]}>
        <Box
          className={styles["chat-box-header"]}
          sx={{
            display: "flex",
            alignItems: "center", // Ensures content is vertically centered
            padding: "5px 10px", // Reduce padding
            height: "50px", // Adjust height as needed
          }}
        >
          <Avatar
            sx={{
              marginRight: 1,
              backgroundColor: "#062d72",
              width: 30,
              height: 30,
            }}
          >
            {selectedUser.charAt(0)}
          </Avatar>
          <Typography variant="h6" sx={{ fontSize: "16px" }}>
            {selectedUser}
          </Typography>
        </Box>

        {/* Chat Messages */}

        <Box className={styles["chat-container"]}>
          {messages?.map((allmessage, messageIndex) =>
            allmessage.messages.map((msg, msgIndex) => {
              const isLastMessage =
                messageIndex === messages.length - 1 &&
                msgIndex === allmessage.messages.length - 1;

              return (
                <Box
                  key={`${messageIndex}-${msgIndex}`} // Unique key
                  ref={isLastMessage ? lastMessageRef : null} // Attach ref to last message
                  sx={{
                    maxWidth: "70%",
                    marginBottom: 2,
                    padding: "10px 15px",
                    borderRadius: "18px",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                    background:
                      msg?.company?.id === userID
                        ? "linear-gradient(135deg, #f4f7ff, #e3e9ff)"
                        : "linear-gradient(135deg, #86b0f9, #639af3)",
                    alignSelf:
                      msg?.company?.id === userID ? "flex-end" : "flex-start",
                    color: msg?.company?.id === userID ? "#333" : "#fff",
                    cursor: "pointer",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "right",
                      marginTop: 0.5,
                      opacity: 0.7,
                      fontSize: "12px",
                    }}
                  >
                    {dateTimeFormatter(msg?.created_at)}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>

        {/* Chat Input */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            borderTop: "1px solid #ddd",
            background: "#fff",
            position: "sticky",
            bottom: 0, // Sticks input to the bottom
          }}
        >
          <form
            onSubmit={handleSubmit(sendMessage)}
            style={{ display: "flex", flex: 1 }}
          >
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Type a message"
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1 }}
                />
              )}
            />
            <IconButton sx={{ color: "#062d72" }} type="submit">
              <SendIcon />
            </IconButton>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Messages;
