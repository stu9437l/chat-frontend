import React from "react";

const ChatHeader = ({ id, name, status, gender, email }) => {
  return (
    <div className="chatbox__header">
      <div className={`user ${status === "active" ? "online" : "offline"}`}>
        <div className="user__image">
          <img
            src={`https://avatars.dicebear.com/api/open-peeps/${gender}-${name}.svg`}
            alt={name}
            className="img--fluid"
          />
        </div>
        <div className="user__information">
          <h5 className="user__name">{name}</h5>
          <p className="user__status">{email} </p>
        </div>
      </div>
      <div className="chatbox__action-buttons">
        <a href="" className="action-button">
          <i className="fa-solid fa-phone"></i>
        </a>
        <a href="" className="action-button">
          <i className="fa-solid fa-video"></i>
        </a>
        <a href="" className="action-button">
          <i className="fa-solid fa-circle-info"></i>
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;
