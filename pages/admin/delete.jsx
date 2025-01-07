// pages/admin/DeleteBlog.js

import { useRouter } from "next/router";

export default function DeleteBlog() {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    if (!id) {
      alert("Invalid blog ID.");
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.ok) {
        alert("Blog deleted successfully!");
        router.push("/admin"); // Redirect to admin dashboard
      } else {
        alert(`Failed to delete blog: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  return (
    <div>
       <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <small>Author: {blog.author}</small>
      <br />
      <button onClick={handleDelete}>Delete Blog</button>
    </div>
  );
}
