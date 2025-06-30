"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { Header } from "@/common/components";

export function ChatView() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input.trim()]);
    setInput("");
  };

  return (
    <Box>
      <Header
        title="Chat de usuarios"
        description="Comun\u00edcate con otros usuarios en tiempo real"
        icon={<ChatBubbleOutlineIcon fontSize="large" color="primary" />}
      />

      <Paper sx={{ p: 2 }}>
        <List sx={{ maxHeight: 300, overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={msg} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", mt: 2 }}>
          <TextField
            label="Escribe un mensaje"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            size="small"
          />
          <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
