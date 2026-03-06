
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      setMsg("Registration successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}