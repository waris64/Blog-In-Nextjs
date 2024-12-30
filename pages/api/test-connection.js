import connectMongo from "../../lib/mongodb";


export default async function handler(req, res) {
    try {
        await connectMongo(); // Establish connection
        console.log("MongoDB connected");

        // Send a response to indicate success
        res.status(200).json({ message: "MongoDB connected successfully" });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        res.status(500).json({ message: "Failed to connect to MongoDB", error: error.message });
    }
}
