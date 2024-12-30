import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongo(); // Use the cached connection!
      console.log("Mongo connected for GET request");
      const blogs = await Blog.find({}); // Fetch all blogs
      console.log('blogs data fetched >> ',blogs);
      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({message:"failed to fetch the blogs. ", error:error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  if(req.method === 'PATCH'){
    try{
         await connectMongo();
         Blog.find({})
    }catch(error){

    }
  }
}