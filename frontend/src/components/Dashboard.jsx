import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.jsx";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [protectedData, setProtectedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Profile fetch failed", err));

    api
      .get("/data")
      .then((res) => {
        setProtectedData(res.data.payload);
      })
      .catch((err) => console.error("Data fetch failed", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  if (!user) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="header-title">
            <h1>Dashboard Page</h1>
            <p>Dashboard (Protected)</p>
          </div>
          <button className="logout-link" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-content">
          <div className="content-box">
            <h3>Welcome, {user.name}</h3>
            <p>Your profile details:</p>
            <ul className="profile-list">
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>ID:</strong> {user.id}
              </li>
            </ul>
          </div>

          <div className="content-box">
            <h3>Sample Protected API Data</h3>
            <ul className="api-data-list">
              {protectedData.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
