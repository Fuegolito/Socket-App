import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
name:String,
rooms:Array,
});

export const userModel = mongoose.model("User", userSchema);
