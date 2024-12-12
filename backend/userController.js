import { userModel } from "./Schemas/UserModel.js";

export const addUser = async (name,socketId)=>
    {
       let newUser =  await userModel.create({name:name , socketId : socketId, rooms :[]})
       return newUser
    }
export const addRoomInUser = async (name,roomName)=>
    {
        let updatedUser = await userModel.findOne({name:name})
        updatedUser.rooms.push(roomName)
        await updatedUser.save()
    }