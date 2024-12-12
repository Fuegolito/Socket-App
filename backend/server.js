// const express= require('express')

import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { router } from "./router.js";
import { disconnect } from "process";
import {
  addUserInRoom,
  getRoom,
  getChatMessages,
  addMessageInRoom,
} from "./roomController.js";
import { addUser, addRoomInUser } from "./userController.js";
import mongoose from "mongoose";
import cors from "cors";
const SOCKET_SERVER_PORT = 5000;
const EXPRESS_SERVER_PORT = 4000
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let corsOptionsExpressServer = {
  origin: ["http://localhost:3000"],
};

const uri = process.env.MONOGODB_BASE_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri);
  console.log("db connected");
}


app.use(cors(corsOptionsExpressServer));
// Middleware to parse JSON bodies
app.use(express.json()); 
// Middleware to parse urlencoded bodies
app.use(express.urlencoded({ extended: true })); 

io.on('connection', (socket) =>
{
   console.log('a client connected')
   //joining the room
   socket.on("join", ({name ,room})=>{
        const {error, user}=addUserInRoom({id:socket.id , name, roomId:room})
        if(error)
            {
                console.log("username is taken")
            }
            socket.join(room)
        try
        {
            socket.broadcast.to(user?.room).emit('message',{user: 'admin', text:`${name?.current} Just entered room ${room?.current}`, time:new Date()})
        }
        catch(e)
        {
            console.error(e)
        }
    })
   //When a message is sent
   socket.on('sendMessage',(message,room,name, callback)=>{
        io.to(room).emit('message', {senderName:name, content:message})
        addMessageInRoom({message:message,roomId:room,sender:name})
   })
   socket.on('disconnect', ()=>{
    console.log("client left")
   })
})

app.post("/getchatmessages", async (req, res) => {
  console.log("in",req.body);
  let userName = req.body.userName;
  let roomId = req.body.roomId;
  let data = await getChatMessages(roomId, userName);
  console.log("data",data)
  if (data) 
    res.send(data)
  else
    res.send("no data found");

});

app.use(router)
app.listen(EXPRESS_SERVER_PORT, () => {
  console.log("Express server has started on port...", EXPRESS_SERVER_PORT);
});
server.listen(SOCKET_SERVER_PORT, () => {
  console.log("Socket server has started on port...", SOCKET_SERVER_PORT);
});
