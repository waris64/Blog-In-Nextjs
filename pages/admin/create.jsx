import { Router, useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Update the specific field
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, content, author } = formData;
    if (!title || !content || !author ) {
      toast.error('Fill all  details');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/blogs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.ok) {
        setFormData({ title: "", content: "", author: ""}); // Reset form data
        toast.success("Blog created successfully");
        router.push("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className=" max-w-screen bg-white  ">
      <h1 className="text-2xl text-center py-3">Blog Post Form</h1>
      <form
        className="border rounded px-8 py-4 m-auto w-1/2"
        onSubmit={handleSubmit}
      >
        <div>
          <span className="text-xl block">Title: </span>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            className=" border rounded px-4 mt-1  py-1 max-w-full"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span className="text-xl pt-2 pb-2 block">Content: </span>
          <textarea
            rows={4}
            name="content"
            value={formData.content}
            placeholder="Enter blog content"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded resize-none"
            required
          ></textarea>
        </div>
        <div>
          <span className="text-xl pt-2 block">Author: </span>
          <input
            type="text"
            name="author"
            className="border px-4 py-2 mt-1 rounded max-w-full"
            value={formData.author}
            placeholder="Enter author name"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 border rounded mt-4 hover:bg-slate-100 cursor-pointer"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
        <Toaster />
      </form>
    </div>
  );
}