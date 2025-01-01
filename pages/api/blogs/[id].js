import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongo(); // Ensure MongoDB is connected
      const { id } = req.query; // Extract `id` from query parameters
      if (!id) {
        return res.status(400).json({ message: "Blog ID is required" });
      }

      const blog = await Blog.findById(id); // Fetch blog by ID
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json(blog); // Return the blog data
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch the blog", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
