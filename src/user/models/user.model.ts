import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface UserModel extends UserInterface, mongoose.Document {
  id: string;
}

export interface UserInterface {
  login: string;
  password?: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  role: string;
  createdAt?: Date;
}
