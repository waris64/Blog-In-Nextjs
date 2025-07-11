import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected while hittng del request ")
  } catch (error) {
    console.error(error)
    return res.status(500).json({error:"Error while connecting mongodb"})
  }

  if (req.method === "DELETE") {

    // first get the id for deletion
    const { id } = req.query;
    console.log("Targeted ID for deletion : ", id )
    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    // Verify JWT token
/*  const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized action" });
      }
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
*/
    // Delete the blog
    try {
      console.log("hitting delete");
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (deletedBlog) {
        return res.status(200).json({ message: "Blog deleted successfully from db" });
      } else {
        return res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
