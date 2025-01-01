import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  // Connect to MongoDB
  try {
    await connectMongo();
    console.log("Mongo connected for DELETE request");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    return res.status(500).json({ message: "Failed to connect to MongoDB" });
  }

  // Handle DELETE request
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      // Check if ID is provided
      if (!id) {
        console.log("ID not provided in query");
        return res.status(400).json({ message: "Blog ID is required" });
      }

      console.log("Deleting blog with ID:", id);

      // Find and delete the blog
      const deleteBlog = await Blog.findByIdAndDelete(id);

      if (!deleteBlog) {
        console.log("Blog not found for deletion");
        return res.status(404).json({ message: "Blog not found" });
      }

      console.log("Blog deleted successfully:", deleteBlog);
      res.status(200).json({ message: "Blog deleted successfully", blog: deleteBlog });
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      res.status(500).json({ message: "Failed to delete blog", error: error.message });
    }
  } else {
    // Handle unsupported methods
    console.log("Method not allowed:", req.method);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
