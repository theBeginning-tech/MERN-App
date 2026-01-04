import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:8081/api/auth/signup",
        formData
      );
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup Page</h2>
        <p>Create Account</p>

        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="signup-button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>

        <div className="footer-text">
          Already have an account? <a href="/signIn">Sign in</a>
        </div>
      </div>
    </div>
  );
}
