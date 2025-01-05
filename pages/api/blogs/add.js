import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Ensure MongoDB is connected.
      await connectMongo();
      console.log("Mongo connected while post request");

      // Destructure and validate the request body.
      const { title, content, author } = req.body;
      if (!title || !content || !author) {
        console.log("Fill all the details ");
        return res.status(400).json({ message: "Please fill all fields." });
      }

      // Create a new blog entry.
      const blog = new Blog({ title, content, author });
      await blog.save();
      console.log('Blog saved successfully ');

      // Respond with success.
      return res.status(201).json({ message: "Blog added successfully", blog });
    } catch (error) {
      console.error("Error saving blog:", error);
      // Check for specific Mongoose errors (e.g., timeout, validation errors)
      if (error.name === "MongooseError" && error.code === 11000) {
        // Handle duplicate key error (assuming you have unique constraints)
        return res.status(400).json({ message: "Duplicate blog entry detected." });
      }
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Handle unsupported methods.
    console.log('Mongo not connected while post request for add blog')
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}