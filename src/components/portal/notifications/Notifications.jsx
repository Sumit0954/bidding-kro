import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
const Notifications = () => {
  const notifications = [
    {
      id: 1,
      message: "Your company has been successfully registered.",
      time: "1m ago",
    },
    {
      id: 2,
      message: "Your bid has been successfully created.",
      time: "1m ago",
    },
    { id: 3, message: "Your Bid has been activated.", time: "1m ago" },
    { id: 4, message: "You are invited for the QCBS bid.", time: "1m ago" },
    {
      id: 5,
      message: "Your sample has been approved by XYZ industries.",
      time: "1m ago",
    },
    {
      id: 6,
      message: "You got the bid invite for the L1 bid from Abc pvt. ltd.",
      time: "1m ago",
    },
    {
      id: 7,
      message: "You are awarded for the bid of gud powder.",
      time: "1m ago",
    },
  ];
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Notifications
      </Typography>
      <List
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
        }}
      >
        {notifications.map((notification, index) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.message}
                secondary={notification.time}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              />
            </ListItem>
            {index < notifications.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </>
        ))}
      </List>
    </>
  );
};
export default Notifications;
