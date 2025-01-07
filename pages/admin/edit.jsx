import { useState } from "react";
export default async function handler() {
    const {id} = req.query;
console.log("id is : ", id);

    
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.title]: e.target.value,
      [e.target.content]: e.target.value,
      [e.target.author]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = await fetch("/api/blogs/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: await JSON.parse(JSON.stringify(formData)),
    });

    const data = async () => await updatedData.json();
    if (updatedData.ok) {
      setFormData({ title: "", content: "", author: "" });
      alert("Data updated successfully. ");
    } else {
      alert("Data updating error", data.error);
    }
    setLoading(false);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <>
          <label>Title:</label>
          <br />
          <input type="text" value={(e) => setTitle(e.target.value)} />
        </>
        <>
          <label>Content:</label>
          <br />
          <textarea type="text" value={(e) => setContent(e.target.value)} />
        </>
        <>
          <label>Author:</label>
          <br />
          <input type="text" value={(e) => setAuthor(e.target.value)} />
        </>
      </form>
    </div>
  );
}
