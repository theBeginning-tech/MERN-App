import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login Page</h2>
        <p className="sub-text">Login to Your Account</p>

        <form id="loginForm">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-button" onClick={handleSubmit}>
            Sign In
          </button>
        </form>

        <div className="footer-link">
          New here? <a href="/">Create an account</a>
        </div>
      </div>
    </div>
  );
}
