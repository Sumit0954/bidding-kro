import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  Avatar,
  Divider,
  IconButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import Messages from "./Messages";
import MessageIcon from "@mui/icons-material/Message";
import Badge from "@mui/material/Badge";
import { dateTimeFormatter, truncateString } from "../../../helpers/formatter";
import { Person2Outlined, PersonPinCircleOutlined } from "@mui/icons-material";
import styles from "./Messages.module.scss";
import { useLocation } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
const MessagesList = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [chatList, setChatList] = useState([]);
  const location = useLocation();

  const chatId = location?.state?.chatId;

  const messagesData = [
    {
      user: "Tech Solutions Inc.",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Hello, could you share the product catalog?",
          type: "receiver",
          time: "12/01/2025 10:00 AM",
        },
        {
          text: "Sure, I’ll send it to you in a moment.",
          type: "buyer",
          time: "12/01/2025 10:05 AM",
        },
        {
          text: "Thank you. Also, let me know the pricing details.",
          type: "receiver",
          time: "12/01/2025 10:10 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "buyer",
          time: "12/01/2025 10:15 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "receiver",
          time: "12/01/2025 10:20 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "buyer",
          time: "12/01/2025 10:25 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "receiver",
          time: "12/01/2025 10:30 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "buyer",
          time: "12/01/2025 10:35 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "receiver",
          time: "12/01/2025 10:40 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "buyer",
          time: "12/01/2025 10:45 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "receiver",
          time: "12/01/2025 10:50 AM",
        },
        {
          text: "I’ve attached the price list along with the catalog.",
          type: "buyer",
          time: "12/01/2025 10:55 AM",
        },
      ],
    },
    {
      user: "Global Tech Enterprises",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Can you confirm the delivery timeline?",
          type: "receiver",
          time: "12/01/2025 11:00 AM",
        },
        {
          text: "Delivery will be completed within 5 days of order confirmation.",
          type: "buyer",
          time: "12/01/2025 11:05 AM",
        },
        {
          text: "Great! Have you included the warranty details?",
          type: "receiver",
          time: "12/01/2025 11:10 AM",
        },
        {
          text: "Yes, the warranty details are in the document I sent earlier.",
          type: "buyer",
          time: "12/01/2025 11:15 AM",
        },
      ],
    },
    {
      user: "Innovative Designs Ltd.",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Hi, I need assistance with the installation process.",
          type: "receiver",
          time: "12/01/2025 09:30 AM",
        },
        {
          text: "Sure, I can guide you. Do you have the installation manual?",
          type: "buyer",
          time: "12/01/2025 09:35 AM",
        },
        {
          text: "Yes, but I couldn’t understand one of the steps.",
          type: "receiver",
          time: "12/01/2025 09:40 AM",
        },
        {
          text: "No problem, let me clarify. Which step are you stuck on?",
          type: "buyer",
          time: "12/01/2025 09:45 AM",
        },
      ],
    },
    {
      user: "Alpha Industries",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Is there a discount if I place a bulk order?",
          type: "receiver",
          time: "12/01/2025 01:00 PM",
        },
        {
          text: "Yes, we offer discounts for bulk orders. How many units are you planning to order?",
          type: "buyer",
          time: "12/01/2025 01:05 PM",
        },
        {
          text: "I’m considering ordering 50 units.",
          type: "receiver",
          time: "12/01/2025 01:10 PM",
        },
        {
          text: "In that case, I can provide a 10% discount. Let me know if that works for you.",
          type: "buyer",
          time: "12/01/2025 01:15 PM",
        },
      ],
    },
    {
      user: "FutureTech Solutions",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Are your products compatible with Model X?",
          type: "receiver",
          time: "12/01/2025 02:00 PM",
        },
        {
          text: "Yes, our products are fully compatible with Model X.",
          type: "buyer",
          time: "12/01/2025 02:05 PM",
        },
        {
          text: "Great! Could you share the technical specifications?",
          type: "receiver",
          time: "12/01/2025 02:10 PM",
        },
        {
          text: "I’ve sent the specifications to your email. Let me know if you need anything else.",
          type: "buyer",
          time: "12/01/2025 02:15 PM",
        },
      ],
    },
    {
      user: "FutureTech Solutions",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Are your products compatible with Model X?",
          type: "receiver",
          time: "12/01/2025 02:00 PM",
        },
        {
          text: "Yes, our products are fully compatible with Model X.",
          type: "buyer",
          time: "12/01/2025 02:05 PM",
        },
        {
          text: "Great! Could you share the technical specifications?",
          type: "receiver",
          time: "12/01/2025 02:10 PM",
        },
        {
          text: "I’ve sent the specifications to your email. Let me know if you need anything else.",
          type: "buyer",
          time: "12/01/2025 02:15 PM",
        },
      ],
    },
    {
      user: "FutureTech Solutions",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Are your products compatible with Model X?",
          type: "receiver",
          time: "12/01/2025 02:00 PM",
        },
        {
          text: "Yes, our products are fully compatible with Model X.",
          type: "buyer",
          time: "12/01/2025 02:05 PM",
        },
        {
          text: "Great! Could you share the technical specifications?",
          type: "receiver",
          time: "12/01/2025 02:10 PM",
        },
        {
          text: "I’ve sent the specifications to your email. Let me know if you need anything else.",
          type: "buyer",
          time: "12/01/2025 02:15 PM",
        },
      ],
    },
    {
      user: "FutureTech Solutions",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Are your products compatible with Model X?",
          type: "receiver",
          time: "12/01/2025 02:00 PM",
        },
        {
          text: "Yes, our products are fully compatible with Model X.",
          type: "buyer",
          time: "12/01/2025 02:05 PM",
        },
        {
          text: "Great! Could you share the technical specifications?",
          type: "receiver",
          time: "12/01/2025 02:10 PM",
        },
        {
          text: "I’ve sent the specifications to your email. Let me know if you need anything else.",
          type: "buyer",
          time: "12/01/2025 02:15 PM",
        },
      ],
    },
    {
      user: "FutureTech Solutions",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Are your products compatible with Model X?",
          type: "receiver",
          time: "12/01/2025 02:00 PM",
        },
        {
          text: "Yes, our products are fully compatible with Model X.",
          type: "buyer",
          time: "12/01/2025 02:05 PM",
        },
        {
          text: "Great! Could you share the technical specifications?",
          type: "receiver",
          time: "12/01/2025 02:10 PM",
        },
        {
          text: "I’ve sent the specifications to your email. Let me know if you need anything else.",
          type: "buyer",
          time: "12/01/2025 02:15 PM",
        },
      ],
    },
    {
      user: "FutureTech Solutions",
      lastMessagetTime: "12/01/2025",
      unReadMessageCount: 2,
      messages: [
        {
          text: "Are your products compatible with Model X?",
          type: "receiver",
          time: "12/01/2025 02:00 PM",
        },
        {
          text: "Yes, our products are fully compatible with Model X.",
          type: "buyer",
          time: "12/01/2025 02:05 PM",
        },
        {
          text: "Great! Could you share the technical specifications?",
          type: "receiver",
          time: "12/01/2025 02:10 PM",
        },
        {
          text: "I’ve sent the specifications to your email. Let me know if you need anything else.",
          type: "buyer",
          time: "12/01/2025 02:15 PM",
        },
      ],
    },
  ];

  const userID = localStorage.getItem("loginUserID");

  const getChalList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_CHAT_LIST,
        "",
        true
      );

      if (response?.status === 200) {
        setChatList(response?.data);
        console.log(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getChalList();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "32%",
            borderRight: "1px solid #ddd",
            background: "#f7f7f7",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #ddd",
              p: 2,
              display: "flex",
              alignItems: "center",
              background: "#f7f7f7",
            }}
          >
            <IconButton sx={{ color: "#062d72" }}>
              <MessageIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginRight: 1 }}
            >
              Messages
            </Typography>
          </Box>

          <List>
            {/* Example Chat Items */}
            <Box className={styles["chat-list-container"]}>
              {chatList.map((user, userIndex) =>
                user.read.map((company, companyIndex) => {
                  console.log(company, " : company");
                  console.log(userID, " : userID");


                  if (company?.id !== userID) {
                    return (
                      <>
                        <ListItem
                          button
                          selected={selectedUser === userIndex}
                          onClick={() => setSelectedUser(userIndex)}
                          sx={{
                            "&.Mui-selected": {
                              backgroundColor: "#86b0f9",
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: "#062d72" }}>
                              <Person2Outlined />
                            </Avatar>
                          </ListItemAvatar>
                          {/* <ListItemText primary={company.company?.name} /> */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                            }}
                          >
                            {/* {company.unread_messages > 0 && (
                  <Badge
                    badgeContent={company.unread_messages || 0}
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "absolute",
                        transform: "translateY(-50%)",
                        right: 22,
                        top: 5,
                      },
                    }}
                  />
                )} */}
                            {/* Last message time */}
                            <Typography
                              variant="caption"
                              sx={{ color: "black", marginTop: "23px" }}
                            >
                              {/* {dateTimeFormatter(user.channel.last_message_at)} */}
                            </Typography>
                          </Box>
                        </ListItem>
                        <Divider />
                      </>
                    );
                  } else {
                    return null;
                  }
                })
              )}
            </Box>
          </List>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Message Header with Icon */}

          {/* Chat Messages */}
          <Messages user={messagesData[selectedUser]} chatId={chatId} />
        </Box>
      </Box>
    </>
  );
};

export default MessagesList;
