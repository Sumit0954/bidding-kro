import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Messages = ({ user }) => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "fixed",
          width: "55%",
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            borderBottom: "1px solid #ddd",
            p: 2,
            display: "flex",
            alignItems: "center",
            background: "#f7f7f7",
          }}
        >
          <Avatar sx={{ marginRight: 1, backgroundColor: "#3f51b5" }}>
            {user.user.charAt(0)}
          </Avatar>
          <Typography variant="h6">{user.user}</Typography>
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            pb: 10, // <-- Ensures space for the input box
            display: "flex",
            flexDirection: "column",
            backgroundColor: "lightgrey",
            scrollBehavior: "smooth",
          }}
          id="chat-container" // Add an ID for scrolling
        >
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
          <IconButton color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Messages;
