import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, []);
  const handleRegister = async () => {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      setName("");
      setEmail("");
      setPassword("");

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center vh-100"
      >  
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Enter Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            onClick={handleRegister}
          >
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;