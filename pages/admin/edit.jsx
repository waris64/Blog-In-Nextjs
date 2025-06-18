import { useState } from "react";
import { useRouter } from "next/router";

export default function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query; 
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    file:""
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
//Handle file change
const handleFileChange=(e)=>{
  setFormData({
    ...formData,
    files:e.target.files[0]
  })
}
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
     // setting the fetched blog title in the title field
     
      if (response.ok) {
        alert("Data updated successfully!");
        router.push("/admin"); // Redirect to the admin page or another page
      } else {
        const errorData = await response.json();
        alert(`Error updating data: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Update Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter the blog title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 font-medium">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter the blog content"
            required
          ></textarea>
        </div>
        <input className="border px-2 py-2" type='file' onChange={handleFileChange}/>
        <div>
          <label htmlFor="author" className="block text-gray-700 font-medium">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter the author's name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium shadow hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
