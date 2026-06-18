import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      alert("Registration Successful");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;