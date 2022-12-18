import mongoose, { Schema } from "mongoose";

interface hotelInstance {
  id: string;
  userId: string;
  description: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfBaths: number;
  ratings: number;
}

const hotelSchema = new Schema({
  userId: { type: String },
  description: { type: String },
  image: { type: String },
  address: { type: String },
  price: { type: Number },
  numOfBeds: { type: Number },
  numOfBaths: { type: Number },
  ratings: { type: Number },
});

const Hotel = mongoose.model<hotelInstance>("Hotel", hotelSchema);

export default Hotel;
