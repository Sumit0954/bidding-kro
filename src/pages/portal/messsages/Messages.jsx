import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Messages.module.scss";
import { Person2Outlined } from "@mui/icons-material";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { dateTimeFormatter } from "../../../helpers/formatter";
const Messages = ({ user, chatId }) => {
  const { register, handleSubmit } = useForm();
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const formData = new FormData();
  };

  const getChatMessages = async (params) => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${PortalApiUrls?.GET_MESSAGE_LIST}${chatId}/`,
        "",
        true
      );
      if (response?.status === 200) {
        // setMessages(.messages);

        setMessages(response?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getChatMessages();
  }, []);


  return (
    <>
      <Box className={styles["chat-box"]}>
        {/* Chat Header */}
        <Box className={styles["chat-box-header"]}>
          <Avatar sx={{ marginRight: 1, backgroundColor: "#062d72" }}>
            <Person2Outlined />
          </Avatar>
          <Typography variant="h6">{user.user}</Typography>
        </Box>

        {/* Chat Messages */}
        <Box className={styles["chat-container"]}>
          {messages?.map((allmessage, messageIndex) =>
            allmessage.messages.map((msg, msgIndex) => (
              <Box
                key={`${messageIndex}-${msgIndex}`} // Use a unique key for each message
                sx={{
                  maxWidth: "70%",
                  marginBottom: 2,
                  p: 1.5,
                  borderRadius: 2,
                  boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  position: "relative",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    marginTop: 0.5,
                    color: "black"
                  }}
                >
                  {dateTimeFormatter(msg?.created_at)}
                </Typography>
              </Box>
            ))
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
            bottom: 0, // Sticks the input to the bottom of the container
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message"
            variant="outlined"
            size="small"
            sx={{ marginRight: 1 }}
            {...register("message", { required: true })}
          />
          <IconButton sx={{ color: "#062d72" }} onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Messages;
