import mongoose from "mongoose";

export const setupDB = () => {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.set("strictQuery", false);
    const db = mongoose.connection;
    return db;
};
