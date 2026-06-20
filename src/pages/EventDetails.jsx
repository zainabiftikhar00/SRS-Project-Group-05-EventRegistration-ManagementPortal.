import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const events = [
    {
      id: 1,
      title: "Tech Conference 2026",
      venue: "Islamabad",
      date: "25 June 2026",
      description: "Join industry leaders and explore the latest technology trends."
    },
    {
      id: 2,
      title: "AI Workshop",
      venue: "Rawalpindi",
      date: "30 June 2026",
      description: "Learn Artificial Intelligence through practical workshops."
    },
    {
      id: 3,
      title: "Sports Gala",
      venue: "NUST",
      date: "10 July 2026",
      description: "Participate in exciting sports competitions and activities."
    }
  ];

  const event = events.find(
    (e) => e.id === Number(id)
  );

  if (!event) {
    return (
      <div className="hero">
        <h1>Event Not Found</h1>
      </div>
    );
  }

  return (
    <div className="hero">

      <h1>{event.title}</h1>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        {event.description}
      </p>

      <button
        className="explore-btn"
        onClick={() => navigate("/register")}
      >
        Register Now
      </button>

    </div>
  );
}

export default EventDetails;
