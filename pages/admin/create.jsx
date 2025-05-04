import { Router, useRouter } from "next/router";  
import { use, useState } from "react";
import toast , {Toaster} from 'react-hot-toast';
export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "", 
    author: "",
  });
  const [loading, setLoading] = useState(false);

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
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    const response = await fetch("/api/blogs/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    if (data.ok) {
      console.log("Blog created successfully, , here is the data : ");  
      toast.success("Blog created successfully");
      setFormData({ title: "", content: "", author: "" }); // Reset form data
      Router.push("/");
    } else {
      console.log("Blog creation error", data.error);
    }

    setLoading(false);
  };
  const router = useRouter();
  const handleClick =()=>{
    toast.success('Blog created successfully');
    router.push('/')
  }
  return (
    <div>
      <h1>Blog Post Form</h1>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* onSubmit should call handleSubmit */}
        <div>
          <span>Title: </span>
          <input
            type="text"
            name="title" // Set the name correctly to match the state
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span>Content: </span>
          <textarea
            name="content" // Set the name correctly to match the state
            value={formData.content} // Fixed typo here
            placeholder="Enter blog content"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <span>Author: </span>
          <input
            type="text"
            name="author" // Set the name correctly to match the state
            value={formData.author}
            placeholder="Enter author name"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
        <Toaster/>
      </form>
    </div>
  );
}
