import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── IMPORTANT: Change this URL when you deploy your backend ───
const BACKEND_URL = "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login Failed");
        setLoading(false);
        return;
      }

      // Save user info so other pages can use it
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(`Welcome back, ${data.user.name}! Role: ${data.user.role}`);

      // Send admin/organizer to dashboard, attendees to events page
      if (data.user.role === "admin" || data.user.role === "organizer") {
        navigate("/dashboard");
      } else {
        navigate("/events");
      }

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server. Is your backend running?");
    }

    setLoading(false);
  };

  return (
    <div className="hero">
      <h1>Login</h1>

      <div className="register-card">
        <form onSubmit={handleSubmit} className="register-form">

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="explore-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#6b4c3c", fontWeight: "600" }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
