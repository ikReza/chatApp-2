import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import NavbarComponent from "../Navbar/Navbar";
import MessageComponent from "../Messages/Messages";
import InputComponent from "../Input/Input";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:4000";

  //1st -> handling connect/disconnect
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    console.log(socket);

    socket.emit("join", { name, room });

    //cleanup - unmounting
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  //2nd -> handling messages
  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    return () => {};
  }, [messages]);

  //function for sending message
  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  //console.log(messages, message);

  return (
    <div className="container">
      <NavbarComponent room={room} />
      <MessageComponent messages={messages} name={name} />
      <InputComponent
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
