import { Router, useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    file:""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle File CHnage

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
       file:`./public/uploads/${files.file.newFilename}`
    })
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, content, author,file } = formData;
    console.log("Here is the data in frontend : ", formData)
    if (!title || !content || !author || !file) {
      toast.error('Fill all  details');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title",title);
      data.append('content',content);
      data.append('file',file);
      data.append('author',author);

      const response = await fetch("/api/blogs/add", {
        method: "POST",
        body:data,
      });
      const res = await response.json();
      if (res.success) {  
        toast.success("Blog created successfully");
        router.push("/");
      } else {
        console.log(data.message);
        toast.error(error)
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
 
  return (
    <div className=" w-screen  h-screen bg-slate-400 px-4  ">
      <h1 className="text-2xl text-center py-3">Blog Post Form</h1>
      <form
        className="border  px-8 py-10 m-auto w-1/2 bg-white shadow-lg rounded-2xl"
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
        <div>
          <span className="text-lg ">Choose Picture : </span> <br />
          <input type="file" name="file" id="" onChange={handleFileChange} className="px-4 py-2 border mt-2 w-52"/>
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