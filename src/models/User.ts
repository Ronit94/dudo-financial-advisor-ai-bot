// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  role: { type: String, default: "user" },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);