import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {

const navigate = useNavigate();

const { id } = useParams();

const events = [

{
id:1,
title:"Tech Conference 2026",
venue:"Islamabad",
date:"25 June 2026",
price:"PKR 1500",
description:"Join industry leaders and explore future technology."
},

{
id:2,
title:"AI Workshop",
venue:"Rawalpindi",
date:"30 June 2026",
price:"PKR 2000",
description:"Hands-on AI learning and activities."
},

{
id:3,
title:"Sports Gala",
venue:"NUST",
date:"10 July 2026",
price:"PKR 1000",
description:"Sports competitions and entertainment."
}

];

const event =
events.find(
e => e.id === Number(id)
);

if(!event){

return <h1>Event Not Found</h1>;

}

return(

<div className="hero">

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
🎟 Ticket Price:
<strong>
{" "}
{event.price}
</strong>
</p>

<p>
{event.description}
</p>

<button
className="explore-btn"
onClick={()=>
navigate("/register")
}
>

Register Now

</button>

</div>

);

}

export default EventDetails;