import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState("");
  const handleSubmit = async () => {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "applicaton/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      alert(" Signup successful ");
      window.location.href("/auth/signup");
    } else {
      alert(data.error || "Signup failed");
    }
  };
  return (
    <div>
      <h1>Signup Form</h1>
      <form action="" onSubmit={handleSubmit} className="p-4">
        <>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </>
        <>
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </>
        <>
          <label>Password : </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <select value={formData.role} onChange={(e) => setFormData({...formData,role:e.target.value})}>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
          </select>
        </>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
