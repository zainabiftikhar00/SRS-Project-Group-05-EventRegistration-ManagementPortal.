import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

function App() {

return (

<BrowserRouter>

<Navbar />

<Routes>

<Route
path="/"
element={<Home />}
/>

<Route
path="/login"
element={<Login />}
/>


<Route
path="/events"
element={<Events />}
/>

<Route
path="/events/:id"
element={<EventDetails />}
/>

<Route
path="/register"
element={<Register />}
/>

<Route
path="/login"
element={<Login />}
/>

<Route
path="/dashboard"
element={<Dashboard />}
/>

</Routes>

</BrowserRouter>

);

}

export default App;