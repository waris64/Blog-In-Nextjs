import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  // Handle GET request
  if (req.method === "GET") {
    try {
      await connectMongo(); // Use the cached connection!
      console.log("Mongo connected for GET request");
      const blogs = await Blog.find({}); // Fetch all blogs
      if (blogs) {
        console.log('blogs fetched ')
        res.status(200).json(blogs);
      } else {
        console.log('Blogs did not fetched . ')
        res.status(400).json({ message: "no blogs found " })
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch the blogs.", error: error.message });
    }
  }
  // Method not allowed
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
