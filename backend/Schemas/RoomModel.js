import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomId: String, // String is shorthand for {type: String}
  users: [{ name: String}],
  chatMesasges: [
    {
      senderName: String,
      content: String,
    },
  ],
});

export const roomModel = mongoose.model("Room", roomSchema);
