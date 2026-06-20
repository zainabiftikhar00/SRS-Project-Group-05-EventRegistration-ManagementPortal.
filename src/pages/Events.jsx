function Events() {

  const events = [
    {
      id: 1,
      title: "Tech Conference 2026",
      venue: "Islamabad",
      date: "25 June 2026"
    },
    {
      id: 2,
      title: "AI Workshop",
      venue: "Rawalpindi",
      date: "30 June 2026"
    },
    {
      id: 3,
      title: "Sports Gala",
      venue: "NUST",
      date: "10 July 2026"
    }
  ];

  return (
    <div style={{ padding: "20px" }}>

      <h1>Upcoming Events</h1>

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>{event.title}</h3>
          <p>Venue: {event.venue}</p>
          <p>Date: {event.date}</p>

          <button>Register</button>
        </div>
      ))}

    </div>
  );
}

export default Events;
