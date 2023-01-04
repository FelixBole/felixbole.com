import mongoose from "mongoose";

export const setupDB = () => {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.set("strictQuery", false);
    const db = mongoose.connection;
    db.on("error", () => {
        // eslint-disable-next-line no-console
        console.log("MongoDB connection error");
    });
    return db;
};
