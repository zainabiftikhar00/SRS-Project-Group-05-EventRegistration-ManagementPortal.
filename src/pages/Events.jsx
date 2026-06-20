import { Link } from "react-router-dom";

function Events() {

const events = [
{
id: 1,
title: "Tech Conference 2026",
venue: "Islamabad",
date: "25 June 2026",
category: "Technology",
seats: 120
},
{
id: 2,
title: "AI Workshop",
venue: "Rawalpindi",
date: "30 June 2026",
category: "Artificial Intelligence",
seats: 80
},
{
id: 3,
title: "Sports Gala",
venue: "NUST",
date: "10 July 2026",
category: "Sports",
seats: 300
}
];

return (

<div className="container">

<h1
style={{
marginBottom:"40px",
textAlign:"center",
fontSize:"52px"
}}
>
Upcoming Events
</h1>

<div className="row">

{events.map((event)=>(

<div
key={event.id}
>

<div className="card">

<h3>{event.title}</h3>

<p>
<strong>📍 Venue:</strong>
{" "}
{event.venue}
</p>

<p>
<strong>📅 Date:</strong>
{" "}
{event.date}
</p>

<p>
<strong>🏷 Category:</strong>
{" "}
{event.category}
</p>

<p>
<strong>🎟 Seats:</strong>
{" "}
{event.seats}
</p>

<Link
to={`/events/${event.id}`}
style={{
textDecoration:"none"
}}
>

<button>

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
