import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function GET(req, res) {
  try {
    // Establish a connection to MongoDB
    await connectMongo();

    // Fetch blogs with lean() to ensure they are plain JavaScript objects
    const blogs = await Blog.find().lean();


    // Return the blogs data as JSON
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Blogs data fetching error through API:', error);

    // Respond with an error status and message
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
  console.log("Request received:", req.method, req.body);
  console.log("Connected to MongoDB");

}
