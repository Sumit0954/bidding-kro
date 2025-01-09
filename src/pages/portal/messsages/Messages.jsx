import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
  Badge,
} from "@mui/material";

const messages = [
  { name: "Bunty Chemicals", daysAgo: "2 days ago", messageCount: 2 },
  { name: "Arvind Pvt Ltd", daysAgo: "2 days ago", messageCount: 5 },
  { name: "Raymond's Fabric", daysAgo: "2 days ago", messageCount: 1 },
];

const Messages = () => (
  <>
    {messages.map((msg, index) => (
      <Card key={index} sx={{ mb: 2 }}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            {/* Avatar */}
            <Grid item>
              <Avatar sx={{ bgcolor: "#3f51b5" }}>
                {msg.name.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            {/* Name and Days */}
            <Grid item xs>
              <Typography variant="h6">{msg.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {msg.daysAgo}
              </Typography>
            </Grid>
            {/* Message Count and Time */}
            <Grid item>
              <Box textAlign="right">
                <Badge badgeContent={msg.messageCount} color="primary" />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {msg.daysAgo}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ))}
  </>
);

export default Messages;
