import mongoose from "mongoose";
import { Connection } from "./types";

const connection: Connection = {};

export const connectToDB = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        const db = await mongoose.connect(process.env.MONGO_URL);
        connection.isConnected = db.connections[0].readyState;
        console.log("New connection established");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}