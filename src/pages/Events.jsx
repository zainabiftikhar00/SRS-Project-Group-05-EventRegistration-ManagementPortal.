import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ─── IMPORTANT: Change this URL when you deploy your backend ───
const BACKEND_URL = "http://localhost:5000";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>
        <h2>Loading events...</h2>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>
        <h2>No events found.</h2>
        <p>Check back later or add events from the Dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          fontSize: "54px",
          marginBottom: "50px",
          color: "#6b4c3c",
          fontWeight: "800",
        }}
      >
        Upcoming Events
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
          gap: "30px",
        }}
      >
        {events.map((event) => (
          <div key={event.id}>
            <div
              className="card"
              style={{
                background: "#fffdfa",
                padding: "32px",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,.06)",
                display: "flex",
                flexDirection: "column",
                minHeight: "320px",
              }}
            >
              <h3 style={{ fontSize: "28px", marginBottom: "20px", color: "#6b4c3c" }}>
                {event.title}
              </h3>

              <p style={{ marginBottom: "12px" }}>
                📍 Venue: {event.venue || "Coming Soon"}
              </p>

              <p style={{ marginBottom: "12px" }}>
                📅 Date: {event.event_date ? new Date(event.event_date).toLocaleDateString() : "TBA"}
              </p>

              <p style={{ marginBottom: "12px" }}>
                🏷 Category: {event.category || "General"}
              </p>

              <p style={{ marginBottom: "30px" }}>
                🎟 Seats: {event.capacity || "Open"}
              </p>

              <Link
                to={`/events/${event.id}`}
                style={{ marginTop: "auto", textDecoration: "none" }}
              >
                <button
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg,#c89f94,#ddb7a8)",
                    border: "none",
                    padding: "16px",
                    color: "white",
                    borderRadius: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
