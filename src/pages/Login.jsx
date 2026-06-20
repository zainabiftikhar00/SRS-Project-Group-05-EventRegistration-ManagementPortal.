import { useState } from "react";

function Login() {

const [loggedIn, setLoggedIn] =
useState(false);

const [role, setRole] =
useState("");

function handleSubmit(e){

e.preventDefault();

setLoggedIn(true);

}

if(loggedIn){

return(

<div className="hero">

<h1>
Login Successful 🎉
</h1>

<p>
Welcome back!
</p>

<p>

Role:
<strong>

{" "}
{role}

</strong>

</p>

</div>

);

}

return(

<div className="hero">

<h1>
Login / Sign Up
</h1>

<div className="register-card">

<form
onSubmit={handleSubmit}
className="register-form"
>

<input
type="text"
placeholder="Full Name"
required
/>

<input
type="email"
placeholder="Email"
required
/>

<select
required
value={role}
onChange={(e)=>
setRole(e.target.value)
}
>

<option value="">
Choose Role
</option>

<option value="Admin">
Admin
</option>

<option value="Attendee">
Attendee
</option>

<option value="Organizer">
Organizer
</option>

</select>

<button
type="submit"
className="explore-btn"
>

Login

</button>

</form>

</div>

</div>

);

}

export default Login;
