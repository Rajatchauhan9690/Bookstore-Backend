import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected: ${connectionInstance.connection.host} `);
  } catch (error) {
    throw error;
  }
};

export default connectDB;
