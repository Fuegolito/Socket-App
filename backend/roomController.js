import { roomModel } from "./Schemas/RoomModel.js";

export const addUserInRoom = async ({ socketId, name, roomId }) => {
  let currentName = name.trim().toLowerCase();
  let currentRoomId = roomId.trim().toLowerCase();
  let currentRoom = await roomModel.findOne({roomId:currentRoomId})
  if (currentRoom === null || currentRoom === undefined) {
        currentRoom = await addRoom(currentRoomId)
        console.log("currentRoom",currentRoom)
  }
  const usersOfCurrentRoom = await getUsersInRoom(roomId)
  // if(usersOfCurrentRoom)
  currentRoom.users.push({name:currentName})
  await currentRoom.save()
  const user = { socketId, currentName, currentRoomId };
  //console.log("all users from users.js", currentRoom.users);
  return { user };
};


export  const getRoom = async (roomId) => {
  const room = await roomModel.findOne({roomId:roomId});
  return room;
};

export const addRoom = async (roomId) => {
    const newRoom = await roomModel.create({roomId:roomId , users:[]})
    return newRoom
};
export const getUsersInRoom = async (roomId) => 
    {
        const room = await roomModel.findOne({roomId:roomId})
        return room.users
    };
export const getChatMessages = async(roomId , userName) =>
  {
    const room = await roomModel.findOne({roomId:roomId})
    if(room)
    return room.chatMesasges
  else 
    return null
  }

export const addMessageInRoom = async ({message,roomId,sender}) =>{
    const room = await roomModel.findOne({roomId:roomId})
    room.chatMesasges.push({content:message,senderName:sender})
    await room.save()
}

