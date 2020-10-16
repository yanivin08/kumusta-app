import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
import UserStore from '../UserStore'
import { Redirect, Link } from "react-router-dom";

const ENDPOINT = window.location.origin;

let socket;

const Chat = ( {location} ) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      async function auth() {
        const result = await (await fetch('/user/auth', { 
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${UserStore.access_token}`
          }
        })).json();

        if (!result.data){
          return ( <Redirect to={`/`}></Redirect> )
        }
      }
      auth();
    }, []); // Added authorization when connecting to chat

    useEffect(() => {
//       const { name, room } = queryString.parse(location.search);
      const name = UserStore.username;
      const room = 'default room';
        
      socket = io(ENDPOINT);
  
        setName(name);
        setRoom(room);
      
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      
    }, [ENDPOINT, location.search]);

    useEffect(() => {
      socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });

    }, []);

    const sendMessage = (event) => {
      event.preventDefault();
  
      if(message) {
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    }

    if ( name === '') {
      return (
        <div>
          <div className="notification is-danger">
            User not logged in.
          </div>
          
          <Link to="/" className="button is-info">LOG IN</Link>
        </div>
      )
    }
    else if ( UserStore.isLoggedIn && UserStore.username === name ) {
      return (
        <div className="outerContainerNotBulma">
            <div className="containerNotBulma">
                <InfoBar user={name}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
      )
    }
    else {
      return (
        <Redirect to={`/`}></Redirect>
      )
    }
}

export default Chat;
