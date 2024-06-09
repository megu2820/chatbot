import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { ChatBubbleOutline, LibraryBooksOutlined } from "@mui/icons-material";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import "../App.css"

const ChatFrame = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationDetails, setConversationDetails] = useState(null);
  const conversationId = "54321";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/conversations/${conversationId}`
      );
      setMessages(response.data.messages);
      setConversationDetails(response.data.conversation);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/messages", {
        conversationId,
        direction: "in",
        content: newMessage,
      });
      setMessages([...messages, ...response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDateTimeWithLeadingZeros = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}/${month}/${year},${timeString}`;
  };

  return (
    <Box
      bgcolor="#D9D9D9"
      paddingTop="10px"
      paddingBottom="20px"
      paddingLeft="20px"
      paddingRight="20px"
    >
      <Box
        width="100%"
        bgcolor="white"
        minHeight={50}
        borderBottom={1}
        borderColor="rgba(0, 0, 0, 0.12)"
      ></Box>
      <Box display="flex" bgcolor="#F1F2F3">
        <Box width="256px" bgcolor="white"></Box>
        <Box flex={1} p={2}>
          <Paper elevation={3} className="paper">
            <Box mb={2}>
              <Typography
                variant="h6"
                gutterBottom
                color="#3A3F45"
                textAlign="left"
                padding="10px"
              >
                I want to cancel my subscription
              </Typography>
              <Grid container spacing={1} padding="10px">
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Box display="flex" alignItems="center">
                    <ChatBubbleOutline
                      className="icon-mr"
                      fontSize="small"
                    />
                    <Typography variant="body2" color="#69727D">
                      Case ID:{conversationDetails?.case_id}
                    </Typography>
                    <LibraryBooksOutlined
                      className="icon-mr icon-ml"
                      fontSize="small"
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`Product Name: ${conversationDetails?.product_name}`}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`Created At: ${formatDateTimeWithLeadingZeros(
                      new Date(conversationDetails?.created_at)
                    )}`}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      ml={2}
                    >{`Last Updated: ${formatDateTimeWithLeadingZeros(
                      new Date(conversationDetails?.last_updated)
                    )}`}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider width="100%" />
            <Box
              className="chat-area"
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.direction === "in" ? "flex-start" : "flex-end"
                  }
                  mb={2}
                  style={index === 0 ? { marginTop: "20px" } : {}}
                >
                  {message.direction === "in" && (
                    <Box
                      display="flex"
                      bgcolor="#0C97FA"
                      width="40px"
                      height="40px"
                      borderRadius="50%"
                      justifyContent="center"
                      alignItems="center"
                      mr={2}
                      ml={2}
                    ></Box>
                  )}
                  <Box display="flex" flexDirection="column" spacing={1}>
                    <Box
                      bgcolor={
                        message.direction === "in" ? "#e3f2fd" : "#D9D9D9"
                      }
                      p={1}
                      mb={1}
                    >
                      <Typography variant="body1" color="#69727D">
                        {message.content}
                      </Typography>
                    </Box>
                    <Box>
                      {" "}
                      <Typography
                        variant="caption"
                        display="block"
                        align={message.direction === "in" ? "left" : "right"}
                        color="#69727D"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent={
                            message.direction === "in"
                              ? "flex-start"
                              : "flex-end"
                          }
                        >
                          {" "}
                          {/* New container */}
                          Chat -{" "}
                          {formatDateTimeWithLeadingZeros(
                            new Date(message.timestamp)
                          )}
                          <DoneIcon
                            fontSize="small"
                            className="done-icon"
                          />
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                  {message.direction !== "in" && (
                    <Box
                      display="flex"
                      bgcolor="#D9D9D9"
                      width="40px"
                      height="40px"
                      borderRadius="50%"
                      justifyContent="center"
                      alignItems="center"
                      ml={2}
                      mr={2}
                    ></Box>
                  )}
                </Box>
              ))}
            </Box>
            <Divider width="100%" />
            <Box
              padding="20px"
              display="flex"
              height="327px"
              flexDirection="column"
            >
              <Box border={1} borderColor="rgba(0, 0, 0, 0.12)">
                <Box
                  width="100%"
                  bgcolor="white"
                  minHeight={30}
                  borderBottom={1}
                  borderColor="rgba(0, 0, 0, 0.12)"
                ></Box>
                <TextField
                  style={{
                    padding: "10px",
                    height: "200px",
                  }}
                  fullWidth
                  variant="standard"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  multiline
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  style={{
                    float: "right",
                    margin: "10px",
                    backgroundColor: "#00008B",
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatFrame;
