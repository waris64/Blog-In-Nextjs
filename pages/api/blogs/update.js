import connectMongo from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
export default async function handler(req, res) {
    // Ensure MongoDB connection.
    await connectMongo();

    if (req.method === "PATCH") {
        try {
            const { id } = req.query; // Extract blog ID from query.
            const { title, content, author } = req.body; // Extract fields from body.

            // Log details for debugging.
            console.log("Received ID for update:", id);
            console.log(" fields for updating:", { title, content, author });

            // Validate ID.
            if (!id) {
                console.log("Blog ID not found for update.");
                return res.status(400).json({ message: "Blog ID is required." });
            }

            // Construct updated data object.
            const updatedData = {};
            if (title) updatedData.title = title;
            if (content) updatedData.content = content;
            if (author) updatedData.author = author;

            // Ensure there's at least one field to update.
            if (Object.keys(updatedData).length === 0) {
                console.log("No update fields provided.");
                return res.status(400).json({ message: "At least one field is required for update." });
            }

            // Perform the update.
            const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
                new: true, // Return the updated document.
                runValidators: true, // Ensure validators are run.
            });

            // Handle cases where the blog is not found.
            if (!updatedBlog) {
                console.log("Blog not found for update:", id);
                return res.status(404).json({ message: "Blog not found." });
            }

            // Log success and return the updated blog.
            console.log("Blog updated successfully:", updatedBlog);
            return res.status(200).json({ message: "Blog updated successfully.", blog: updatedBlog });
        } catch (error) {
            console.error("Error updating blog:", error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    } else {
        // Handle unsupported methods.
        console.log("Invalid method for update request.");
        return res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
}
