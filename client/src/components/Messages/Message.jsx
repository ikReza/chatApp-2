import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="justifyEnd">
      <p>{trimmedName}</p>
      <div>
        <p className="colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="justifyStart">
      <div>
        <p className="colorDark">{text}</p>
      </div>
      <p>{user}</p>
    </div>
  );
};

export default Message;
