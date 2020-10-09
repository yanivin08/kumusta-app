import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

//Chaneg ENDPOINT to URL of Heroku
const ENDPOINT = 'https://kumusta-na-aking-mahal.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

<<<<<<< HEAD
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
=======
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);
    
        setName(name)
        setRoom(room)
>>>>>>> c2e0b91de7e3ff27acdcc25e59563bc0a444daac

    socket = io(ENDPOINT);

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainerNotBulma">
      <div className="containerNotBulma">
        <InfoBar user={name} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
}

export default Chat;