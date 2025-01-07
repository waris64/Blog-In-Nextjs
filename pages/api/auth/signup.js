import connectMongo from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
    }
    const { name, email, password, role  } = req.body;
    if (!name || !email || !password || !role) {
        res.status(405).json({ message: "All fields are required " })
    }
    await connectMongo();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User.create({
        name,
        email,
        password: hashedPassword,
        role:role || 'Viewer    ',
    })
    await newUser.save();
    res.status(201).json({ message: 'User created ', user: newUser })
}