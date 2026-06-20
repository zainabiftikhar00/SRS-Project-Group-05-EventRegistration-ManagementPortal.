import { useState } from "react";

function Register() {

const [registered, setRegistered] =
useState(false);

const [role, setRole] =
useState("");

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
Thank you for registering.
</p>

<p>
Role:
{" "}
<strong>
{role}
</strong>
</p>

</div>

);

}

return(

<div className="hero">

<h1>
Register For Event
</h1>

<p>
Ticket Price:
<strong>
 PKR 1500
</strong>
</p>

<form

onSubmit={handleSubmit}

style={{

display:"flex",

flexDirection:"column",

gap:"18px",

width:"420px",

background:
"rgba(255,255,255,.6)",

padding:"30px",

borderRadius:"24px",

boxShadow:
"0 10px 30px rgba(0,0,0,.08)"

}}

>

<input

type="text"

placeholder="Full Name"

required

style={inputStyle}

/>

<input

type="email"

placeholder="Email"

required

style={inputStyle}

/>

<select

required

value={role}

onChange={
(e)=>
setRole(e.target.value)
}

style={inputStyle}

>

<option value="">

Select Role

</option>

<option>

Participant

</option>

<option>

Volunteer

</option>

<option>

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

);

}

const inputStyle={

padding:"14px",

borderRadius:"12px",

border:
"1px solid #dbc7ba",

background:"#fffaf5",

fontSize:"16px"

};

export default Register;
