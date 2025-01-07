import React, { useState } from "react";
const Login=()=>{
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleSumit = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log('data token exist : ', data )
  if (response.ok) {
    localStorage.setItem("token", data.token);
    alert("Login Successful");
  } else {
    alert(data.error || "Login failed ");
  }
};
return (
  <div>
    <h2>Login Form</h2>
    <form onSubmit={handleSumit}>
      <>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Enter email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </>
      <>
        <label>Password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
      <button type="submit">Login</button>
    </form>
  </div>
)};
export default Login;