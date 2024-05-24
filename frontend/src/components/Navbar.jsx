import {Link, useNavigate} from "react-router-dom"
import { backendUrl } from "../api/api";


const Navbar = ({ token, user }) => {
    const navigate = useNavigate();
    const logoutUser = async (e) => {
        e.preventDefault();
    
        const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
          method: "POST",
          credentials: "include",
           // !!! nötig damit das Setzen des Refresh-Tokens auf null (im backend) übernommen wird
        });
    
        const data = await res.json();
        console.log(data);
        if (!data.result) return alert("Could not log out");
        navigate("/");
      };
    return ( 
    <nav>
    <div>
        <h3>Zwitscher</h3>
    </div>
    <div>
        <Link to="/tweets">Tweets</Link>
        <Link to="/dashboard">Dashboard</Link>
    </div>
    <div>
    <button onClick={logoutUser}>Logout</button>
    </div>
    </nav> );
}
 
export default Navbar;