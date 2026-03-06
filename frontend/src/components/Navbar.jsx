import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {

const handleLogout = () => {
  logout();
  window.location.href = "/";
};

return (

<div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>

<Link to="/dashboard">Dashboard</Link>

<button onClick={handleLogout}>Logout</button>

</div>

);

}