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
  } else if (req.method === "PATCH") {
    const { id } = req.query; // Extract blog ID from query.

    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    const { title, content, author } = req.body; // Extract fields for update

    // Construct the update data object
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (author) updateData.author = author;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "At least one field (title, content, author) is required to update" });
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators are run
      });

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
