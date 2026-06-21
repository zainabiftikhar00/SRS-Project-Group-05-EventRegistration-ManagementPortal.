import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000";

function MyTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(stored);

    fetch(`${BACKEND_URL}/my-tickets/${user.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="hero"><h2>Loading your tickets...</h2></div>;

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <h1 style={{ color: "#6b4c3c", marginBottom: "30px" }}>My Tickets</h1>

      {tickets.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <p>You have not registered for any events yet.</p>
          <button className="explore-btn" style={{ marginTop: "16px" }}
            onClick={() => navigate("/events")}>
            Browse Events
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {tickets.map((ticket, index) => (
            <div key={index} style={{ background: "#fffdfa", padding: "24px 28px",
              borderRadius: "20px", boxShadow: "0 4px 16px rgba(0,0,0,.05)" }}>
              <h3 style={{ color: "#6b4c3c", marginBottom: "10px" }}>{ticket.event_title}</h3>
              <p>📍 {ticket.venue || "TBA"}</p>
              <p>📅 {ticket.event_date ? new Date(ticket.event_date).toLocaleDateString() : "TBA"}</p>
              <p>💰 Ticket Price: <strong>PKR {ticket.price || "Free"}</strong></p>
              <p>🎟 Quantity: <strong>{ticket.quantity}</strong></p>
              <p>✅ Status: <strong>{ticket.payment_status || "Confirmed"}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
