import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">
            Login
          </h2>

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
            className="btn btn-success w-100"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;