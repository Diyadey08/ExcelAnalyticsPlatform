import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e, type = "login") => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert(`${type === "login" ? "Logged in" : "Registered"} successfully`);
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login / Register</h2>
      <form className="space-y-3">
        <input type="email" className="border p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="border p-2 w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={(e) => handleSubmit(e, "login")} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
        <button onClick={(e) => handleSubmit(e, "register")} className="bg-green-500 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}
