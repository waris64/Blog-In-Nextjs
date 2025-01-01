import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongo();
      const blogs = await Blog.find(); // Fetch all blogs
      console.log('here is the blogs data : ' , blogs)
      res.status(200).json(blogs); // Return blogs
    } catch (error) {
      console.log('catch executed from api>index');
      res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
  } else {
    console.log('Else executed from api >blogs')
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
