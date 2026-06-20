import { useParams, Link } from "react-router-dom";

function EventDetails() {

const { id } = useParams();

const events = [

{
id:1,
title:"Tech Conference 2026",
venue:"Islamabad",
date:"25 June 2026",
description:"Join tech experts and explore future innovations."
},

{
id:2,
title:"AI Workshop",
venue:"Rawalpindi",
date:"30 June 2026",
description:"Hands-on AI training and project building."
},

{
id:3,
title:"Sports Gala",
venue:"NUST",
date:"10 July 2026",
description:"Competitions and activities across sports."
}

];

const event =
events.find(
(e)=>
e.id===Number(id)
);

if(!event){

return <h2>Event not found</h2>;

}

return(

<div
className="hero"
>

<h1>
{event.title}
</h1>

<p>
📍 {event.venue}
</p>

<p>
📅 {event.date}
</p>

<p>
{event.description}
</p>

<Link
to="/register"
>

<button
className="explore-btn"
>

Register Now

</button>

</Link>

</div>

);

}

export default EventDetails;
