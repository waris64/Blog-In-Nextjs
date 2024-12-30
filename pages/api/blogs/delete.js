import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            console.log('id mil gai',id)
            if (!id) {
                return res.status(400).json({ message: "blog id not found " })
            }
            const deleteBlog = await Blog.findByIdAndDelete(id);
            if (!deleteBlog) {
                return res.status(400).json({ message: "Your desired blog did not found " });
            } else {
                res.status(200).json({ message: `Blog ${deleteBlog} deleted successfully`, blog: deleteBlog })
            }
        } catch (error) {
            res.status(400).json({ message: "blog can't be added ", error:error.message })
        }
    }else{
        res.status(500).json({message:"method not allowed "})
    }
}