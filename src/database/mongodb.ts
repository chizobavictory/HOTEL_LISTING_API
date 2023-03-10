import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
export const connectDB = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL as string).then(() => {
      console.log("Connected to MongoDB Database");
    });
  } catch (error) {
    //console.log(error);
  }
};
export const connectTestDB = () => {
  try{
    MongoMemoryServer.create().then((mongo) => {
      const uri = mongo.getUri();
      mongoose.connect(uri).then(() => {
        //console.log("connected to testDB");
      });
    });
  }
  catch (error) {
    //console.log(error);
  }
};