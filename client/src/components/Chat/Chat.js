import React, { useState, useEffect } from "react";
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import './Chat.css';

const Chat = () => {

    return (
        <div className="outerContainer">
            <div className="container">
            <InfoBar />
            <Messages />
            </div>
        </div>
    );
  }
  
  export default Chat;