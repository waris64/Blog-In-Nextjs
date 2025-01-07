import bcrypt from 'bcryptjs'
import generateToken from '../../../generateToken'
import User from "../../../models/User";
import connectMongo from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        console.log("Method not allowed");
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectMongo();
        console.log("Mongo connected for SignIn");

        const { email, password } = req.body;
        console.log(`SignIn attempt with email: ${email}`);

        if (!email || !password) {
            console.log("Missing login details");
            return res.status(400).json({ message: "Enter your login details" });
        }

        // Find the user by email
        const user = await User.findOne({ email }); // Ensure you await this call
        if (!user) {
            console.log("Email not found");
            return res.status(401).json({ message: "Email not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password); // Use `user.password` (from the database)
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({ message: "Enter the valid password" });
        }

        // Generate and return JWT token
        const token = generateToken(user);
        console.log("Login successful, token generated");
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
