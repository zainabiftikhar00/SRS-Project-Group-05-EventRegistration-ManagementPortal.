import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── IMPORTANT: Change this URL when you deploy your backend ───
const BACKEND_URL = "http://localhost:5000";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration Failed");
        setLoading(false);
        return;
      }

      setRegistered(true);

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server. Is your backend running?");
    }

    setLoading(false);
  };

  if (registered) {
    return (
      <div className="hero">
        <h1>Registration Successful 🎉</h1>
        <p>Your account has been created.</p>

        <div className="register-card">
          <p>Name: <strong>{name}</strong></p>
          <p>Email: <strong>{email}</strong></p>
          <p>Role: <strong>{role}</strong></p>

          <button
            className="explore-btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <h1>Create Account</h1>

      <div className="register-card">
        <form onSubmit={handleSubmit} className="register-form">

          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="text"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Choose Role</option>
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="explore-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#6b4c3c", fontWeight: "600" }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
