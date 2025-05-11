import { useEffect, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { deleteBlog } from "./delete";
export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  // Fetch blogs on page load
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs`);
        const data = await response.json();
        console.log("Heree is the data : " , data);
        setBlogs(data); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

const handleDelete=async (id)=>{
  const success = await deleteBlog(id);
  if(success){
    console.log("Here is the id : ", id)
   setBlogs(blogs.filter((blog)=>blog._id !== id)); 
  }
} 
  return (
<Suspense fallback={<h1>Loading ... </h1>}>
    <section>
      <h1 className="md:text-2xl text-center py-4">Admin Dashboard</h1>

      <Link href="/admin/create">
        <button className="py-2 px-4 bg-green-500 rounded  my-2 justify-end cursor-pointer" >Create New Blog</button>
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200 items-center">
          <thead className="justify-center">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Title </th>
              <th className="border border-gray-300 px-4 py-2">Content</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 ">
                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.content.substring(0, 50)}...</td>
                <td className="border border-gray-300 px-4 py-2">{blog.author}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.file}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link href={`/admin/edit?id=${blog._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={()=>handleDelete(blog._id)}  
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button> 
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No blogs available.</p>
      )}
    </section>
    </Suspense>
  );
}
