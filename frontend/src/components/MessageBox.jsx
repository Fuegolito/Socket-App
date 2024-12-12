import React from "react";
import "../styles/MessageBox.css";

const MessageBox = ({currentUser, message }) => {
  const sender = currentUser;
  console.log(message , " + " , currentUser)
  return (
    <>
      {sender === message.senderName ? (
        <div key={Math.random()*1000} className="message-box-container-send">
          <div className="message-box-send">{message.content}</div>
        </div>
      ) : null}
      {sender !== message.senderName ? (
        <div key={Math.random()*1000} className="message-box-container-receive">
          <div className="message-box-receive">{message.content}</div>
        </div>
      ) : null}
    </>
  );
};

export default MessageBox;
