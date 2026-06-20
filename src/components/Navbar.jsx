import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>Event Portal</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
