import { Link } from "react-router-dom";

function Home(){

return(

<div className="hero">

<h1>
Event Registration &
Management Portal
</h1>

<p>
Discover exciting events and register online.
</p>

<Link to="/events">

<button className="explore-btn">

Explore Events

</button>

</Link>

<img
className="hero-image"
src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
/>

</div>

);

}

export default Home;
