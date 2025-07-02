import mongoose from "mongoose";
import { MONGO_URL, NODE_ENV } from "../config/env.js";


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected db in ${NODE_ENV} mode`)
  }
  catch (err){
    console.log("ERROR connecting db", err)

    process.exit(1)
  }
}

export default connectDB