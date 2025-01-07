import Blog from '../../../models/Blog';
import connectMongo from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "DELETE") {
    const { id } = req.query; // Use `req.query` for dynamic route parameters

    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
