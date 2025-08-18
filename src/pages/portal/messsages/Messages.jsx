import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Messages.module.scss";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { dateTimeFormatter } from "../../../helpers/formatter";
import NoMesimg from "../../../assets/images/portal/chat-management/No-message-img.png";
import { Lock } from "@mui/icons-material";
import classNames from "classnames";
const Messages = ({
  selectedUser,
  chatId,
  userID,
  refreshChatList,
  selectedUserID,
  chatList,
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
    if (chatId !== undefined) {
      getChatMessages();
    }
  }, [chatId, selectedUser, updateChat]);

  return (
    <>
      <Box className={styles["chat-box"]}>
        {selectedUser !== "" && (
          <Box className={styles["chat-box-header"]}>
            <Avatar className={styles["user-icon"]}>
              {selectedUser.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              {selectedUser}
            </Typography>
          </Box>
        )}

        {/* Chat Messages */}

        <Box className={styles["chat-container"]}>
          {messages?.length > 0 ? (
            messages.map((allmessage, messageIndex) =>
              allmessage.messages.map((msg, msgIndex) => {
                const isLastMessage =
                  messageIndex === messages.length - 1 &&
                  msgIndex === allmessage.messages.length - 1;

                return (
                  <Box
                    key={`${messageIndex}-${msgIndex}`} // Unique key
                    ref={isLastMessage ? lastMessageRef : null} // Attach ref to last message
                    className={classNames(
                      styles["message-box"],
                      msg?.company?.id === userID
                        ? styles["sent-message"]
                        : styles["received-message"]
                    )}
                  >
                    <Typography variant="body1">{msg.text}</Typography>

                    <Typography
                      variant="caption"
                      className={styles["message-time"]}
                    >
                      {dateTimeFormatter(msg?.created_at)}
                    </Typography>
                  </Box>
                );
              })
            )
          ) : (
            <>
              <Box className={styles["empty-state"]}>
                {/* Laptop image */}
                <Box
                  component="img"
                  src={NoMesimg}
                  alt="No Messages"
                  className={styles["empty-state-img"]}
                />

                {/* Shadow under laptop */}
                <Box className={styles["empty-state-shadow"]} />

                {/* End-to-end encryption note */}
                <Box className={styles["encryption-note"]}>
                  <Lock className={styles["lock-icon"]} />
                  Your personal messages are end-to-end encrypted
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* Chat Input */}
        {selectedUser !== "" && chatList.length > 0 ? (
          <Box className={styles["chat-input-container"]}>
            <form
              onSubmit={handleSubmit(sendMessage)}
              className={styles["chat-form"]}
              autoComplete="off"
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
                    className={styles["chat-textfield"]}
                  />
                )}
              />
              <IconButton className={styles["chat-send-button"]} type="submit">
                <SendIcon />
              </IconButton>
            </form>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Messages;
