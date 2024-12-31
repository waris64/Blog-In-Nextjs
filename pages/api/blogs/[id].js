import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        try {
            await connectMongo();
            console.log(`fetching data of blog ${id} `);
            const blog = await Blog.findById(id);
            if (blog) {
                res.status(200).json({ message: "blog found " })
            } else if(req.method=== 'DELETE'){
                const deleteBlog = Blog.findByIdAndDelete(id);
                console.log(`Blog with id: ${id} deleted. `)
                res.status(400).json({ message: "Blog deleted successfuly " })
            }else{
                res.status(400).json({message:"method not allowed "})
            }
        } catch (error) {
            console.error('Erro fetching blog ', error);
            res.status(500).json({message:"Error fetching blog ", error:error.message})
        }
    } else {
        res.status(405).json({message:`Method ${req.method} not allowed . `})
     }
}