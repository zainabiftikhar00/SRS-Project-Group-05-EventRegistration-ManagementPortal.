import { useState } from "react";

function Register() {

const [registered, setRegistered] =
useState(false);

function handleSubmit(e){

e.preventDefault();

setRegistered(true);

}

if(registered){

return(

<div className="hero">

<h1>
Registration Successful 🎉
</h1>

<p>
You are registered for the event.
</p>

</div>

);

}

return(

<div className="hero">

<h1>
Register
</h1>

<form
onSubmit={handleSubmit}
style={{
display:"flex",
flexDirection:"column",
gap:"15px",
width:"350px"
}}
>

<input
type="text"
placeholder="Your Name"
required
/>

<input
type="email"
placeholder="Email"
required
/>

<button
type="submit"
className="explore-btn"
>

Register

</button>

</form>

</div>

);

}

export default Register;
