import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if a user is logged in
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <h2 style={{ color: "#6b4c3c", margin: 0 }}>Event Portal</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {user ? (
          <>
            {/* Show Dashboard only for admin and organizer */}
            {(user.role === "admin" || user.role === "organizer") && (
              <Link to="/dashboard">Dashboard</Link>
            )}

            {user.role === "attendee" && (
            <Link to="/my-tickets">My Tickets</Link>
            )}
            
            <span style={{ color: "#6b4c3c", fontWeight: "600" }}>
              Hi, {user.name.split(" ")[0]}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1.5px solid #6b4c3c",
                color: "#6b4c3c",
                padding: "6px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

