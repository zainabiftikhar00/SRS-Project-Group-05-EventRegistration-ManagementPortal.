import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <h2>Event Portal</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/events">Events</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
