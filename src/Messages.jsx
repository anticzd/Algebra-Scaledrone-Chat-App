import React from "react";

const Messages = ({ messages, currentUser }) => {
  const renderMessage = (message) => {
    const { id, user, text } = message;
    const messageFromMe = user && user.id === currentUser.id;
    const className = messageFromMe ? "Messages currentUser" : "Messages";

    return (
      <li key={id} className={className}>
        <span
          className="icon"
          style={{ backgroundColor: user.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{user.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return <ul className="List">{messages.map((m) => renderMessage(m))}</ul>;
};

export default Messages;
