import { useState } from "react";
import Blog from "../../models/Blog";
export default async function CreateBlog() {
  const [formData, setformData] = useState({
    title: "",
    conent: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setLoading(true);
    setformData(e.target.data);
    setLoading(false);
    console.log("data saved in setData");
  };
  const response = fetch("api/blogs/add", {
    method: "post",
    data: "applicaton/json",
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Blog created successfuly");
    setformData({ title: "", content: "", author: "" });
  } else {
    alert("BLog cretion error ", data.error);
    console.log("Blog not created");
  }
  return (
    <div>
      <h1>Blog post form</h1>
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <span>Title: </span>
          <input
            type="text"
            name=""
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span>Content: </span>
          <textarea
            name="content"
            value={formData.conent}
            placeholder="Enter blog data"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <span>Author: </span>
          <input
            type="text"
            name="author-name"
            value={formData.author}
            placeholder="Enter author name "
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
}
