import { useState } from "react";

function Register() {

const [registered,setRegistered]=useState(false);

const [role,setRole]=useState("");

const handleSubmit=(e)=>{

e.preventDefault();

setRegistered(true);

};

if(registered){

return(

<div className="hero">

<h1>
Registration Successful 🎉
</h1>

<p>
Your seat has been reserved.
</p>

<div
className="register-card"
>

<p>

Role:
<strong>
{" "}
{role}
</strong>

</p>

<p>

Ticket:
<strong>

 PKR 1500

</strong>

</p>

</div>

</div>

);

}

return(

<div className="hero">

<h1>
Event Registration
</h1>

<div className="register-card">

<h3>

🎟 Ticket Price

</h3>

<p
style={{
fontSize:"28px",
marginBottom:"20px"
}}
>

PKR 1500

</p>

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
onChange={
(e)=>
setRole(e.target.value)
}
>

<option value="">
Choose Role
</option>

<option value="Participant">
Participant
</option>

<option value="Volunteer">
Volunteer
</option>

<option value="Organizer">
Organizer
</option>

</select>

<button
type="submit"
className="explore-btn"
>

Register

</button>

</form>

</div>

</div>

);

}

export default Register;
