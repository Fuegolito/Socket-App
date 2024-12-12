import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import MessageBox from "../components/MessageBox"
import "../styles/Tab.css"
import axios from "axios"
const ENDPOINT = "http://localhost:5000";
const EXPRESS_SERVER_ENDPOINT = "http://localhost:4000"
let socket;

const Tab = () => {

  const [name,setName] = useState()
  const [room,setRoom] = useState() 
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const params = new URL(document.location).searchParams;

  const [message, setMessage] = useState("");
  useEffect(() => {
    setName(params.get("name"))
    setRoom(params.get("room"))
    let currName = params.get("name")
    let currRoom = params.get("room")
    axios.post(EXPRESS_SERVER_ENDPOINT+'/getchatmessages',{userName:currName,roomId:currRoom}).then((response) => {
      setMessages(response.data)
    });
    socket = io(ENDPOINT);
    console.log("from chat inside useffect",name, room)
    socket.emit("join", { name:currName, room:currRoom });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    });
    messageEndRef.current?.scrollIntoView();
    console.log("messagesarray", messages);
  }, [messages]);


  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, room, name);
    }
    setMessage("");
  };

  return (
    <div className="tab-container">
        <div className="tab-body">
          <div className="message-container">
            {messages.map((message) => {
              return (
                <MessageBox
                  key={message.time}
                  currentUser={name}
                  message={message}
                />
              );
            })}
            <div ref={messageEndRef} />
          </div>
          <div className="message-form">
            <input
              type="text"
              className="input-textarea"
              value={message}
              onChange={handleChange}
              placeholder="Type a message ..."
              required
            />
            <button
              type="sumbit"
              className="send-button"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
  )
}

export default Tab
