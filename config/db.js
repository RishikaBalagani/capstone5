const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000, 
        });

        console.log("✅ MongoDB Connected Successfully");

        mongoose.connection.on("disconnected", () => {
            console.log("⚠️ MongoDB Disconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
            process.exit(1);
        });

    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
