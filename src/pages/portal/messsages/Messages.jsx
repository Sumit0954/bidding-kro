import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Messages.module.scss";
import { Person2Outlined } from "@mui/icons-material";
const Messages = ({ user }) => {
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
          {user.messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: "70%",
                marginBottom: 2,
                alignSelf: msg.type === "buyer" ? "flex-end" : "flex-start",
                background: msg.type === "buyer" ? "#fff" : "#86b0f9",
                p: 1.5,
                borderRadius: 2,
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                position: "relative", // For better placement of time
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "right",
                  marginTop: 0.5,
                  color: msg.type === "buyer" ? "gray" : "#dfe7ff",
                }}
              >
                {msg.time}
              </Typography>
            </Box>
          ))}
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
          />
          <IconButton sx={{ color: "#062d72" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Messages;
