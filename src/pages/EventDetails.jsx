import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ─── IMPORTANT: Change this URL when you deploy your backend ───
const BACKEND_URL = "http://localhost:5000";

function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="hero">
        <h2>Loading event...</h2>
      </div>
    );
  }

  if (!event || event.message === "Event not found.") {
    return (
      <div className="hero">
        <h1>Event Not Found</h1>
        <button className="explore-btn" onClick={() => navigate("/events")}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="hero">
      <h1>{event.title}</h1>

      <p>📍 {event.venue || "Venue TBA"}</p>

      <p>
        📅 {event.event_date ? new Date(event.event_date).toLocaleDateString() : "Date TBA"}
      </p>

      <p>🏷 Category: {event.category || "General"}</p>

      <p>🎟 Total Seats: <strong>{event.capacity}</strong></p>

      <p style={{ maxWidth: "600px", margin: "16px auto" }}>
        {event.description}
      </p>

      <p>
        Status:{" "}
        <strong style={{ textTransform: "capitalize" }}>{event.status}</strong>
      </p>

      <button
        className="explore-btn"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/register")}
      >
        Register Now
      </button>

      <button
        onClick={() => navigate("/events")}
        style={{
          marginTop: "12px",
          background: "none",
          border: "2px solid #6b4c3c",
          color: "#6b4c3c",
          padding: "12px 32px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "600",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        ← Back to Events
      </button>
    </div>
  );
}

export default EventDetails;

