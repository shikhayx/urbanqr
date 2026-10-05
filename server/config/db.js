import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/urbanqr');
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.warn(`Tip: Ensure MongoDB daemon is running locally or specify MONGO_URI in server/.env`);
    // Do not exit in development to allow API route inspection
  }
};
