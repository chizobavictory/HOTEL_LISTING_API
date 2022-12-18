import mongoose, { Schema } from "mongoose";

interface UserInstance {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
}

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: Number },
  password: { type: String },
});

const User = mongoose.model<UserInstance>("User", userSchema);

export default User;
