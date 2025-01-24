import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String },
  profilePic: { type: String },
  coverPic: { type: String },
  razorpayId: { type: String },
  razorpaySecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



// Check for an existing model before creating a new one
const User = mongoose.models.User || model("User", userSchema);

export default User;
