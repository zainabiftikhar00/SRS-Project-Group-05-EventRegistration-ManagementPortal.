import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:5000";

function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

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

  const handleRegister = async () => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      alert("Please login first to register for an event.");
      navigate("/login");
      return;
    }

    setRegistering(true);

    const user = JSON.parse(stored);

    try {
      const response = await fetch(`${BACKEND_URL}/event-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          event_id: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed.");
        setRegistering(false);
        return;
      }

      setRegistered(true);

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server.");
    }

    setRegistering(false);
  };

  const displayPrice =
    event?.price !== null &&
    event?.price !== undefined
      ? `PKR ${event.price}`
      : "Free";

  if (loading)
    return (
      <div className="hero">
        <h2>Loading event...</h2>
      </div>
    );

  if (!event || event.message === "Event not found.") {
    return (
      <div className="hero">
        <h1>Event Not Found</h1>

        <button
          className="explore-btn"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </button>
      </div>
    );
  }

  if (registered) {
    return (
      <div className="hero">
        <h1>Registration Successful 🎉</h1>

        <p>
          You have registered for <strong>{event.title}</strong>.
        </p>

        <p>📍 {event.venue}</p>

        <p>
          📅{" "}
          {event.event_date
            ? new Date(event.event_date).toLocaleDateString()
            : "TBA"}
        </p>

        <p>
          💰 Ticket Price: <strong>{displayPrice}</strong>
        </p>

        <button
          className="explore-btn"
          onClick={() => navigate("/my-tickets")}
          style={{ marginTop: "20px" }}
        >
          View My Tickets
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

  return (
    <div className="hero">
      <h1>{event.title}</h1>

      <p>📍 {event.venue || "Venue TBA"}</p>

      <p>
        📅{" "}
        {event.event_date
          ? new Date(event.event_date).toLocaleDateString()
          : "Date TBA"}
      </p>

      <p>🏷 Category: {event.category || "General"}</p>

      <p>
        🎟 Total Seats: <strong>{event.capacity}</strong>
      </p>

      <p>
        💰 Ticket Price: <strong>{displayPrice}</strong>
      </p>

      <p style={{ maxWidth: "600px", margin: "16px auto" }}>
        {event.description}
      </p>

      <p>
        Status:{" "}
        <strong style={{ textTransform: "capitalize" }}>
          {event.status}
        </strong>
      </p>

      <button
        className="explore-btn"
        style={{ marginTop: "20px" }}
        onClick={handleRegister}
        disabled={registering}
      >
        {registering ? "Registering..." : "Register Now"}
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
