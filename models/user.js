import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Enforce unique username
  },
  profilePic: String,
  coverPic: String,
  razorpayId: String,
  razorpaySecret: String,
  name: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
