import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── IMPORTANT: Change this URL when you deploy your backend ───
const BACKEND_URL = "http://localhost:5000";

// Empty form template
const emptyForm = {
  title: "",
  description: "",
  category: "",
  venue: "",
  event_date: "",
  event_time: "",
  capacity: "",
  status: "upcoming",
};

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding new, number = editing
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // ── On page load, check if user is logged in ──
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(stored);

    if (parsedUser.role !== "admin" && parsedUser.role !== "organizer") {
      alert("You do not have permission to access the Dashboard.");
      navigate("/events");
      return;
    }

    setUser(parsedUser);
    loadEvents();
  }, []);

  // ── Fetch all events from backend ──
  const loadEvents = () => {
    setLoading(true);
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
  };

  // ── Handle form input changes ──
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Open blank form to ADD a new event ──
  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  // ── Open pre-filled form to EDIT an event ──
  const openEditForm = (event) => {
    setForm({
      title: event.title || "",
      description: event.description || "",
      category: event.category || "",
      venue: event.venue || "",
      // Convert date to YYYY-MM-DD format for the date input
      event_date: event.event_date ? event.event_date.slice(0, 10) : "",
      event_time: event.event_time || "",
      capacity: event.capacity || "",
      status: event.status || "upcoming",
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  // ── SAVE: handles both Add and Edit ──
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // We need organizer_id when adding a new event
    const body = {
      ...form,
      organizer_id: user.user_id,
    };

    try {
      let response;

      if (editingId === null) {
        // ADD new event
        response = await fetch(`${BACKEND_URL}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        // EDIT existing event
        response = await fetch(`${BACKEND_URL}/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        setSaving(false);
        return;
      }

      alert(data.message);
      setShowForm(false);
      loadEvents(); // Refresh the list

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server. Is your backend running?");
    }

    setSaving(false);
  };

  // ── DELETE an event ──
  const handleDelete = async (eventId, eventTitle) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${eventTitle}"?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`${BACKEND_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed.");
        return;
      }

      alert(data.message);
      loadEvents(); // Refresh the list

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server. Is your backend running?");
    }
  };

  // ── Logout ──
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ── Show loading while checking login ──
  if (!user) {
    return <div className="hero"><h2>Checking access...</h2></div>;
  }

  return (
    <div className="container" style={{ paddingTop: "40px" }}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ color: "#6b4c3c", marginBottom: "4px" }}>Dashboard</h1>
          <p>Welcome, <strong>{user.name}</strong> — Role: <strong style={{ textTransform: "capitalize" }}>{user.role}</strong></p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={openAddForm}
            style={{
              background: "linear-gradient(90deg,#c89f94,#ddb7a8)",
              border: "none",
              padding: "12px 24px",
              color: "white",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            + Add New Event
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "2px solid #6b4c3c",
              color: "#6b4c3c",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ── Add / Edit Form ── */}
      {showForm && (
        <div
          style={{
            background: "#fffdfa",
            padding: "36px",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            marginBottom: "40px",
            maxWidth: "700px",
          }}
        >
          <h2 style={{ color: "#6b4c3c", marginBottom: "24px" }}>
            {editingId === null ? "Add New Event" : "Edit Event"}
          </h2>

          <form onSubmit={handleSave} className="register-form">

            <input
              type="text"
              name="title"
              placeholder="Event Title *"
              required
              value={form.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1.5px solid #e0d6d0",
                fontSize: "15px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />

            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Tech, Sports, Music)"
              value={form.category}
              onChange={handleChange}
            />

            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={form.venue}
              onChange={handleChange}
            />

            <label style={{ fontWeight: "600", color: "#6b4c3c" }}>
              Event Date *
              <input
                type="date"
                name="event_date"
                required
                value={form.event_date}
                onChange={handleChange}
                style={{ marginTop: "6px" }}
              />
            </label>

            <label style={{ fontWeight: "600", color: "#6b4c3c" }}>
              Event Time
              <input
                type="time"
                name="event_time"
                value={form.event_time}
                onChange={handleChange}
                style={{ marginTop: "6px" }}
              />
            </label>

            <input
              type="number"
              name="capacity"
              placeholder="Capacity (number of seats) *"
              required
              min={1}
              value={form.capacity}
              onChange={handleChange}
            />

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button type="submit" className="explore-btn" disabled={saving} style={{ flex: 1 }}>
                {saving ? "Saving..." : (editingId === null ? "Add Event" : "Save Changes")}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  background: "none",
                  border: "2px solid #6b4c3c",
                  color: "#6b4c3c",
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Events List ── */}
      <h2 style={{ color: "#6b4c3c", marginBottom: "24px" }}>All Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events yet. Click "Add New Event" to create one.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                background: "#fffdfa",
                padding: "24px 28px",
                borderRadius: "20px",
                boxShadow: "0 4px 16px rgba(0,0,0,.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h3 style={{ color: "#6b4c3c", marginBottom: "6px" }}>{event.title}</h3>
                <p style={{ margin: 0, color: "#888" }}>
                  📅 {event.event_date ? new Date(event.event_date).toLocaleDateString() : "TBA"} &nbsp;|&nbsp;
                  📍 {event.venue || "TBA"} &nbsp;|&nbsp;
                  🏷 {event.category || "General"} &nbsp;|&nbsp;
                  🎟 {event.capacity} seats &nbsp;|&nbsp;
                  <span style={{ textTransform: "capitalize" }}>Status: {event.status}</span>
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => openEditForm(event)}
                  style={{
                    background: "#fff3ee",
                    border: "1.5px solid #c89f94",
                    color: "#6b4c3c",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                {/* Only admin can delete */}
                {user.role === "admin" && (
                  <button
                    onClick={() => handleDelete(event.id, event.title)}
                    style={{
                      background: "#fff0f0",
                      border: "1.5px solid #e88",
                      color: "#c00",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
