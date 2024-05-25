import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../api/api';

const Navbar = ({ userId }) => {
  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
      method: 'POST',
      credentials: 'include',
      // !!! nötig damit das Setzen des Refresh-Tokens auf null (im backend) übernommen wird
    });

    const data = await res.json();
    if (!data.result) return alert('Could not log out');
    navigate('/');
  };

  //   console.log(userId);
  return (
    <nav>
      <div>
        <h3>Zwitscher</h3>
      </div>
      <div>
        <Link className="" to="/tweets">
          Tweets
        </Link>
        <Link to={`/dashboard/${userId}`}>Dashboard</Link>
        {/*  funktioniert noch
        nicht id vom props über dashboard ist gleich undefine */}
      </div>
      <div>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
