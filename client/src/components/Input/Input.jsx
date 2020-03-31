import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form>
      <TextField
        margin="normal"
        placeholder="Type a message. .. ..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <IconButton onClick={e => sendMessage(e)}>
        <Send />
      </IconButton>
    </form>
  );
};

export default Input;
